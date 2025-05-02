// src/controllers/guest.controller.js

/**
 * Controller for Guest-related endpoints
 * Simplified to handle basic guest functionality
 */
class GuestController {
  /**
   * @param {GuestService} guestService - Service for guest operations
   */
  constructor(guestService) {
    this.guestService = guestService;
  }

  /**
   * Get all guests
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getAllGuests(req, res, next) {
    try {
      const guests = await this.guestService.getAllGuests();
      
      res.status(200).json({
        success: true,
        count: guests.length,
        guests
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get single guest by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getGuest(req, res, next) {
    try {
      const guest = await this.guestService.getGuestById(req.params.id);
      
      res.status(200).json({
        success: true,
        guest
      });
    } catch (error) {
      if (error.message === 'Guest not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Create new guest
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async createGuest(req, res, next) {
    try {
      const guest = await this.guestService.createGuest(req.body);
      
      res.status(201).json({
        success: true,
        guest
      });
    } catch (error) {
      if (error.message.includes('required') || 
          error.message.includes('Invalid email')) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Update a guest
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async updateGuest(req, res, next) {
    try {
      const guest = await this.guestService.updateGuest(req.params.id, req.body);
      
      res.status(200).json({
        success: true,
        guest
      });
    } catch (error) {
      if (error.message === 'Guest not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      
      if (error.message.includes('Invalid email')) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }
}

module.exports = GuestController;