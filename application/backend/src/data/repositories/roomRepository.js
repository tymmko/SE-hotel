// src/data/repositories/roomRepository.js
const { Op } = require('sequelize');
const BaseRepository = require('./common/baseRepository');

/**
 * Repository for Room-related data operations
 * Extends BaseRepository with room-specific data access methods
 */
class RoomRepository extends BaseRepository {
	/**
	 * @param {Object} models - Sequelize models
	 */
	constructor(models) {
		super(models.Room);
		this.models = models; // Store all models for relationships
	}

	/**
	 * Find rooms with basic details (safer implementation)
	 * @param {Object} options - Additional query options
	 * @returns {Promise<Array>} List of rooms with related data
	 */
	async findRoomsWithDetails(options = {}) {
		try {
			// First, get all rooms without complex associations
			return await this.model.findAll({
				...options,
				raw: true // Get plain JSON objects instead of Sequelize instances
			});
		} catch (error) {
			console.error('Error in findRoomsWithDetails:', error);
			throw error; // Rethrow to let the service handle it
		}
	}

	/**
	 * Find a single room with basic details
	 * @param {number} roomId - Room ID
	 * @returns {Promise<Object>} Room with related data
	 */
	async findRoomWithDetails(roomId) {
		try {
			return await this.model.findByPk(roomId, {
				raw: true // Get plain JSON object instead of Sequelize instance
			});
		} catch (error) {
			console.error('Error in findRoomWithDetails:', error);
			throw error; // Rethrow to let the service handle it
		}
	}

