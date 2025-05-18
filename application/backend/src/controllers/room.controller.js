/**
 * Controller for managing room-related endpoints
 * Handles HTTP requests and delegates business logic to the RoomService
 */
class RoomController {
  /**
   * @param {RoomService} roomService - Service for room operations
   */
  constructor(roomService) {
    this.roomService = roomService;
  }

  /**
   * Retrieve all rooms
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the list of rooms
   * @example
   * GET /rooms
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
   * Retrieve a single room by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the room details
   * @example
   * GET /rooms/123
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
   * Retrieve the current reservation and guest for a room
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with occupancy information
   * @example
   * GET /rooms/123/occupancy
   */
  async getCurrentOccupancy(req, res, next) {
    try {
      const occupancyInfo = await this.roomService.getCurrentReservationAndGuest(req.params.id);
      res.status(200).json({
        success: true,
        occupancyInfo
      });
    } catch (error) {
      if (error.message === 'Room not found' || error.message === 'Room has no current reservation') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Retrieve price history for a room
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the price history
   * @example
   * GET /rooms/123/price-history
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
   * Retrieve equipment for a room
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the list of equipment
   * @example
   * GET /rooms/123/equipment
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
   * Create a new room
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the created room
   * @example
   * POST /rooms
   * {
   *   "number": "101",
   *   "type": "single",
   *   "price": 100.00
   * }
   */
  async createRoom(req, res, next) {
    try {
      const room = await this.roomService.createRoom(req.body, req.user);
      res.status(201).json({
        success: true,
        room
      });
    } catch (error) {
      if (error.message === 'Only admins can create rooms') {
        return res.status(403).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Update an existing room
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the updated room
   * @example
   * PUT /rooms/123
   * {
   *   "price": 120.00,
   *   "status": "available"
   * }
   */
  async updateRoom(req, res, next) {
    try {
      const room = await this.roomService.updateRoom(req.params.id, req.body, req.user);
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
      if (error.message === 'Only admins can update room prices') {
        return res.status(403).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Delete a room
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response confirming deletion
   * @example
   * DELETE /rooms/123
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
   * Retrieve available rooms for a date range
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the list of available rooms
   * @example
   * GET /rooms/available?checkIn=2025-01-01&checkOut=2025-01-05
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
      if (
        error.message.includes('Invalid date') ||
        error.message.includes('Check-out date') ||
        error.message.includes('Check-in date')
      ) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Update the status of a room
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the updated room
   * @example
   * PATCH /rooms/123/status
   * {
   *   "status": "maintenance"
   * }
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
      if (
        error.message.includes('Invalid status') ||
        error.message.includes('Cannot mark room as Available')
      ) {
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