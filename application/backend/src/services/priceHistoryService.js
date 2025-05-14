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
	 * @throws {Error} If room does not exist or dates overlap
	 */
	async addPriceHistory(roomId, price, startDate, endDate) {
		// Verify room exists
		const room = await this.roomRepository.findRoomWithDetails(Number(roomId));
		if (!room) {
			throw new Error('Room not found');
		}

		// Normalize dates
		const newStart = startDate || new Date();
		const newEnd = endDate || new Date(new Date().setFullYear(new Date().getFullYear() + 1));

		// Check for overlapping price history
		const existingPrices = await this.repository.findPriceHistoryByRoom(roomId);
		const hasOverlap = existingPrices.some(entry => {
			const existingStart = new Date(entry.start_date);
			const existingEnd = new Date(entry.end_date);
			return newStart <= existingEnd && newEnd >= existingStart;
		});

		if (hasOverlap) {
			throw new Error('New price range overlaps with existing price history');
		}

		// Create the price history
		return await this.repository.addPriceHistory(roomId, price, newStart, newEnd);
	}
}

module.exports = PriceHistoryService;
