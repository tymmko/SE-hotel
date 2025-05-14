// src/services/reservationService.js
const { Op } = require('sequelize');
const BaseService = require('./common/baseService');

/**
 * Service for Reservation-related business logic
 * Implements business rules for reservation management
 */
class ReservationService extends BaseService {
	/**
	 * @param {ReservationRepository} reservationRepository - Repository for reservation data
	 * @param {RoomRepository} roomRepository - Repository for room data
	 */
	constructor(reservationRepository, roomRepository) {
		super(reservationRepository);
		this.roomRepository = roomRepository;
	}

	/**
	 * Get all reservations with details
	 * @returns {Promise<Array>} List of reservations with details
	 */
	async getAllReservationsWithDetails() {
		return await this.repository.findReservationsWithDetails();
	}

	/**
	 * Get a single reservation with details
	 * @param {number} reservationId - Reservation ID
	 * @returns {Promise<Object>} Reservation with details
	 * @throws {Error} If reservation not found
	 */
	async getReservationWithDetails(reservationId) {
		const reservation = await this.repository.findReservationWithDetails(reservationId);
		
		if (!reservation) {
			throw new Error('Reservation not found');
		}
		
		return reservation;
	}

	/**
	 * Get reservations by status
	 * @param {string} status - Reservation status
	 * @returns {Promise<Array>} List of reservations with specified status
	 */
	async getReservationsByStatus(status) {
		// Validate status
		const validStatuses = ['confirmed', 'checked-in', 'checked-out', 'paid'];
		
		if (!validStatuses.includes(status)) {
			throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
		}
		
		return await this.repository.findReservationsByStatus(status);
	}

	/**
	 * Get reservations for a specific guest
	 * @param {number} guestId - Guest ID
	 * @returns {Promise<Array>} List of reservations for the guest
	 */
	async getReservationsByGuest(guestId) {
		return await this.repository.findReservationsByGuest(guestId);
	}

	/**
	 * Create a new reservation
	 * @param {Object} reservationData - Reservation data
	 * @returns {Promise<Object>} Created reservation
	 * @throws {Error} If room is not available for the dates
	 */
	async createReservation(reservationData) {
		// Validate required fields
		if (!reservationData.room_id || !reservationData.guest_id || 
				!reservationData.check_in_date || !reservationData.check_out_date) {
			throw new Error('Room ID, Guest ID, check-in date, and check-out date are required');
		}
		
		const checkInDate = new Date(reservationData.check_in_date);
		const checkOutDate = new Date(reservationData.check_out_date);
		
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
		
		// Check room availability
		const isAvailable = await this.repository.isRoomAvailable(
			reservationData.room_id,
			checkInDate,
			checkOutDate
		);
		
		if (!isAvailable) {
			throw new Error('Room is not available for the selected dates');
		}
		
		// Get room to calculate total price
		const room = await this.roomRepository.findById(reservationData.room_id);
		
		if (!room) {
			throw new Error('Room not found');
		}
		
		// Calculate total price
		const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
		const totalPrice = room.price_per_night * nights;
		
		// Set default status if not provided
		if (!reservationData.status) {
			reservationData.status = 'confirmed';
		} else if (reservationData.status !== 'confirmed' && reservationData.status !== 'canceled') {
			throw new Error('Status must be either confirmed or canceled');
		}
		
		// Create the reservation
		const reservation = await this.repository.create({
			...reservationData,
			total_price: totalPrice
		});
		
		return await this.getReservationWithDetails(reservation.id);
	}

