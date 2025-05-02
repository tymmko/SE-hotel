// src/services/roomService.js
const BaseService = require('./common/baseService');

/**
 * Service for Room-related business logic
 * Implements business rules for room management
 */
class RoomService extends BaseService {
  /**
   * @param {RoomRepository} roomRepository - Repository for room data
   */
  constructor(roomRepository) {
    super(roomRepository);
  }

  /**
   * Get all rooms with their equipment and current prices
   * @returns {Promise<Array>} List of rooms with details
   */
  async getAllRoomsWithDetails() {
    return await this.repository.findRoomsWithDetails();
  }

  /**
   * Get a single room with its equipment and current prices
   * @param {number} roomId - Room ID
   * @returns {Promise<Object>} Room with details
   * @throws {Error} If room not found
   */
  async getRoomWithDetails(roomId) {
    const room = await this.repository.findRoomWithDetails(roomId);
    
    if (!room) {
      throw new Error('Room not found');
    }
    
    return room;
  }

  /**
   * Get current reservation and guest for a room
   * @param {number} roomId - Room ID
   * @returns {Promise<Object>} Current reservation and guest info
   * @throws {Error} If room not found or has no current reservation
   */
  async getCurrentReservationAndGuest(roomId) {
    // Verify room exists
    const room = await this.repository.findById(roomId);
    
    if (!room) {
      throw new Error('Room not found');
    }
    
    // Get current reservation and guest
    const occupancyInfo = await this.repository.findCurrentReservationAndGuest(roomId);
    
    if (!occupancyInfo) {
      throw new Error('Room has no current reservation');
    }
    
    return occupancyInfo;
  }

  /**
   * Get price history for a specific room
   * @param {number} roomId - Room ID
   * @returns {Promise<Array>} List of price history entries for the room
   * @throws {Error} If room not found
   */
  async getPriceHistoryByRoom(roomId) {
    // Verify room exists
    const room = await this.repository.findById(roomId);
    
    if (!room) {
      throw new Error('Room not found');
    }
    
    return await this.repository.findPriceHistoryByRoom(roomId);
  }

  /**
   * Get equipment/amenities for a specific room
   * @param {number} roomId - Room ID
   * @returns {Promise<Array>} List of equipment items for the room
   * @throws {Error} If room not found
   */
  async getEquipmentByRoom(roomId) {
    // Verify room exists
    const room = await this.repository.findById(roomId);
    
    if (!room) {
      throw new Error('Room not found');
    }
    
    return await this.repository.findEquipmentByRoom(roomId);
  }

  /**
   * Create a new room with initial price history
   * @param {Object} roomData - Room data
   * @returns {Promise<Object>} Created room
   */
  async createRoom(roomData) {
    // Create room transaction to ensure both room and price history are created
    const result = await this.repository.transaction(async (transaction) => {
    // Create the room
    const room = await this.repository.create(roomData, { transaction });
      
      // Create initial price history if price provided
      if (roomData.price_per_night) {
        await this.repository.createPriceHistory(
          room.id,
          roomData.price_per_night,
          new Date(),
          null,
          { transaction }
        );
      }
      
      return room;
    });
    
    return result;
  }

  /**
   * Update a room and manage price history if price changes
   * @param {number} roomId - Room ID
   * @param {Object} roomData - Updated room data
   * @returns {Promise<Object>} Updated room
   * @throws {Error} If room not found
   */
  async updateRoom(roomId, roomData) {
    return await this.repository.transaction(async (transaction) => {
      // Update the room
      const [updated] = await this.repository.update(roomData, { room_id: roomId }, { transaction });
      
      if (updated === 0) {
        throw new Error('Room not found');
      }
      
      // Handle price history if price changed
      if (roomData.price_per_night) {
        // End current price history
        await this.repository.endCurrentPriceHistory(roomId, { transaction });
        
        // Create new price history
        await this.repository.createPriceHistory(
          roomId,
          roomData.price_per_night,
          new Date(),
          null,
          { transaction }
        );
      }
      
      // Get updated room
      return await this.repository.findRoomWithDetails(roomId);
    });
  }

  /**
   * Delete a room if it has no active reservations
   * @param {number} roomId - Room ID
   * @returns {Promise<boolean>} Deletion success
   * @throws {Error} If room has active reservations or not found
   */
  async deleteRoom(roomId) {
    // Check for active reservations
    const hasReservations = await this.repository.hasActiveReservations(roomId);
    
    if (hasReservations) {
      throw new Error('Cannot delete room with active reservations');
    }
    
    // Delete the room
    const deleted = await this.repository.delete({ room_id: roomId });
    
    if (deleted === 0) {
      throw new Error('Room not found');
    }
    
    return true;
  }

  /**
   * Get available rooms for a date range
   * @param {Date} checkIn - Check-in date
   * @param {Date} checkOut - Check-out date
   * @returns {Promise<Array>} List of available rooms
   * @throws {Error} If check-in or check-out dates are invalid
   */
  async getAvailableRooms(checkIn, checkOut) {
    // Validate inputs
    if (!checkIn || !checkOut) {
      throw new Error('Check-in and check-out dates are required');
    }
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    // Validate dates
    if (isNaN(checkInDate) || isNaN(checkOutDate)) {
      throw new Error('Invalid date format');
    }
    
    if (checkInDate >= checkOutDate) {
      throw new Error('Check-out date must be after check-in date');
    }
    
    if (checkInDate < new Date()) {
      throw new Error('Check-in date cannot be in the past');
    }
    
    // Get available rooms
    return await this.repository.findAvailableRooms(checkInDate, checkOutDate);
  }

  /**
   * Update room status (Available, Occupied, Maintenance)
   * @param {number} roomId - Room ID
   * @param {string} status - New status
   * @returns {Promise<Object>} Updated room
   * @throws {Error} If status is invalid or room not found
   */
  async updateRoomStatus(roomId, status) {
    // Validate status
    const validStatuses = ['Available', 'Occupied', 'Maintenance'];
    
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }
    
    // Apply business rule: cannot mark room as Available if it has active reservations for today
    if (status === 'Available') {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const bookedRoomIds = await this.repository.findBookedRoomIds(today, tomorrow);
      
      if (bookedRoomIds.includes(parseInt(roomId))) {
        throw new Error('Cannot mark room as Available when it has reservations for today');
      }
    }
    
    // Update room status
    return await this.updateRoom(roomId, { status });
  }
}

module.exports = RoomService;