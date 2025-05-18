const BaseService = require('./common/baseService');
const { Op } = require('sequelize');

/**
 * Service for managing bill-related business logic
 * Extends BaseService to provide bill-specific operations
 */
class BillService extends BaseService {
  /**
   * @param {BillRepository} billRepository - Repository for bill data access
   * @param {StayRepository} stayRepository - Repository for stay data access
   * @param {ReservationRepository} reservationRepository - Repository for reservation data access
   * @param {RoomRepository} roomRepository - Repository for room data access
   * @param {PriceHistoryRepository} priceHistoryRepository - Repository for price history data access
   */
  constructor(billRepository, stayRepository, reservationRepository, roomRepository, priceHistoryRepository) {
    super(billRepository);
    this.stayRepository = stayRepository;
    this.reservationRepository = reservationRepository;
    this.roomRepository = roomRepository;
    this.priceHistoryRepository = priceHistoryRepository;
    this.models = billRepository.models;
  }

  /**
   * Retrieve all bills with associated details
   * @returns {Promise<Array>} List of bills with details
   */
  async getAllBillsWithDetails() {
    return await this.repository.findBillsWithDetails();
  }

  /**
   * Retrieve a single bill by ID with associated details
   * @param {number|string} billId - Bill ID
   * @returns {Promise<Object>} Bill with details
   * @throws {Error} If bill is not found
   */
  async getBillWithDetails(billId) {
    const bill = await this.repository.findBillWithDetails(billId);
    if (!bill) {
      throw new Error('Bill not found');
    }
    return bill;
  }

  /**
   * Retrieve bills by status
   * @param {string} status - Bill status (e.g., 'paid', 'unpaid')
   * @returns {Promise<Array>} List of bills with the specified status
   * @throws {Error} If status is invalid
   */
  async getBillsByStatus(status) {
    const validStatuses = ['paid', 'unpaid'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }
    return await this.repository.findBillsByStatus(status);
  }

  /**
   * Retrieve bills associated with a stay
   * @param {number|string} stayId - Stay ID
   * @returns {Promise<Array>} List of bills for the stay
   */
  async getBillsByStay(stayId) {
    return await this.repository.findBillsByStay(stayId);
  }

  /**
   * Retrieve bills associated with a user
   * @param {number|string} userId - User ID
   * @returns {Promise<Array>} List of bills for the user
   */
  async getBillsByUser(userId) {
    return await this.repository.findBillsByUser(userId);
  }

  /**
   * Create a new bill
   * @param {Object} billData - Bill data
   * @param {number} billData.stay_id - Stay ID
   * @param {number} [billData.total_amount] - Total amount (calculated if not provided)
   * @param {string} [billData.status] - Bill status (defaults to 'unpaid')
   * @returns {Promise<Object>} Created bill with details
   * @throws {Error} If stay is not found, amount is invalid, or status is invalid
   */
  async createBill(billData) {
    if (!billData.stay_id) {
      throw new Error('Stay ID is required');
    }

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
        
        const priceEntry = await this.models.PriceHistory.findOne({
          where: {
            room_id: reservation.Room.id,
            start_date: { [Op.lte]: checkInDate },
          },
          order: [['start_date', 'DESC']]
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

  /**
   * Update an existing bill
   * @param {number|string} billId - Bill ID
   * @param {Object} billData - Data to update
   * @param {number} [billData.total_amount] - Total amount
   * @param {string} [billData.status] - Bill status
   * @returns {Promise<Object>} Updated bill with details
   * @throws {Error} If bill is not found, amount is invalid, or status is invalid
   */
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

  /**
   * Update the status of a bill
   * @param {number|string} billId - Bill ID
   * @param {string} status - New status
   * @returns {Promise<Object>} Updated bill with details
   * @throws {Error} If bill is not found or status is invalid
   */
  async updateBillStatus(billId, status) {
    const validStatuses = ['paid', 'unpaid'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }
    
    await this.getBillWithDetails(billId);

    const [updatedCount] = await this.repository.updateBillStatus(billId, status);
    if (updatedCount === 0) {
      throw new Error('Bill not found or status not changed');
    }
    return await this.getBillWithDetails(billId);
  }

  /**
   * Process a payment for a bill
   * @param {number|string} billId - Bill ID
   * @param {Object} paymentData - Payment data
   * @param {number} paymentData.amount - Payment amount
   * @param {string} paymentData.payment_method - Payment method
   * @param {Date} [paymentData.payment_date] - Payment date (defaults to now)
   * @returns {Promise<Object>} Updated bill with details
   * @throws {Error} If bill is not found, payment data is invalid, or amount is invalid
   */
  async processPayment(billId, paymentData) {
    // Check for presence of method AND if amount is strictly undefined or null
    if (paymentData.amount === undefined || paymentData.amount === null || !paymentData.payment_method) {
      throw new Error('Payment amount and method are required');
    }
    // Now, if amount is 0, the first check above passes (0 is not undefined/null).
    // This check will now be correctly hit for amount: 0
    if (paymentData.amount <= 0) {
      throw new Error('Payment amount must be greater than zero');
    }

    const bill = await this.getBillWithDetails(billId); // This should only be called if above checks pass
    // ... rest of the logic

    if (paymentData.amount <= 0) {
      throw new Error('Payment amount must be greater than zero');
    }
    
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

  /**
   * Check for overdue bills
   * @returns {Promise<number>} Number of overdue bills
   * @throws {Error} If an error occurs during processing
   */
  async checkOverdueBills() {
    try {
      const unpaidBills = await this.repository.findBillsByStatus('unpaid');
      const today = new Date();
      let overdueCount = 0;
      
      for (const bill of unpaidBills) {
        if (bill.Stay && bill.Stay.Reservation && bill.Stay.Reservation.check_out_date) {
          const dueDate = new Date(bill.Stay.Reservation.check_out_date);
          if (dueDate < today) {
            overdueCount++;
          }
        } else if (bill.due_date && new Date(bill.due_date) < today) {
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