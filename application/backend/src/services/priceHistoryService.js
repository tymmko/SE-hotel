/**
 * Service for managing price history-related business logic
 * Extends BaseService to provide price history-specific operations
 */
class PriceHistoryService extends BaseService {
  /**
   * @param {PriceHistoryRepository} priceHistoryRepository - Repository for price history data
   * @param {RoomRepository} roomRepository - Repository for room data
   */
  constructor(priceHistoryRepository, roomRepository) {
    super(priceHistoryRepository);
    this.roomRepository = roomRepository;
  }

  /**
   * Add a new price history entry for a room
   * @param {number} roomId - Room ID
   * @param {number} price - Price per night
   * @param {Date} [startDate] - Start date (defaults to now)
   * @param {Date} [endDate] - End date (defaults to one year from now)
   * @returns {Promise<Object>} Created price history entry
   * @throws {Error} If room is not found or dates overlap
   */
  async addPriceHistory(roomId, price, startDate, endDate) {
    const room = await this.roomRepository.findRoomWithDetails(Number(roomId));
    if (!room) {
      throw new Error('Room not found');
    }

		// Normalize dates
		const newStart = startDate || new Date();
		const newEnd = endDate || new Date(new Date(newStart).setFullYear(newStart.getFullYear() + 1));

    const existingPrices = await this.repository.findPriceHistoryByRoom(roomId);
    const hasOverlap = existingPrices.some(entry => {
      const existingStart = new Date(entry.start_date);
      const existingEnd = new Date(entry.end_date);
      return newStart <= existingEnd && newEnd >= existingStart;
    });

    if (hasOverlap) {
      throw new Error('New price range overlaps with existing price history');
    }

    return await this.repository.addPriceHistory(roomId, price, newStart, newEnd);
  }
}

module.exports = PriceHistoryService;
