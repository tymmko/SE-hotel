// src/services/billService.js
const BaseService = require('./common/baseService');

/**
 * Service for Bill-related business logic
 * Implements business rules for bill management
 */
class BillService extends BaseService {
  /**
   * @param {BillRepository} billRepository - Repository for bill data
   */
  constructor(billRepository) {
    super(billRepository);
  }

  /**
   * Get all bills with details
   * @returns {Promise<Array>} List of bills with details
   */
  async getAllBillsWithDetails() {
    return await this.repository.findBillsWithDetails();
  }

  /**
   * Get a single bill with details
   * @param {number} billId - Bill ID
   * @returns {Promise<Object>} Bill with details
   * @throws {Error} If bill not found
   */
  async getBillWithDetails(billId) {
    const bill = await this.repository.findBillWithDetails(billId);
    
    if (!bill) {
      throw new Error('Bill not found');
    }
    
    return bill;
  }

  /**
   * Get bills by status
   * @param {string} status - Bill status
   * @returns {Promise<Array>} List of bills with specified status
   */
  async getBillsByStatus(status) {
    // Validate status
    const validStatuses = ['Paid', 'Unpaid'];
    
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }
    
    return await this.repository.findBillsByStatus(status);
  }

  /**
   * Get bills for a specific stay
   * @param {number} stayId - Stay ID
   * @returns {Promise<Array>} List of bills for the stay
   */
  async getBillsByStay(stayId) {
    return await this.repository.findBillsByStay(stayId);
  }

  /**
   * Get bills for a specific guest
   * @param {number} guestId - Guest ID
   * @returns {Promise<Array>} List of bills for the guest
   */
  async getBillsByGuest(guestId) {
    return await this.repository.findBillsByGuest(guestId);
  }

  /**
   * Create a new bill
   * @param {Object} billData - Bill data
   * @returns {Promise<Object>} Created bill
   */
  async createBill(billData) {
    // Validate required fields
    if (!billData.stay_id) {
      throw new Error('Stay ID is required');
    }
    
    // Validate total_amount if provided
    if (billData.total_amount !== undefined && billData.total_amount < 0) {
      throw new Error('Total amount must be greater than or equal to 0');
    }
    
    // Calculate total_amount if not provided
    if (billData.total_amount === undefined) {
      try {
        // Get the stay information
        const stay = await this.repository.models.Stay.findByPk(billData.stay_id, {
          include: [{
            model: this.repository.models.Reservation,
            include: [{
              model: this.repository.models.Room
            }]
          }],
          raw: false
        });
        
        if (!stay) {
          throw new Error('Stay not found');
        }
        
        // Calculate the number of nights
        const checkInDate = new Date(stay.Reservation.check_in_date);
        const checkOutDate = new Date(stay.Reservation.check_out_date);
        const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        
        // Calculate total amount
        billData.total_amount = stay.Reservation.Room.price_per_night * nights;
      } catch (error) {
        console.error('Error calculating bill amount:', error);
        throw new Error('Failed to calculate bill amount. Please provide a total_amount.');
      }
    }
    
    // Set default status if not provided
    if (!billData.status) {
      billData.status = 'Unpaid';
    } else {
      // Validate status
      const validStatuses = ['Paid', 'Unpaid'];
      
      if (!validStatuses.includes(billData.status)) {
        throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }
    }
    
    // Create the bill
    const bill = await this.repository.create(billData);
    
    return await this.getBillWithDetails(bill.bill_id);
  }

  /**
   * Update a bill
   * @param {number} billId - Bill ID
   * @param {Object} billData - Updated bill data
   * @returns {Promise<Object>} Updated bill
   * @throws {Error} If bill not found
   */
  async updateBill(billId, billData) {
    // Validate total_amount if provided
    if (billData.total_amount !== undefined && billData.total_amount < 0) {
      throw new Error('Total amount must be greater than or equal to 0');
    }
    
    // Validate status if provided
    if (billData.status) {
      const validStatuses = ['Paid', 'Unpaid'];
      
      if (!validStatuses.includes(billData.status)) {
        throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }
    }
    
    // Update the bill
    const [updated] = await this.repository.update(billData, { bill_id: billId });
    
    if (updated === 0) {
      throw new Error('Bill not found');
    }
    
    return await this.getBillWithDetails(billId);
  }

  /**
   * Update bill status
   * @param {number} billId - Bill ID
   * @param {string} status - New status
   * @returns {Promise<Object>} Updated bill
   * @throws {Error} If status is invalid or bill not found
   */
  async updateBillStatus(billId, status) {
    // Validate status
    const validStatuses = ['Paid', 'Unpaid'];
    
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }
    
    // Get current bill
    const bill = await this.getBillWithDetails(billId);
    
    // Update bill status
    const [updated] = await this.repository.updateBillStatus(billId, status);
    
    if (updated === 0) {
      throw new Error('Bill not found');
    }
    
    return await this.getBillWithDetails(billId);
  }

  /**
   * Process a payment for a bill
   * @param {number} billId - Bill ID
   * @param {Object} paymentData - Payment data
   * @returns {Promise<Object>} Updated bill with payment
   * @throws {Error} If bill not found or payment invalid
   */
  async processPayment(billId, paymentData) {
    // Validate payment data
    if (!paymentData.amount || !paymentData.payment_method) {
      throw new Error('Payment amount and method are required');
    }
    
    // Get current bill
    const bill = await this.getBillWithDetails(billId);
    
    // Validate payment amount
    if (paymentData.amount <= 0) {
      throw new Error('Payment amount must be greater than zero');
    }
    
    // Set default payment date if not provided
    if (!paymentData.payment_date) {
      paymentData.payment_date = new Date();
    }
    
    // Create payment record
    await this.repository.createPayment(billId, paymentData);
    
    // Check if bill is fully paid
    const totalPaid = await this.repository.getTotalPaymentsForBill(billId);
    
    // If fully paid, update status
    if (totalPaid >= bill.total_amount) {
      await this.updateBillStatus(billId, 'Paid');
    }
    
    return await this.getBillWithDetails(billId);
  }

  /**
   * Check for overdue bills
   * @returns {Promise<number>} Number of overdue bills found
   */
  async checkOverdueBills() {
    try {
      // Get all unpaid bills
      const unpaidBills = await this.repository.findBillsByStatus('Unpaid');
      
      const today = new Date();
      let overdueCount = 0;
      
      // Check each bill and count overdue ones
      for (const bill of unpaidBills) {
        if (bill.due_date && new Date(bill.due_date) < today) {
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