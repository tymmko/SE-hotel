// src/controllers/guest.controller.js

/**
 * Controller for Guest-related endpoints
 * Handles HTTP requests/responses and delegates business logic to the service layer
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
      const guests = await this.guestService.getAllGuestsWithDetails();
      
      res.status(200).json({
        success: true,
        count: guests.length,
        data: guests
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
      const guest = await this.guestService.getGuestWithDetails(req.params.id);
      
      res.status(200).json({
        success: true,
        data: guest
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
   * Get guest with reservation history
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getGuestWithReservations(req, res, next) {
    try {
      const guest = await this.guestService.getGuestWithReservations(req.params.id);
      
      res.status(200).json({
        success: true,
        data: guest
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
        data: guest
      });
    } catch (error) {
      if (error.message === 'Invalid email format') {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Update guest
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async updateGuest(req, res, next) {
    try {
      const guest = await this.guestService.updateGuest(req.params.id, req.body);
      
      res.status(200).json({
        success: true,
        data: guest
      });
    } catch (error) {
      if (error.message === 'Guest not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      if (error.message === 'Invalid email format') {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Delete guest
    * @param {Object} req - Express request object
    * @param {Object} res - Express response object
    * @param {Function} next - Express next middleware function
    */
    async deleteGuest(req, res, next) {
      try {
        await this.guestService.deleteGuest(req.params.id);
        
        res.status(200).json({
          success: true,
          data: {}
        });
      } catch (error) {
        if (error.message === 'Guest not found') {
          return res.status(404).json({
            success: false,
            message: error.message
          });
        }
        if (error.message === 'Cannot delete guest with active reservations') {
          return res.status(400).json({
            success: false,
            message: error.message
          });
        }
        next(error);
      }
    }

    /**
     * Update guest status
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Express next middleware function
     */
    async updateGuestStatus(req, res, next) {
      try {
        const { status } = req.body;
        
        if (!status) {
          return res.status(400).json({
            success: false,
            message: 'Please provide a status'
          });
        }
        
        const guest = await this.guestService.updateGuestStatus(req.params.id, status);
        
        res.status(200).json({
          success: true,
          data: guest
        });
      } catch (error) {
        if (error.message === 'Guest not found') {
          return res.status(404).json({
            success: false,
            message: error.message
          });
        }
        
        if (error.message.includes('Invalid status') || 
            error.message.includes('Cannot mark guest as Inactive')) {
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