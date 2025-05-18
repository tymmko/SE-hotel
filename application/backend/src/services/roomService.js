/**
 * Service for managing room-related business logic
 * Extends BaseService to provide room-specific operations
 */
class RoomService extends BaseService {
  /**
   * @param {RoomRepository} roomRepository - Repository for room data
   */
  constructor(roomRepository) {
    super(roomRepository);
  }

  /**
   * Retrieve all rooms with associated details and current price
   * @returns {Promise<Array>} List of rooms with details and price per night
   */
  async getAllRoomsWithDetails() {
    const rooms = await this.repository.findRoomsWithDetails();
    const currentDate = new Date();
  
    const roomsWithPrice = await Promise.all(
      rooms.map(async (room) => {
        const priceEntry = await this.repository.findCurrentPrice(room.id, currentDate);
        return {
          ...room,
          price_per_night: priceEntry ? priceEntry.price : null
        };
      })
    );
  
    return roomsWithPrice;
  }

  /**
   * Retrieve a single room by ID with associated details and current price
   * @param {number|string} roomId - Room ID
   * @returns {Promise<Object>} Room with details and price per night
   * @throws {Error} If room is not found
   */
  async getRoomWithDetails(roomId) {
    const room = await this.repository.findRoomWithDetails(roomId);
    if (!room) {
      throw new Error('Room not found');
    }

    const currentDate = new Date();
    const priceEntry = await this.repository.findCurrentPrice(roomId, currentDate);

    room.price_per_night = priceEntry ? priceEntry.price : null;

    return room;
  }

  /**
   * Retrieve the current reservation and guest for a room
   * @param {number|string} roomId - Room ID
   * @returns {Promise<Object>} Occupancy information
   * @throws {Error} If room is not found or has no current reservation
   */
  async getCurrentReservationAndGuest(roomId) {
    const room = await this.repository.findById(roomId);
    if (!room) {
      throw new Error('Room not found');
    }
    const occupancyInfo = await this.repository.findCurrentReservationAndGuest(roomId);
    if (!occupancyInfo) {
      throw new Error('Room has no current reservation');
    }
    return occupancyInfo;
  }

  /**
   * Retrieve price history for a room
   * @param {number|string} roomId - Room ID
   * @returns {Promise<Array>} List of price history entries
   * @throws {Error} If room is not found
   */
  async getPriceHistoryByRoom(roomId) {
    const room = await this.repository.findById(roomId);
    if (!room) {
      throw new Error('Room not found');
    }
    return await this.repository.findPriceHistoryByRoom(roomId);
  }

  /**
   * Retrieve equipment for a room
   * @param {number|string} roomId - Room ID
   * @returns {Promise<Array>} List of equipment items
   * @throws {Error} If room is not found
   */
  async getEquipmentByRoom(roomId) {
    const room = await this.repository.findById(roomId);
    if (!room) {
      throw new Error('Room not found');
    }
    return await this.repository.findEquipmentByRoom(roomId);
  }

  /**
   * Create a new room
   * @param {Object} roomData - Room data
   * @param {Object} user - User performing the operation
   * @returns {Promise<Object>} Created room
   * @throws {Error} If user is not an admin
   */
  async createRoom(roomData, user) {
    if (user.role !== 'admin') {
      throw new Error('Only admins can create rooms');
    }

    const result = await this.repository.transaction(async (transaction) => {
      const room = await this.repository.create(roomData, { transaction });
      return room;
    });
    
    return result;
  }

  /**
   * Update an existing room
   * @param {number|string} roomId - Room ID
   * @param {Object} roomData - Data to update
   * @param {Object} user - User performing the operation
   * @returns {Promise<Object>} Updated room with details
   * @throws {Error} If room is not found or user lacks permission
   */
  async updateRoom(roomId, roomData, user) {
    const isUpdatingPrice = 'price_per_night' in roomData;

    if (isUpdatingPrice && user.role !== 'admin') {
      throw new Error('Only admins can update room prices');
    }

    return await this.repository.transaction(async (transaction) => {
      const [updated] = await this.repository.update(roomData, { id: roomId }, { transaction });
      if (updated === 0) {
        throw new Error('Room not found');
      }

      if (isUpdatingPrice) {
        await this.repository.endCurrentPriceHistory(roomId, { transaction });
        await this.repository.createPriceHistory(
          roomId,
          roomData.price_per_night,
          new Date(),
          null,
          { transaction }
        );
      }

      return await this.repository.findRoomWithDetails(roomId);
    });
  }

  /**
   * Delete a room
   * @param {number|string} roomId - Room ID
   * @returns {Promise<boolean>} True if deletion was successful
   * @throws {Error} If room is not found or has active reservations
   */
  async deleteRoom(roomId) {
    const hasReservations = await this.repository.hasActiveReservations(roomId);
    if (hasReservations) {
      throw new Error('Cannot delete room with active reservations');
    }
    const deleted = await this.repository.delete({ id: roomId });
    if (deleted === 0) {
      throw new Error('Room not found');
    }
    return true;
  }

  /**
   * Retrieve available rooms for a date range
   * @param {string} checkIn - Check-in date
   * @param {string} checkOut - Check-out date
   * @returns {Promise<Array>} List of available rooms
   * @throws {Error} If dates are invalid or missing
   */
  async getAvailableRooms(checkIn, checkOut) {
    if (!checkIn || !checkOut) {
      throw new Error('Check-in and check-out dates are required');
    }
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    if (isNaN(checkInDate) || isNaN(checkOutDate)) {
      throw new Error('Invalid date format');
    }
    if (checkInDate >= checkOutDate) {
      throw new Error('Check-out date must be after check-in date');
    }
    if (checkInDate < new Date()) {
      throw new Error('Check-in date cannot be in the past');
    }
    return await this.repository.findAvailableRooms(checkInDate, checkOutDate);
  }

  /**
   * Update the status of a room
   * @param {number|string} roomId - Room ID
   * @param {string} status - New status
   * @returns {Promise<Object>} Updated room
   * @throws {Error} If room is not found, status is invalid, or room has reservations
   */
  async updateRoomStatus(roomId, status) {
    const validStatuses = ['available', 'occupied', 'maintenance'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }
    if (status === 'available') {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const bookedRoomIds = await this.repository.findBookedRoomIds(today, tomorrow);
      if (bookedRoomIds.includes(parseInt(roomId))) {
        throw new Error('Cannot mark room as Available when it has reservations for today');
      }
    }
    return await this.updateRoom(roomId, { status });
  }
}

module.exports = RoomService;