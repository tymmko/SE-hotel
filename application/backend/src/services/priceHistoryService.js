// src/services/priceHistoryService.js

const BaseService = require('./common/baseService');

/**
 * Service for PriceHistory business logic
 */
class PriceHistoryService extends BaseService {
  /**
   * @param {PriceHistoryRepository} priceHistoryRepository
   * @param {RoomRepository} roomRepository
   */
  constructor(priceHistoryRepository, roomRepository) {
    super(priceHistoryRepository);
    this.roomRepository = roomRepository;
  }

  /**
   * Add a new price history to a room
   * @param {number} roomId - Room ID
   * @param {number} price - Price per night
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @returns {Promise<Object>} Created price history
   * @throws {Error} If room does not exist
   */
  async addPriceHistory(roomId, price, startDate, endDate) {
    // Verify room exists
    const room = await this.roomRepository.findRoomWithDetails(roomId);
    if (!room) {
      throw new Error('Room not found');
    }

    // Create the price history
    return await this.repository.addPriceHistory(
      roomId,
      price,
      startDate || new Date(),
      endDate || null
    );
  }
}

module.exports = PriceHistoryService;
