// src/controllers/guest.controller.js
// (Your uploaded version - should work with refactored GuestService)

class GuestController {
  constructor(guestService) { // guestService is now the refactored version
    this.guestService = guestService;
  }

  async getAllGuests(req, res, next) {
    try {
      const guests = await this.guestService.getAllGuests(); // Returns array of User objects (role: 'guest')
      res.status(200).json({
        success: true,
        count: guests.length,
        guests // This is an array of User objects
      });
    } catch (error) {
      next(error);
    }
  }

  async getGuest(req, res, next) {
    try {
      const guest = await this.guestService.getGuestById(req.params.id); // Returns a User object (role: 'guest')
      res.status(200).json({
        success: true,
        guest // This is a User object
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

  async createGuest(req, res, next) {
    try {
      const guestUser = await this.guestService.createGuest(req.body); // Returns a User object (role: 'guest')
      res.status(201).json({
        success: true,
        guest: guestUser // Send the created User object under the 'guest' key
      });
    } catch (error) {
      // Check for more specific errors from GuestService if needed
      if (error.message.includes('required') || 
          error.message.includes('Invalid email') ||
          error.message.includes('An account with this email already exists')) { // Updated error check
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  async updateGuest(req, res, next) {
    try {
      const guestUser = await this.guestService.updateGuest(req.params.id, req.body); // Returns updated User object (role: 'guest')
      res.status(200).json({
        success: true,
        guest: guestUser // Send the updated User object under the 'guest' key
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