	/**
	 * Update a reservation
	 * @param {number} reservationId - Reservation ID
	 * @param {Object} reservationData - Updated reservation data
	 * @returns {Promise<Object>} Updated reservation
	 * @throws {Error} If reservation not found or room is not available
	 */
	async updateReservation(reservationId, reservationData) {
		// Get current reservation
		const currentReservation = await this.getReservationWithDetails(reservationId);
		
		// Check if status is being changed to Canceled
		const isStatusChange = reservationData.status && reservationData.status === 'canceled';
		
		// Check if dates are being changed
		const isDateChange = (reservationData.check_in_date || reservationData.check_out_date) &&
												(!isStatusChange);
		
		// Validate status if provided
		if (reservationData.status && 
				reservationData.status !== 'confirmed' && 
				reservationData.status !== 'paid' &&
				reservationData.status !== 'checked-in' &&
				reservationData.status !== 'checked-out'
			) {
			throw new Error('Status must be either confirmed or canceled');
		}
		
		// If dates are changing, verify room availability
		if (isDateChange) {
			const checkInDate = new Date(reservationData.check_in_date || currentReservation.check_in_date);
			const checkOutDate = new Date(reservationData.check_out_date || currentReservation.check_out_date);
			
			// Validate dates
			if (isNaN(checkInDate) || isNaN(checkOutDate)) {
				throw new Error('Invalid date format');
			}
			
			if (checkInDate >= checkOutDate) {
				throw new Error('Check-out date must be after check-in date');
			}
			
			if (checkInDate < new Date() && checkInDate.toDateString() !== new Date().toDateString()) {
				throw new Error('Check-in date cannot be in the past');
			}
			
			// Check room availability, excluding current reservation
			const roomId = reservationData.room_id || currentReservation.room_id;
			const isAvailable = await this.repository.isRoomAvailable(
				roomId,
				checkInDate,
				checkOutDate,
				reservationId
			);
			
			if (!isAvailable) {
				throw new Error('Room is not available for the selected dates');
			}
			
			// Recalculate total price if dates or room changed
			if (reservationData.check_in_date || reservationData.check_out_date || reservationData.room_id) {
				const room = await this.roomRepository.findById(roomId);
				
				if (!room) {
					throw new Error('Room not found');
				}
				
				// Calculate total price
				const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
				reservationData.total_price = room.price_per_night * nights;
			}
		}
		
		// Update reservation
		const [updated] = await this.repository.update(reservationData, { id: reservationId });
		
		if (updated === 0) {
			throw new Error('Reservation not found');
		}
		
		return await this.getReservationWithDetails(reservationId);
	}

	/**
	 * Update reservation status
	 * @param {number} reservationId - Reservation ID
	 * @param {string} status - New status
	 * @returns {Promise<Object>} Updated reservation
	 * @throws {Error} If status is invalid or reservation not found
	 */
	async updateReservationStatus(reservationId, status) {
		const validStatuses = ['confirmed', 'checked-in', 'checked-out', 'paid'];
	  
		if (!validStatuses.includes(status)) {
			throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
		}
	  
		const reservation = await this.getReservationWithDetails(reservationId);
	  
		if (!reservation) {
			throw new Error('Reservation not found');
		}
	  
		// Business rule: if trying to mark as checked-in
		if (status === 'checked-in') {
			const roomId = reservation.room_id;
		
			// Look for any OTHER reservation already marked as checked-in for the same room
			const existingCheckedIn = await this.repository.model.findOne({
			where: {
				room_id: roomId,
				status: 'checked-in',
				id: { [Op.ne]: reservationId }
			}
			});
		
			if (existingCheckedIn) {
				throw new Error('Another reservation is already checked-in for this room');
			}
		}
	  
		// Continue with status update
		const [updated] = await this.repository.updateReservationStatus(reservationId, status);
	  
		if (updated === 0) {
			throw new Error('Reservation not found');
		}
	  
		// Also update room status
		if (status === 'checked-in') {
			await this.roomRepository.update({ status: 'occupied' }, { id: reservation.room_id });
		} else if (status === 'checked-out') {
			await this.roomRepository.update({ status: 'available' }, { id: reservation.room_id });
		}
	  
		return await this.getReservationWithDetails(reservationId);
	}
}

module.exports = ReservationService;