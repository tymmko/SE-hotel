/**
 * Repository for managing reservation-related data operations
 * Extends BaseRepository to provide reservation-specific data access methods
 */
class ReservationRepository extends BaseRepository {
  /**
   * @param {Object} models - Sequelize models
   */
  constructor(models) {
    super(models.Reservation);
    this.models = models;
  }

  /**
   * Find all reservations with associated details
   * @param {Object} [options={}] - Additional query options
   * @returns {Promise<Array>} List of reservations with related data
   * @throws {Error} If an error occurs during the query
   */
  async findReservationsWithDetails(options = {}) {
    try {
      return await this.model.findAll({
        include: [
          {
            model: this.models.User,
            attributes: ['id', 'first_name', 'last_name', 'email']
          },
          {
            model: this.models.Room,
            attributes: ['id', 'type', 'capacity']
          }
        ],
        ...options,
        raw: false
      });
    } catch (error) {
      console.error('Error in findReservationsWithDetails:', error);
      throw error;
    }
  }

  /**
   * Find a single reservation by ID with associated details
   * @param {number} reservationId - Reservation ID
   * @returns {Promise<Object|null>} Reservation with related data
   * @throws {Error} If an error occurs during the query
   */
  async findReservationWithDetails(reservationId) {
    try {
      return await this.model.findByPk(reservationId, {
        raw: false
      });
    } catch (error) {
      console.error('Error in findReservationWithDetails:', error);
      throw error;
    }
  }

  /**
   * Find reservations by status
   * @param {string} status - Reservation status
   * @returns {Promise<Array>} List of reservations with the specified status
   * @throws {Error} If an error occurs during the query
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
   * Find reservations for a specific user
   * @param {number} userId - User ID
   * @returns {Promise<Array>} List of reservations for the user
   * @throws {Error} If an error occurs during the query
   */
  async findReservationsByGuest(userId) {
    try {
      return await this.findReservationsWithDetails({
        where: { user_id: userId }
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
   * @throws {Error} If an error occurs during the query
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
   * Update the status of a reservation
   * @param {number} reservationId - Reservation ID
   * @param {string} status - New status
   * @returns {Promise<Array>} [affectedCount, affectedRows]
   * @throws {Error} If an error occurs during the update
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
   * @param {number} [excludeReservationId] - Reservation ID to exclude (for updates)
   * @returns {Promise<boolean>} True if the room is available
   * @throws {Error} If an error occurs during the query
   */
  async isRoomAvailable(roomId, checkIn, checkOut, excludeReservationId = null) {
    try {
      const whereClause = {
        id: roomId,
        status: 'confirmed',
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
      };
      
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
   * @returns {Promise<Object>} Created stay record
   * @throws {Error} If an error occurs during creation
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
   * Update a stay with check-out information
   * @param {number} stayId - Stay ID
   * @param {Date} actualCheckOut - Actual check-out date
   * @returns {Promise<Array>} [affectedCount, affectedRows]
   * @throws {Error} If an error occurs during the update
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