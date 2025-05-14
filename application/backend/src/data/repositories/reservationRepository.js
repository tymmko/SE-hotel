// src/data/repositories/reservationRepository.js
const { Op } = require('sequelize');
const BaseRepository = require('./common/baseRepository');

/**
 * Repository for Reservation-related data operations
 * Extends BaseRepository with reservation-specific data access methods
 */
class ReservationRepository extends BaseRepository {
  /**
   * @param {Object} models - Sequelize models
   */
  constructor(models) {
    super(models.Reservation);
    this.models = models; // Store all models for relationships
  }

  /**
   * Find reservations with basic details
   * @param {Object} options - Additional query options
   * @returns {Promise<Array>} List of reservations with related data
   */
  async findReservationsWithDetails(options = {}) {
    try {
      return await this.model.findAll({
        include: [
          {
            model: this.models.Guest,
            attributes: ['id', 'first_name', 'last_name', 'email']
          },
          {
            model: this.models.Room,
            attributes: ['id', 'type', 'capacity']
          }
        ],
        ...options,
        raw: false // Need Sequelize instances for includes
      });
    } catch (error) {
      console.error('Error in findReservationsWithDetails:', error);
      throw error; // Rethrow to let the service handle it
    }
  }

  /**
   * Find a single reservation with details
   * @param {number} reservationId - Reservation ID
   * @returns {Promise<Object>} Reservation with related data
   */
  async findReservationWithDetails(reservationId) {
    try {
      return await this.model.findByPk(reservationId, {
       
        raw: false // Need Sequelize instances for includes
      });
    } catch (error) {
      console.error('Error in findReservationWithDetails:', error);
      throw error; // Rethrow to let the service handle it
    }
  }

  /**
   * Find reservations by status
   * @param {string} status - Reservation status
   * @returns {Promise<Array>} List of reservations with specified status
   */
  async findReservationsByStatus(status) {
    try {
      return await this.findReservationsWithDetails({
        where: { status }
      });
    } catch (error) {
      console.error('Error in findReservationsByStatus:', error);
      throw error;
    }
  }

  /**
   * Find reservations for a specific guest
   * @param {number} guestId - Guest ID
   * @returns {Promise<Array>} List of reservations for the guest
   */
  async findReservationsByGuest(guestId) {
    try {
      return await this.findReservationsWithDetails({
        where: { guest_id: guestId }
      });
    } catch (error) {
      console.error('Error in findReservationsByGuest:', error);
      throw error;
    }
  }

  /**
   * Find reservations for a specific room
   * @param {number} roomId - Room ID
   * @returns {Promise<Array>} List of reservations for the room
   */
  async findReservationsByRoom(roomId) {
    try {
      return await this.findReservationsWithDetails({
        where: { room_id: roomId }
      });
    } catch (error) {
      console.error('Error in findReservationsByRoom:', error);
      throw error;
    }
  }

  /**
   * Update reservation status
   * @param {number} reservationId - Reservation ID
   * @param {string} status - New status
   * @returns {Promise<Array>} [affectedCount, affectedRows]
   */
  async updateReservationStatus(reservationId, status) {
    try {
      return await this.model.update(
        { status },
        {
          where: { id: reservationId }
        }
      );
    } catch (error) {
      console.error('Error in updateReservationStatus:', error);
      throw error;
    }
  }

  /**
   * Check if a room is available for a date range
   * @param {number} roomId - Room ID
   * @param {Date} checkIn - Check-in date
   * @param {Date} checkOut - Check-out date
   * @param {number} excludeReservationId - Reservation ID to exclude (for updates)
   * @returns {Promise<boolean>} True if room is available
   */
  async isRoomAvailable(roomId, checkIn, checkOut, excludeReservationId = null) {
    try {
      const whereClause = {
        room_id: roomId,
        status: 'confirmed', // Only check against confirmed reservations
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
      };
      
      // Exclude the current reservation for updates
      if (excludeReservationId) {
        whereClause.id = {
          [Op.ne]: excludeReservationId
        };
      }
      
      const conflictingReservations = await this.model.count({
        where: whereClause
      });
      
      return conflictingReservations === 0;
    } catch (error) {
      console.error('Error in isRoomAvailable:', error);
      throw error;
    }
  }

  /**
   * Create a stay record for a reservation
   * @param {number} reservationId - Reservation ID
   * @param {Date} actualCheckIn - Actual check-in date
   * @returns {Promise<Object>} Created stay
   */
  async createStay(reservationId, actualCheckIn) {
    try {
      return await this.models.Stay.create({
        reservation_id: reservationId,
        actual_check_in: actualCheckIn,
        is_no_show: false
      });
    } catch (error) {
      console.error('Error in createStay:', error);
      throw error;
    }
  }

  /**
   * Update stay with check-out information
   * @param {number} stayId - Stay ID
   * @param {Date} actualCheckOut - Actual check-out date
   * @returns {Promise<Array>} [affectedCount, affectedRows]
   */
  async updateStay(stayId, actualCheckOut) {
    try {
      return await this.models.Stay.update(
        { actual_check_out: actualCheckOut },
        {
          where: { stay_id: stayId }
        }
      );
    } catch (error) {
      console.error('Error in updateStay:', error);
      throw error;
    }
  }
}

module.exports = ReservationRepository;