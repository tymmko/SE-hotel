/**
 * Controller for managing guest-related endpoints
 * Handles HTTP requests for guest operations, using the refactored GuestService
 */
class GuestController {
  /**
   * @param {GuestService} guestService - Service for guest operations
   */
  constructor(guestService) {
    this.guestService = guestService;
  }

  /**
   * Retrieve all guests
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the list of guests
   * @example
   * GET /guests
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
   * Retrieve a single guest by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the guest details
   * @example
   * GET /guests/123
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
   * Create a new guest
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the created guest
   * @example
   * POST /guests
   * {
   *   "username": "johndoe",
   *   "email": "john@example.com",
   *   "password": "secure123",
   *   "first_name": "John",
   *   "last_name": "Doe"
   * }
   */
  async createGuest(req, res, next) {
    try {
      const guestUser = await this.guestService.createGuest(req.body);
      res.status(201).json({
        success: true,
        guest: guestUser
      });
    } catch (error) {
      if (error.message.includes('required') || 
          error.message.includes('Invalid email') ||
          error.message.includes('An account with this email already exists')) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Update an existing guest
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the updated guest
   * @example
   * PUT /guests/123
   * {
   *   "first_name": "John",
   *   "last_name": "Smith",
   *   "email": "john.smith@example.com"
   * }
   */
  async updateGuest(req, res, next) {
    try {
      const guestUser = await this.guestService.updateGuest(req.params.id, req.body);
      res.status(200).json({
        success: true,
        guest: guestUser
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