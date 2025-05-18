const BaseRepository = require('./common/baseRepository');
const { Op } = require('sequelize');

/**
 * Repository for managing room-related data operations
 * Extends BaseRepository to provide room-specific data access methods
 */
class RoomRepository extends BaseRepository {
	/**
	 * @param {Object} models - Sequelize models
	 */
	constructor(models) {
		super(models.Room);
		this.models = models;
	}

	/**
	 * Find all rooms with basic details
	 * @param {Object} [options={}] - Additional query options
	 * @returns {Promise<Array>} List of rooms
	 * @throws {Error} If an error occurs during the query
	 */
	async findRoomsWithDetails(options = {}) {
		try {
			return await this.model.findAll({
				...options,
				raw: true
			});
		} catch (error) {
			console.error('Error in findRoomsWithDetails:', error);
			throw error;
		}
	}

	/**
	 * Find a single room by ID with basic details
	 * @param {number} roomId - Room ID
	 * @returns {Promise<Object|null>} Room data
	 * @throws {Error} If an error occurs during the query
	 */
	async findRoomWithDetails(roomId) {
		try {
			return await this.model.findByPk(roomId, {
				raw: true
			});
		} catch (error) {
			console.error('Error in findRoomWithDetails:', error);
			throw error;
		}
	}

	/**
	 * Find the current reservation and guest for a room
	 * @param {number} roomId - Room ID
	 * @returns {Promise<Object|null>} Current reservation and guest info, or null
	 * @throws {Error} If an error occurs during the query
	 */
	async findCurrentReservationAndGuest(roomId) {
		try {
			const reservation = await this.models.Reservation.findOne({
				where: {
					id: roomId,
					status: 'checked-in'
				},
				include: [
					{
						model: this.models.User,
						attributes: ['id', 'first_name', 'last_name', 'email', 'phone_number']
					},
					{
						model: this.models.Stay,
						attributes: ['stay_id', 'check_in_date', 'check_out_date']
					}
				],
				raw: false
			});
	
			if (!reservation) {
				return null;
			}
	
			return {
				reservation: {
					id: reservation.id,
					check_in_date: reservation.check_in_date,
					check_out_date: reservation.check_out_date,
					status: reservation.status,
					stay: reservation.Stays?.[0] || null
				},
				guest: {
					id: reservation.User.id,
					first_name: reservation.User.first_name,
					last_name: reservation.User.last_name,
					email: reservation.User.email,
					phone_number: reservation.User.phone_number
				}
			};
		} catch (error) {
			console.error('Error in findCurrentReservationAndGuest:', error);
			throw error;
		}
	}

	/**
	 * Find price history for a specific room
	 * @param {number} roomId - Room ID
	 * @param {Object} [options={}] - Additional query options
	 * @returns {Promise<Array>} List of price history entries
	 * @throws {Error} If an error occurs during the query
	 */
	async findPriceHistoryByRoom(roomId, options = {}) {
		try {
			return await this.models.PriceHistory.findAll({
				where: { room_id: roomId },
				order: [['start_date', 'DESC']],
				...options,
				raw: true
			});
		} catch (error) {
			console.error('Error in findPriceHistoryByRoom:', error);
			throw error;
		}
	}

	/**
	 * Find equipment for a specific room
	 * @param {number} roomId - Room ID
	 * @returns {Promise<Array>} List of equipment items
	 * @throws {Error} If an error occurs during the query
	 */
	async findEquipmentByRoom(roomId) {
		try {
			return await this.models.Equipment.findAll({
				where: { room_id: roomId },
				order: [['name', 'ASC']],
				raw: true
			});
		} catch (error) {
			console.error('Error in findEquipmentByRoom:', error);
			throw error;
		}
	}

	/**
	 * Create a new price history record for a room
	 * @param {number} roomId - Room ID
	 * @param {number} price - Price per night
	 * @param {Date} [startDate] - Start date (defaults to now)
	 * @param {Date} [endDate] - End date (defaults to one year from now)
	 * @param {Object} [options={}] - Additional query options
	 * @returns {Promise<Object>} Created price history record
	 * @throws {Error} If an error occurs during creation
	 */
	async createPriceHistory(roomId, price, startDate = new Date(), endDate = null, options = {}) {
		try {
			if (!endDate) {
				endDate = new Date();
				endDate.setFullYear(endDate.getFullYear() + 1);
			}

			return await this.models.PriceHistory.create({
				room_id: roomId,
				start_date: startDate,
				end_date: endDate,
				price: price
			}, options);
		} catch (error) {
			console.error('Error in createPriceHistory:', error);
			throw error;
		}
	}

