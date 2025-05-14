// src/services/reservationService.js
const { Op } = require('sequelize');
const BaseService = require('./common/baseService');

class ReservationService extends BaseService {
  constructor(reservationRepository, roomRepository, userRepository) { // Added userRepository
    super(reservationRepository);
    this.roomRepository = roomRepository;
    this.userRepository = userRepository; // Added userRepository
  }

  async getAllReservationsWithDetails() {
    return await this.repository.findReservationsWithDetails();
  }

  async getReservationWithDetails(reservationId) {
    const reservation = await this.repository.findReservationWithDetails(reservationId);
    if (!reservation) {
      throw new Error('Reservation not found');
    }
    return reservation;
  }

  async getReservationsByStatus(status) {
    const validStatuses = ['confirmed', 'checked-in', 'checked-out', 'paid'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }
    return await this.repository.findReservationsByStatus(status);
  }

  async getReservationsByUser(userId) { // Changed from getReservationsByGuest
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return await this.repository.findReservationsByUser(userId); // Changed from findReservationsByGuest
  }

  async createReservation(reservationData) {
    const { room_id, user_id, check_in_date, check_out_date, status } = reservationData; // Changed guest_id to user_id

    if (!room_id || !user_id || !check_in_date || !check_out_date) {
      throw new Error('Room ID, User ID, check-in date, and check-out date are required');
    }

    const user = await this.userRepository.findUserById(user_id);
    if (!user) {
        throw new Error('User (guest) not found');
    }
    
    const room = await this.roomRepository.findRoomWithDetails(room_id); // Use findRoomWithDetails to get price
    if (!room) {
      throw new Error('Room not found');
    }
    // Fetch current price for the room
    const currentDate = new Date(); // Or use check_in_date for pricing period
    const priceEntry = await this.roomRepository.findCurrentPrice(room_id, new Date(check_in_date));
    if (!priceEntry || priceEntry.price == null) {
        throw new Error('Could not determine room price for the selected dates.');
    }
    const effectivePricePerNight = priceEntry.price;


    const checkInDate = new Date(check_in_date);
    const checkOutDate = new Date(check_out_date);

    if (isNaN(checkInDate.valueOf()) || isNaN(checkOutDate.valueOf())) {
      throw new Error('Invalid date format');
    }
    if (checkInDate >= checkOutDate) {
      throw new Error('Check-out date must be after check-in date');
    }
    const today = new Date();
    today.setHours(0,0,0,0); // Compare dates only
    if (checkInDate < today) {
      throw new Error('Check-in date cannot be in the past');
    }

    const isAvailable = await this.repository.isRoomAvailable(
      room_id,
      checkInDate,
      checkOutDate
    );
    if (!isAvailable) {
      throw new Error('Room is not available for the selected dates');
    }
    
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const totalPrice = effectivePricePerNight * nights; // Use effective price

    const finalStatus = status || 'confirmed';
    if (finalStatus !== 'confirmed' && finalStatus !== 'canceled') { // Initial status can be confirmed or canceled
        throw new Error('Initial status must be either confirmed or canceled, or left empty (defaults to confirmed)');
    }

    const reservation = await this.repository.create({
      ...reservationData, // Contains room_id, user_id, check_in_date, check_out_date
      status: finalStatus,
      // total_price: totalPrice, // Assuming Reservation model has total_price
    });
    return await this.getReservationWithDetails(reservation.id);
  }

  async updateReservation(reservationId, reservationData) {
    const currentReservation = await this.getReservationWithDetails(reservationId);

    const { room_id, user_id, check_in_date, check_out_date, status } = reservationData;

    // Validate user if user_id is being changed
    if (user_id && user_id !== currentReservation.user_id) {
        const user = await this.userRepository.findUserById(user_id);
        if (!user) {
            throw new Error('New user (guest) not found');
        }
    }

    const finalRoomId = room_id || currentReservation.room_id;
    const room = await this.roomRepository.findRoomWithDetails(finalRoomId);
    if (!room) {
        throw new Error('Room not found');
    }
    
    const finalCheckInDate = check_in_date ? new Date(check_in_date) : new Date(currentReservation.check_in_date);
    const finalCheckOutDate = check_out_date ? new Date(check_out_date) : new Date(currentReservation.check_out_date);
    
    if (isNaN(finalCheckInDate.valueOf()) || isNaN(finalCheckOutDate.valueOf())) {
        throw new Error('Invalid date format');
    }
    if (finalCheckInDate >= finalCheckOutDate) {
        throw new Error('Check-out date must be after check-in date');
    }
    const today = new Date();
    today.setHours(0,0,0,0);
    if (finalCheckInDate < today && finalCheckInDate.toDateString() !== today.toDateString()) { // Allow same-day check-in
        throw new Error('Check-in date cannot be in the past');
    }

    if (room_id || check_in_date || check_out_date) {
        const isAvailable = await this.repository.isRoomAvailable(
            finalRoomId,
            finalCheckInDate,
            finalCheckOutDate,
            reservationId // Exclude current reservation from conflict check
        );
        if (!isAvailable) {
            throw new Error('Room is not available for the selected dates/room');
        }
        // Recalculate total price if dates or room changed
        const priceEntry = await this.roomRepository.findCurrentPrice(finalRoomId, finalCheckInDate);
        if (!priceEntry || priceEntry.price == null) {
            throw new Error('Could not determine room price for the selected dates.');
        }
        const effectivePricePerNight = priceEntry.price;
        const nights = Math.ceil((finalCheckOutDate - finalCheckInDate) / (1000 * 60 * 60 * 24));
        // reservationData.total_price = effectivePricePerNight * nights; // If you have total_price
    }

    if (status) {
        const validStatuses = ['confirmed', 'checked-in', 'checked-out', 'paid', 'canceled'];
        if (!validStatuses.includes(status)) {
            throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
        }
    }

    const [updatedCount] = await this.repository.update(reservationData, { id: reservationId });
    if (updatedCount === 0) {
      throw new Error('Reservation not found or no changes made');
    }
    return await this.getReservationWithDetails(reservationId);
  }

  async updateReservationStatus(reservationId, status) {
    const validStatuses = ['confirmed', 'checked-in', 'checked-out', 'paid', 'canceled'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    const reservation = await this.getReservationWithDetails(reservationId);
    // No need to call findById again, already fetched by getReservationWithDetails

    if (status === 'checked-in') {
      const existingCheckedIn = await this.repository.findOne({
        room_id: reservation.room_id,
        status: 'checked-in',
        id: { [Op.ne]: reservationId }
      });
      if (existingCheckedIn) {
        throw new Error('Another reservation is already checked-in for this room');
      }
      await this.roomRepository.update({ status: 'occupied' }, { id: reservation.room_id });
    } else if (status === 'checked-out' || status === 'canceled') {
      // Check if other 'checked-in' reservations exist for this room before marking as 'available'
      const otherCheckedIn = await this.repository.findOne({
          room_id: reservation.room_id,
          status: 'checked-in',
          id: { [Op.ne]: reservationId } // Exclude the current one if it's being canceled/checked-out
      });
      if (!otherCheckedIn) { // Only set to available if no other reservation is checked-in
          await this.roomRepository.update({ status: 'available' }, { id: reservation.room_id });
      }
    }

    const [updatedCount] = await this.repository.updateReservationStatus(reservationId, status);
    if (updatedCount === 0) {
      throw new Error('Reservation not found or status not changed');
    }
    return await this.getReservationWithDetails(reservationId);
  }
}

module.exports = ReservationService;