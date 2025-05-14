// src/services/billService.js
const BaseService = require('./common/baseService');
const { Op } = require('sequelize');

class BillService extends BaseService {
  constructor(billRepository, stayRepository, reservationRepository, roomRepository, priceHistoryRepository) { // Added dependencies
    super(billRepository);
    this.stayRepository = stayRepository; // Assuming you'll inject this
    this.reservationRepository = reservationRepository; // Assuming you'll inject this
    this.roomRepository = roomRepository; // Assuming you'll inject this
    this.priceHistoryRepository = priceHistoryRepository; // Assuming you'll inject this
    // It's better to inject models via repositories or have dedicated repositories.
    // For simplicity, if models are directly accessed:
    this.models = billRepository.models; // Get models from one of the repositories
  }

  async getAllBillsWithDetails() {
    return await this.repository.findBillsWithDetails();
  }

  async getBillWithDetails(billId) {
    const bill = await this.repository.findBillWithDetails(billId);
    if (!bill) {
      throw new Error('Bill not found');
    }
    return bill;
  }

  async getBillsByStatus(status) {
    const validStatuses = ['paid', 'unpaid'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }
    return await this.repository.findBillsByStatus(status);
  }

  async getBillsByStay(stayId) {
    // Validate stay exists?
    return await this.repository.findBillsByStay(stayId);
  }

  async getBillsByUser(userId) { // Changed from getBillsByGuest
    // Validate user exists?
    return await this.repository.findBillsByUser(userId); // Changed from findBillsByGuest
  }

  async createBill(billData) {
    if (!billData.stay_id) {
      throw new Error('Stay ID is required');
    }

    // Fetch stay and related data to calculate amount if not provided
    const stay = await this.models.Stay.findByPk(billData.stay_id, {
        include: [{
            model: this.models.Reservation,
            include: [{ model: this.models.Room }]
        }]
    });

    if (!stay) {
        throw new Error('Stay not found');
    }

    if (billData.total_amount !== undefined && billData.total_amount < 0) {
      throw new Error('Total amount must be greater than or equal to 0');
    }

    if (billData.total_amount === undefined) {
      try {
        const reservation = stay.Reservation;
        if (!reservation) throw new Error('Reservation details not found for the stay.');
        
        const checkInDate = new Date(reservation.check_in_date);
        const checkOutDate = new Date(reservation.check_out_date);
        const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        
        // Find price for the room during the stay period
        // This needs a more robust way to get price for the period, e.g. average or specific pricing rules
        const priceEntry = await this.models.PriceHistory.findOne({
          where: {
            room_id: reservation.Room.id,
            start_date: { [Op.lte]: checkInDate }, // Price active at check-in
            // end_date: { [Op.gte]: checkOutDate } // This might be too strict if price changes mid-stay
          },
          order: [['start_date', 'DESC']] // Get the latest applicable price
        });
        
        if (!priceEntry || priceEntry.price == null) {
          throw new Error('No valid price entry found for the reservation date range. Cannot auto-calculate bill amount.');
        }
        billData.total_amount = priceEntry.price * nights;
      } catch (error) {
        console.error('Error calculating bill amount:', error);
        throw new Error(`Failed to calculate bill amount: ${error.message}. Please provide a total_amount or check pricing setup.`);
      }
    }
    
    const finalStatus = billData.status || 'unpaid';
    const validStatuses = ['paid', 'unpaid'];
    if (!validStatuses.includes(finalStatus)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }
    billData.status = finalStatus;

    const bill = await this.repository.create(billData);
    return await this.getBillWithDetails(bill.id);
  }

  async updateBill(billId, billData) {
    if (billData.total_amount !== undefined && billData.total_amount < 0) {
      throw new Error('Total amount must be greater than or equal to 0');
    }
    if (billData.status) {
      const validStatuses = ['paid', 'unpaid'];
      if (!validStatuses.includes(billData.status)) {
        throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }
    }

    const [updatedCount] = await this.repository.update(billData, { id: billId });
    if (updatedCount === 0) {
      throw new Error('Bill not found or no changes made');
    }
    return await this.getBillWithDetails(billId);
  }

  async updateBillStatus(billId, status) {
    const validStatuses = ['paid', 'unpaid'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }
    
    await this.getBillWithDetails(billId); // Ensures bill exists

    const [updatedCount] = await this.repository.updateBillStatus(billId, status);
    if (updatedCount === 0) {
      throw new Error('Bill not found or status not changed');
    }
    return await this.getBillWithDetails(billId);
  }

  async processPayment(billId, paymentData) {
    if (!paymentData.amount || !paymentData.payment_method) {
      throw new Error('Payment amount and method are required');
    }
    
    const bill = await this.getBillWithDetails(billId);
    if (paymentData.amount <= 0) {
      throw new Error('Payment amount must be greater than zero');
    }
    
    // Assuming Payment model exists and is associated or handled by billRepository.createPayment
    await this.repository.createPayment(billId, {
        ...paymentData,
        payment_date: paymentData.payment_date || new Date()
    });
    
    const totalPaid = await this.repository.getTotalPaymentsForBill(billId);
    if (totalPaid >= bill.total_amount) {
      await this.updateBillStatus(billId, 'paid');
    }
    
    return await this.getBillWithDetails(billId);
  }

  async checkOverdueBills() {
    try {
      const unpaidBills = await this.repository.findBillsByStatus('unpaid');
      const today = new Date();
      let overdueCount = 0;
      
      for (const bill of unpaidBills) {
        // Assuming bill objects from findBillsByStatus include Stay and Reservation to get due_date (e.g., check_out_date)
        // This logic needs refinement based on how due_date is determined.
        // For example, if due_date is check_out_date of the reservation:
        if (bill.Stay && bill.Stay.Reservation && bill.Stay.Reservation.check_out_date) {
            const dueDate = new Date(bill.Stay.Reservation.check_out_date);
            if (dueDate < today) {
                overdueCount++;
            }
        } else if (bill.due_date && new Date(bill.due_date) < today) { // If bill has its own due_date field
            overdueCount++;
        }
      }
      return overdueCount;
    } catch (error) {
      console.error('Error in checkOverdueBills:', error);
      throw error;
    }
  }
}

module.exports = BillService;