const BaseService = require('./common/baseService');

class RoomService extends BaseService {
  constructor(roomRepository) {
    super(roomRepository);
  }

  async getAllRoomsWithDetails() {
    return await this.repository.findRoomsWithDetails();
  }

  async getRoomWithDetails(roomId) {
    const room = await this.repository.findRoomWithDetails(roomId);
    if (!room) {
      throw new Error('Room not found');
    }
    return room;
  }

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

  async getPriceHistoryByRoom(roomId) {
    const room = await this.repository.findById(roomId);
    if (!room) {
      throw new Error('Room not found');
    }
    return await this.repository.findPriceHistoryByRoom(roomId);
  }

  async getEquipmentByRoom(roomId) {
    const room = await this.repository.findById(roomId);
    if (!room) {
      throw new Error('Room not found');
    }
    return await this.repository.findEquipmentByRoom(roomId);
  }

  async createRoom(roomData, user) {
    if (user.role !== 'admin') {
      throw new Error('Only admins can create rooms');
    }

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

  async updateRoom(roomId, roomData, user) {
    if (roomData.price_per_night && user.role !== 'admin') {
      throw new Error('Only admins can update room prices');
    }

    return await this.repository.transaction(async (transaction) => {
      const [updated] = await this.repository.update(roomData, { room_id: roomId }, { transaction });
      if (updated === 0) {
        throw new Error('Room not found');
      }
      if (roomData.price_per_night) {
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

  async deleteRoom(roomId) {
    const hasReservations = await this.repository.hasActiveReservations(roomId);
    if (hasReservations) {
      throw new Error('Cannot delete room with active reservations');
    }
    const deleted = await this.repository.delete({ room_id: roomId });
    if (deleted === 0) {
      throw new Error('Room not found');
    }
    return true;
  }

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

  async updateRoomStatus(roomId, status) {
    const validStatuses = ['Available', 'Occupied', 'Maintenance'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }
    if (status === 'Available') {
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