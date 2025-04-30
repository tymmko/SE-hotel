// src/controllers/bill.controller.js

/**
 * Controller for Bill-related endpoints
 * Handles HTTP requests/responses and delegates business logic to the service layer
 */
class BillController {
  /**
   * @param {BillService} billService - Service for bill operations
   */
  constructor(billService) {
    this.billService = billService;
  }

  /**
   * Get all bills
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getAllBills(req, res, next) {
    try {
      // Filter by status if provided in query
      if (req.query.status) {
        const bills = await this.billService.getBillsByStatus(req.query.status);
        
        return res.status(200).json({
          success: true,
          count: bills.length,
          data: bills
        });
      }
      
      // Filter by guest if provided in query
      if (req.query.guest_id) {
        const bills = await this.billService.getBillsByGuest(req.query.guest_id);
        
        return res.status(200).json({
          success: true,
          count: bills.length,
          data: bills
        });
      }
      
      // Filter by stay if provided in query
      if (req.query.stay_id) {
        const bills = await this.billService.getBillsByStay(req.query.stay_id);
        
        return res.status(200).json({
          success: true,
          count: bills.length,
          data: bills
        });
      }
      
      // Get all bills
      const bills = await this.billService.getAllBillsWithDetails();
      
      res.status(200).json({
        success: true,
        count: bills.length,
        data: bills
      });
    } catch (error) {
      if (error.message.includes('Invalid status')) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Get single bill by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getBill(req, res, next) {
    try {
      const bill = await this.billService.getBillWithDetails(req.params.id);
      
      res.status(200).json({
        success: true,
        data: bill
      });
    } catch (error) {
      if (error.message === 'Bill not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Create new bill
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async createBill(req, res, next) {
    try {
      const bill = await this.billService.createBill(req.body);
      
      res.status(201).json({
        success: true,
        data: bill
      });
    } catch (error) {
      if (error.message.includes('required') || 
          error.message.includes('Invalid status') ||
          error.message.includes('Failed to calculate bill amount') ||
          error.message.includes('Stay not found')) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Update bill
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async updateBill(req, res, next) {
    try {
      const bill = await this.billService.updateBill(req.params.id, req.body);
      
      res.status(200).json({
        success: true,
        data: bill
      });
    } catch (error) {
      if (error.message === 'Bill not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      
      if (error.message.includes('Invalid status') ||
          error.message.includes('Total amount')) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Update bill status
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async updateBillStatus(req, res, next) {
    try {
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a status'
        });
      }
      
      const bill = await this.billService.updateBillStatus(req.params.id, status);
      
      res.status(200).json({
        success: true,
        data: bill
      });
    } catch (error) {
      if (error.message === 'Bill not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      
      if (error.message.includes('Invalid status')) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Process payment for a bill
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async processPayment(req, res, next) {
    try {
      if (!req.body.amount || !req.body.payment_method) {
        return res.status(400).json({
          success: false,
          message: 'Payment amount and method are required'
        });
      }
      
      const bill = await this.billService.processPayment(req.params.id, req.body);
      
      res.status(200).json({
        success: true,
        data: bill
      });
    } catch (error) {
      if (error.message === 'Bill not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      
      if (error.message.includes('Payment amount')) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Check for overdue bills
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
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