	/**
	 * End the current price history for a room
	 * @param {number} roomId - Room ID
	 * @returns {Promise<Array>} [affectedCount, affectedRows]
	 * @throws {Error} If an error occurs during the update
	 */
	async endCurrentPriceHistory(roomId) {
		try {
			return await this.models.PriceHistory.update(
				{ end_date: new Date() },
				{
					where: {
						room_id: roomId,
						end_date: { [Op.gt]: new Date() }
					}
				}
			);
		} catch (error) {
			console.error('Error in endCurrentPriceHistory:', error);
			throw error;
		}
	}

	/**
	 * Find room IDs with active reservations for a date range
	 * @param {Date} checkIn - Check-in date
	 * @param {Date} checkOut - Check-out date
	 * @returns {Promise<Array>} List of booked room IDs
	 * @throws {Error} If an error occurs during the query
	 */
	async findBookedRoomIds(checkIn, checkOut) {
		try {
			const reservations = await this.models.Reservation.findAll({
				attributes: ['room_id'],
				where: {
					status: {
						[Op.notIn]: ['canceled']
					},
					[Op.or]: [
						{
							check_in_date: {
								[Op.between]: [new Date(checkIn), new Date(checkOut)]
							}
						},
						{
							check_out_date: {
								[Op.between]: [new Date(checkIn), new Date(checkOut)]
							}
						},
						{
							[Op.and]: [
								{ check_in_date: { [Op.lte]: new Date(checkIn) } },
								{ check_out_date: { [Op.gte]: new Date(checkOut) } }
							]
						}
					]
				},
				raw: true
			});

			return reservations.map(reservation => reservation.room_id);
		} catch (error) {
			console.error('Error in findBookedRoomIds:', error);
			throw error;
		}
	}

	/**
	 * Find available rooms for a date range
	 * @param {Date} checkIn - Check-in date
	 * @param {Date} checkOut - Check-out date
	 * @returns {Promise<Array>} List of available rooms
	 * @throws {Error} If an error occurs during the query
	 */
	async findAvailableRooms(checkIn, checkOut) {
		try {
			const bookedRoomIds = await this.findBookedRoomIds(checkIn, checkOut);

			return await this.model.findAll({
				where: {
					id: {
						[Op.notIn]: bookedRoomIds.length > 0 ? bookedRoomIds : [0]
					},
					status: 'Available'
				},
				raw: true
			});
		} catch (error) {
			console.error('Error in findAvailableRooms:', error);
			throw error;
		}
	}

	/**
	 * Check if a room has active reservations
	 * @param {number} roomId - Room ID
	 * @returns {Promise<boolean>} True if the room has active reservations
	 * @throws {Error} If an error occurs during the query
	 */
	async hasActiveReservations(roomId) {
		try {
			const count = await this.models.Reservation.count({
				where: {
					room_id: roomId,
					status: {
						[Op.notIn]: ['canceled']
					}
				}
			});

			return count > 0;
		} catch (error) {
			console.error('Error in hasActiveReservations:', error);
			throw error;
		}
	}

	/**
	 * Find the current price for a room
	 * @param {number|string} roomId - Room ID
	 * @param {Date} [date] - Date to check price for (defaults to now)
	 * @returns {Promise<Object|null>} Current or most recent price entry
	 * @throws {Error} If an error occurs during the query
	 */
	async findCurrentPrice(roomId, date = new Date()) {
		try {
			const current = await this.models.PriceHistory.findOne({
				where: {
					room_id: roomId,
					start_date: { [Op.lte]: date },
					end_date: { [Op.gte]: date },
				},
				order: [['start_date', 'DESC']],
			});
	
			if (current) return current;
	
			return await this.models.PriceHistory.findOne({
				where: {
					room_id: roomId,
					end_date: { [Op.lt]: date },
				},
				order: [['end_date', 'DESC']],
			});
		} catch (error) {
			console.error('Error in findCurrentPrice:', error);
			throw error;
		}
	}
}

module.exports = RoomRepository;