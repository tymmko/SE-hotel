/**
 * Controller for managing bill-related endpoints
 * Handles HTTP requests and delegates business logic to the BillService
 */
class BillController {
  /**
   * @param {BillService} billService - Service for bill operations
   */
  constructor(billService) {
    this.billService = billService;
  }

  /**
   * Retrieve all bills with optional filters
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the list of bills
   * @example
   * // Get all bills
   * GET /bills
   * // Get bills by status
   * GET /bills?status=pending
   * // Get bills by user
   * GET /bills?user_id=123
   * // Get bills by stay
   * GET /bills?stay_id=456
   */
  async getAllBills(req, res, next) {
    try {
      if (req.query.status) {
        const bills = await this.billService.getBillsByStatus(req.query.status);
        return res.status(200).json({ success: true, count: bills.length, bills });
      }
      
      if (req.query.user_id) {
        const bills = await this.billService.getBillsByUser(req.query.user_id);
        return res.status(200).json({ success: true, count: bills.length, bills });
      }
      
      if (req.query.stay_id) {
        const bills = await this.billService.getBillsByStay(req.query.stay_id);
        return res.status(200).json({ success: true, count: bills.length, bills });
      }
      
      const bills = await this.billService.getAllBillsWithDetails();
      res.status(200).json({ success: true, count: bills.length, bills });
    } catch (error) {
      if (error.message.includes('Invalid status')) {
        return res.status(400).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  /**
   * Retrieve a single bill by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the bill details
   * @example
   * GET /bills/123
   */
  async getBill(req, res, next) {
    try {
      const bill = await this.billService.getBillWithDetails(req.params.id);
      res.status(200).json({ success: true, bill });
    } catch (error) {
      if (error.message === 'Bill not found') {
        return res.status(404).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  /**
   * Create a new bill
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the created bill
   * @example
   * POST /bills
   * {
   *   "user_id": 123,
   *   "stay_id": 456,
   *   "total_amount": 100.00,
   *   "status": "pending"
   * }
   */
  async createBill(req, res, next) {
    try {
      const bill = await this.billService.createBill(req.body);
      res.status(201).json({ success: true, data: bill });
    } catch (error) {
      const badRequestMessages = [
        'required', 'Invalid status', 'Failed to calculate bill amount', 
        'Stay not found', 'Please provide a total_amount', 'check pricing setup'
      ];
      if (badRequestMessages.some(msg => error.message.includes(msg))) {
        return res.status(400).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  /**
   * Update an existing bill
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the updated bill
   * @example
   * PUT /bills/123
   * {
   *   "total_amount": 150.00,
   *   "status": "paid"
   * }
   */
  async updateBill(req, res, next) {
    try {
      const bill = await this.billService.updateBill(req.params.id, req.body);
      res.status(200).json({ success: true, data: bill });
    } catch (error) {
      if (error.message === 'Bill not found') {
        return res.status(404).json({ success: false, message: error.message });
      }
      if (error.message.includes('Invalid status') || error.message.includes('Total amount')) {
        return res.status(400).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  /**
   * Update the status of a bill
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the updated bill
   * @example
   * PATCH /bills/123/status
   * {
   *   "status": "paid"
   * }
   */
  async updateBillStatus(req, res, next) {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ success: false, message: 'Please provide a status' });
      }
      const bill = await this.billService.updateBillStatus(req.params.id, status);
      res.status(200).json({ success: true, data: bill });
    } catch (error) {
      if (error.message === 'Bill not found') {
        return res.status(404).json({ success: false, message: error.message });
      }
      if (error.message.includes('Invalid status')) {
        return res.status(400).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  /**
   * Process a payment for a bill
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the updated bill
   * @example
   * POST /bills/123/payment
   * {
   *   "amount": 100.00,
   *   "payment_method": "credit_card"
   * }
   */
  async processPayment(req, res, next) {
    try {
      if (!req.body.amount || !req.body.payment_method) {
        return res.status(400).json({ success: false, message: 'Payment amount and method are required' });
      }
      const bill = await this.billService.processPayment(req.params.id, req.body);
      res.status(200).json({ success: true, data: bill });
    } catch (error) {
      if (error.message === 'Bill not found') {
        return res.status(404).json({ success: false, message: error.message });
      }
      if (error.message.includes('Payment amount')) {
        return res.status(400).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  /**
   * Check for overdue bills
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the count of overdue bills
   * @example
   * GET /bills/overdue
   */
  async checkOverdueBills(req, res, next) {
    try {
      const overdueCount = await this.billService.checkOverdueBills();
      res.status(200).json({
        success: true,
        message: `Found ${overdueCount} overdue bills`,
        data: { count: overdueCount }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BillController;