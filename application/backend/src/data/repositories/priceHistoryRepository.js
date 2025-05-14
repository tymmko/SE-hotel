// src/data/repositories/priceHistoryRepository.js

const BaseRepository = require('./common/baseRepository');

class PriceHistoryRepository extends BaseRepository {
	/**
	 * @param {Object} models - Sequelize models
	 */
	constructor(models) {
		super(models.PriceHistory);
		this.models = models;
	}

	/**
	 * Add a new price history entry to a room
	 * @param {number} roomId - Room ID
	 * @param {number} price - Price per night
	 * @param {Date} startDate - Start date
	 * @param {Date} endDate - End date
	 * @returns {Promise<Object>} The created price history
	 */
	async addPriceHistory(roomId, price, startDate, endDate) {
		try {
			return await this.model.create({
				room_id: roomId,
				price: price,
				start_date: startDate,
				end_date: endDate
			});
		} catch (error) {
			console.error('Error in addPriceHistory:', error);
			throw error;
		}
	}

	/**
	 * Get all price history entries for a given room
	 * @param {number} roomId - Room ID
	 * @returns {Promise<Array>} Price history entries
	 */
	async findPriceHistoryByRoom(roomId) {
		try {
			return await this.model.findAll({
				where: { room_id: roomId },
				order: [['start_date', 'DESC']],
				raw: true
			});
		} catch (error) {
			console.error('Error in findPriceHistoryByRoom:', error);
			throw error;
		}
	}
}

module.exports = PriceHistoryRepository;
