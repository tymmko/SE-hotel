/**
 * Service for managing reservation-related business logic
 * Extends BaseService to provide reservation-specific operations
 */
class ReservationService extends BaseService {
  /**
   * @param {ReservationRepository} reservationRepository - Repository for reservation data
   * @param {RoomRepository} roomRepository - Repository for room data
   * @param {UserRepository} userRepository - Repository for user data
   */
  constructor(reservationRepository, roomRepository, userRepository) {
    super(reservationRepository);
    this.roomRepository = roomRepository;
    this.userRepository = userRepository;
  }

  /**
   * Retrieve all reservations with associated details
   * @returns {Promise<Array>} List of reservations with details
   */
  async getAllReservationsWithDetails() {
    return await this.repository.findReservationsWithDetails();
  }

  /**
   * Retrieve a single reservation by ID with associated details
   * @param {number|string} reservationId - Reservation ID
   * @returns {Promise<Object>} Reservation with details
   * @throws {Error} If reservation is not found
   */
  async getReservationWithDetails(reservationId) {
    const reservation = await this.repository.findReservationWithDetails(reservationId);
    if (!reservation) {
      throw new Error('Reservation not found');
    }
    return reservation;
  }

  /**
   * Retrieve reservations by status
   * @param {string} status - Reservation status (e.g., 'confirmed', 'checked-in')
   * @returns {Promise<Array>} List of reservations with the specified status
   * @throws {Error} If status is invalid
   */
  async getReservationsByStatus(status) {
    const validStatuses = ['confirmed', 'checked-in', 'checked-out', 'paid'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }
    return await this.repository.findReservationsByStatus(status);
  }

  /**
   * Retrieve reservations associated with a user
   * @param {number|string} userId - User ID
   * @returns {Promise<Array>} List of reservations for the user
   * @throws {Error} If user is not found
   */
  async getReservationsByUser(userId) {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return await this.repository.findReservationsByUser(userId);
  }

  /**
   * Create a new reservation
   * @param {Object} reservationData - Reservation data
   * @param {number} reservationData.room_id - Room ID
   * @param {number} reservationData.user_id - User ID
   * @param {string} reservationData.check_in_date - Check-in date
   * @param {string} reservationData.check_out_date - Check-out date
   * @param {string} [reservationData.status] - Reservation status (defaults to 'confirmed')
   * @returns {Promise<Object>} Created reservation with details
   * @throws {Error} If required fields are missing, dates are invalid, room is unavailable, or user/room is not found
   */
  async createReservation(reservationData) {
    const { room_id, user_id, check_in_date, check_out_date, status } = reservationData;

    if (!room_id || !user_id || !check_in_date || !check_out_date) {
      throw new Error('Room ID, User ID, check-in date, and check-out date are required');
    }

    const user = await this.userRepository.findUserById(user_id);
    if (!user) {
      throw new Error('User (guest) not found');
    }
    
    const room = await this.roomRepository.findRoomWithDetails(room_id);
    if (!room) {
      throw new Error('Room not found');
    }

    const priceEntry = await this.roomRepository.findCurrentPrice(room_id, new Date(check_in_date));
    if (!priceEntry || priceEntry.price == null) {
      throw new Error('Could not determine room price for the selected dates.');
    }

    const checkInDate = new Date(check_in_date);
    const checkOutDate = new Date(check_out_date);

    if (isNaN(checkInDate.valueOf()) || isNaN(checkOutDate.valueOf())) {
      throw new Error('Invalid date format');
    }
    if (checkInDate >= checkOutDate) {
      throw new Error('Check-out date must be after check-in date');
    }
    const today = new Date();
    today.setHours(0,0,0,0);
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
    
    const finalStatus = status || 'confirmed';
    if (finalStatus !== 'confirmed' && finalStatus !== 'canceled') {
      throw new Error('Initial status must be either confirmed or canceled, or left empty (defaults to confirmed)');
    }

    const reservation = await this.repository.create({
      ...reservationData,
      status: finalStatus,
    });
    return await this.getReservationWithDetails(reservation.id);
  }

  /**
   * Update an existing reservation
   * @param {number|string} reservationId - Reservation ID
   * @param {Object} reservationData - Data to update
   * @param {number} [reservationData.room_id] - Room ID
   * @param {number} [reservationData.user_id] - User ID
   * @param {string} [reservationData.check_in_date] - Check-in date
   * @param {string} [reservationData.check_out_date] - Check-out date
   * @param {string} [reservationData.status] - Reservation status
   * @returns {Promise<Object>} Updated reservation with details
   * @throws {Error} If reservation is not found, dates are invalid, room is unavailable, or user/room is not found
   */
  async updateReservation(reservationId, reservationData) {
    const currentReservation = await this.getReservationWithDetails(reservationId);

    const { room_id, user_id, check_in_date, check_out_date, status } = reservationData;

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
    if (finalCheckInDate < today && finalCheckInDate.toDateString() !== today.toDateString()) {
      throw new Error('Check-in date cannot be in the past');
    }

    if (room_id || check_in_date || check_out_date) {
      const isAvailable = await this.repository.isRoomAvailable(
        finalRoomId,
        finalCheckInDate,
        finalCheckOutDate,
        reservationId
      );
      if (!isAvailable) {
        throw new Error('Room is not available for the selected dates/room');
      }
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

  /**
   * Update the status of a reservation
   * @param {number|string} reservationId - Reservation ID
   * @param {string} status - New status
   * @returns {Promise<Object>} Updated reservation with details
   * @throws {Error} If reservation is not found, status is invalid, or room is already checked-in
   */
  async updateReservationStatus(reservationId, status) {
    const validStatuses = ['confirmed', 'checked-in', 'checked-out', 'paid', 'canceled'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    const reservation = await this.getReservationWithDetails(reservationId);

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
      const otherCheckedIn = await this.repository.findOne({
        room_id: reservation.room_id,
        status: 'checked-in',
        id: { [Op.ne]: reservationId }
      });
      if (!otherCheckedIn) {
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