// src/controllers/room.controller.js

/**
 * Controller for Room-related endpoints
 * Handles HTTP requests/responses and delegates business logic to the service layer
 */
class RoomController {
  /**
   * @param {RoomService} roomService - Service for room operations
   */
  constructor(roomService) {
    this.roomService = roomService;
  }

  /**
   * Get all rooms
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getAllRooms(req, res, next) {
    try {
      const rooms = await this.roomService.getAllRoomsWithDetails();
      
      res.status(200).json({
        success: true,
        count: rooms.length,
        rooms
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get single room by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getRoom(req, res, next) {
    try {
      const room = await this.roomService.getRoomWithDetails(req.params.id);
      
      res.status(200).json({
        success: true,
        room
      });
    } catch (error) {
      if (error.message === 'Room not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Get current reservation and guest for a room
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getCurrentOccupancy(req, res, next) {
    try {
      const occupancyInfo = await this.roomService.getCurrentReservationAndGuest(req.params.id);
      
      res.status(200).json({
        success: true,
        data: occupancyInfo
      });
    } catch (error) {
      if (error.message === 'Room not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      if (error.message === 'Room has no current reservation') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Get price history for a room
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getPriceHistoryByRoom(req, res, next) {
    try {
      const priceHistory = await this.roomService.getPriceHistoryByRoom(req.params.id);
      
      res.status(200).json({
        success: true,
        count: priceHistory.length,
        priceHistory
      });
    } catch (error) {
      if (error.message === 'Room not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Get equipment/amenities for a room
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getEquipmentByRoom(req, res, next) {
    try {
      const equipment = await this.roomService.getEquipmentByRoom(req.params.id);
      
      res.status(200).json({
        success: true,
        count: equipment.length,
        equipment
      });
    } catch (error) {
      if (error.message === 'Room not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Create new room
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async createRoom(req, res, next) {
    try {
      const room = await this.roomService.createRoom(req.body);
      
      res.status(201).json({
        success: true,
        room
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update room
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async updateRoom(req, res, next) {
    try {
      const room = await this.roomService.updateRoom(req.params.id, req.body);
      
      res.status(200).json({
        success: true,
        data: room
      });
    } catch (error) {
      if (error.message === 'Room not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Delete room
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async deleteRoom(req, res, next) {
    try {
      await this.roomService.deleteRoom(req.params.id);
      
      res.status(200).json({
        success: true,
        data: {}
      });
    } catch (error) {
      if (error.message === 'Room not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      if (error.message === 'Cannot delete room with active reservations') {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Get available rooms for date range
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getAvailableRooms(req, res, next) {
    try {
      const { checkIn, checkOut } = req.query;
      
      if (!checkIn || !checkOut) {
        return res.status(400).json({
          success: false,
          message: 'Please provide check-in and check-out dates'
        });
      }
      
      const rooms = await this.roomService.getAvailableRooms(checkIn, checkOut);
      
      res.status(200).json({
        success: true,
        count: rooms.length,
        data: rooms
      });
    } catch (error) {
      if (error.message.includes('Invalid date') || 
          error.message.includes('Check-out date') ||
          error.message.includes('Check-in date')) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Update room status
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async updateRoomStatus(req, res, next) {
    try {
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a status'
        });
      }
      
      const room = await this.roomService.updateRoomStatus(req.params.id, status);
      
      res.status(200).json({
        success: true,
        data: room
      });
    } catch (error) {
      if (error.message === 'Room not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      
      if (error.message.includes('Invalid status') || 
          error.message.includes('Cannot mark room as Available')) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }
}

module.exports = RoomController;