	/**
	 * Find current reservation and guest for a room
	 * @param {number} roomId - Room ID
	 * @returns {Promise<Object>} Current reservation and guest info, or null if none
	 */
	async findCurrentReservationAndGuest(roomId) {
		try {
			const currentDate = new Date();
			const formattedDate = currentDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
			
			// Find current active reservation for the room
			const reservation = await this.models.Reservation.findOne({
				where: {
					room_id: roomId,
					status: 'confirmed', // Status from Reservation model, not Room model
					check_in_date: { [Op.lte]: formattedDate },  // Check-in date is today or earlier
					check_out_date: { [Op.gte]: formattedDate }  // Check-out date is today or later
				},
				include: [
					{
						model: this.models.Guest,
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
				return null;  // No current reservation found
			}
			
			// Format the response
			return {
				reservation: {
					reservation_id: reservation.reservation_id,
					check_in_date: reservation.check_in_date,
					check_out_date: reservation.check_out_date,
					status: reservation.status,
					stay: reservation.Stays && reservation.Stays.length > 0 ? {
						stay_id: reservation.Stays[0].stay_id,
						check_in_date: reservation.Stays[0].check_in_date,
						check_out_date: reservation.Stays[0].check_out_date
					} : null
				},
				guest: {
					guest_id: reservation.Guest.guest_id,
					first_name: reservation.Guest.first_name,
					last_name: reservation.Guest.last_name,
					email: reservation.Guest.email,
					phone_number: reservation.Guest.phone_number
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
	 * @param {Object} options - Additional query options
	 * @returns {Promise<Array>} List of price history entries for the room
	 */
	async findPriceHistoryByRoom(roomId, options = {}) {
		try {
			return await this.models.PriceHistory.findAll({
				where: { room_id: roomId },
				order: [['start_date', 'DESC']], // Most recent first
				...options,
				raw: true
			});
		} catch (error) {
			console.error('Error in findPriceHistoryByRoom:', error);
			throw error;
		}
	}

	/**
	 * Find equipment/amenities for a specific room
	 * @param {number} roomId - Room ID
	 * @returns {Promise<Array>} List of equipment items for the room
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
	 * @param {Date} startDate - Start date for the price
	 * @param {Date} endDate - End date for the price
	 * @returns {Promise<Object>} Created price history record
	 */
	async createPriceHistory(roomId, price, startDate = new Date(), endDate = null, options = {}) {
		try {
			// Default end date to 1 year from now if not specified
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
			throw error; // Rethrow to let the service handle it
		}
	}

	/**
	 * End the current price history for a room
	 * @param {number} roomId - Room ID
	 * @returns {Promise<Array>} [affectedCount, affectedRows]
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
			throw error; // Rethrow to let the service handle it
		}
	}

	/**
	 * Find room IDs with active reservations for a date range
	 * @param {Date} checkIn - Check-in date
	 * @param {Date} checkOut - Check-out date
	 * @returns {Promise<Array>} List of room IDs with reservations
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
						// Check-in during another stay
						{
							check_in_date: {
								[Op.between]: [new Date(checkIn), new Date(checkOut)]
							}
						},
						// Check-out during another stay
						{
							check_out_date: {
								[Op.between]: [new Date(checkIn), new Date(checkOut)]
							}
						},
						// Completely encompasses another stay
						{
							[Op.and]: [
								{ check_in_date: { [Op.lte]: new Date(checkIn) } },
								{ check_out_date: { [Op.gte]: new Date(checkOut) } }
							]
						}
					]
				},
				raw: true // Get plain JSON objects
			});

			return reservations.map(reservation => reservation.room_id);
		} catch (error) {
			console.error('Error in findBookedRoomIds:', error);
			throw error; // Rethrow to let the service handle it
		}
	}

	/**
	 * Find available rooms for a date range
	 * @param {Date} checkIn - Check-in date
	 * @param {Date} checkOut - Check-out date
	 * @returns {Promise<Array>} List of available rooms
	 */
	async findAvailableRooms(checkIn, checkOut) {
		try {
			const bookedRoomIds = await this.findBookedRoomIds(checkIn, checkOut);

			return await this.model.findAll({
				where: {
					id: {
						[Op.notIn]: bookedRoomIds.length > 0 ? bookedRoomIds : [0] // Use [0] when no booked rooms to avoid SQL error
					},
					status: 'Available'
				},
				raw: true // Get plain JSON objects
			});
		} catch (error) {
			console.error('Error in findAvailableRooms:', error);
			throw error; // Rethrow to let the service handle it
		}
	}

	/**
	 * Check if room has active reservations
	 * @param {number} roomId - Room ID
	 * @returns {Promise<boolean>} True if room has active reservations
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
			throw error; // Rethrow to let the service handle it
		}
	}
		/**
	 * Find price history for a specific room
	 * @param {number} roomId - Room ID
	 * @param {Object} options - Additional query options
	 * @returns {Promise<Array>} List of price history entries for the room
	 */
		async findPriceHistoryByRoom(roomId, options = {}) {
			try {
				return await this.models.PriceHistory.findAll({
					where: { room_id: roomId },
					order: [['start_date', 'DESC']], // Most recent first
					...options,
					raw: true
				});
			} catch (error) {
				console.error('Error in findPriceHistoryByRoom:', error);
				throw error;
			}
		}
	
	/*
	 * Find equipment/amenities for a specific room
	 * @param {number} roomId - Room ID
	 * @returns {Promise<Array>} List of equipment items for the room
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
	 * Find the current price for a room based on today's date
	 * @param {number|string} roomId
	 * @param {Date} date - Date to check price for (usually today)
	 * @returns {Promise<Object|null>} Matching price entry or most recent price in the past
	 */
	async findCurrentPrice(roomId, date = new Date()) {
		try {
		  // 1. First try to find a valid price
		  const current = await this.models.PriceHistory.findOne({
			where: {
			  room_id: roomId,
			  start_date: { [Op.lte]: date },
			  end_date: { [Op.gte]: date },
			},
			order: [['start_date', 'DESC']],
		  });
	  
		  if (current) return current;
	  
		  // 2. Fallback: get most recent price in the past
		  return await this.models.PriceHistory.findOne({
			where: {
			  room_id: roomId,
			  end_date: { [Op.lt]: date },
			},
			order: [['end_date', 'DESC']],
		  });
		} catch (error) {
		  console.error('Error in findCurrentPrice fallback:', error);
		  throw error;
		}
	  }	  

}

module.exports = RoomRepository;