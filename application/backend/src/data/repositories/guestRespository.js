// src/data/repositories/guestRepository.js
const { Op } = require('sequelize');
const BaseRepository = require('./common/baseRepository');

/**
 * Repository for Guest-related data operations
 * Extends BaseRepository with guest-specific data access methods
 */
class GuestRepository extends BaseRepository {
  /**
   * @param {Object} models - Sequelize models
   */
  constructor(models) {
    super(models.Guest);
    this.models = models; // Store all models for relationships
  }

  /**
   * Find guests with basic details
   * @param {Object} options - Additional query options
   * @returns {Promise<Array>} List of guests with related data
   */
  async findGuestsWithDetails(options = {}) {
    try {
      return await this.model.findAll({
        ...options,
        raw: true // Get plain JSON objects instead of Sequelize instances
      });
    } catch (error) {
      console.error('Error in findGuestsWithDetails:', error);
      throw error; // Rethrow to let the service handle it
    }
  }

  /**
   * Find a single guest with details
   * @param {number} guestId - Guest ID
   * @returns {Promise<Object>} Guest with related data
   */
  async findGuestWithDetails(guestId) {
    try {
      return await this.model.findByPk(guestId, {
        raw: true // Get plain JSON object instead of Sequelize instance
      });
    } catch (error) {
      console.error('Error in findGuestWithDetails:', error);
      throw error; // Rethrow to let the service handle it
    }
  }

  /**
   * Find guests with their reservation history
   * @param {number} guestId - Guest ID
   * @returns {Promise<Object>} Guest with reservation history
   */
  async findGuestWithReservations(guestId) {
    try {
      return await this.model.findByPk(guestId, {
        include: [{
          model: this.models.Reservation,
          attributes: ['reservation_id', 'check_in_date', 'check_out_date', 'status', 'total_price']
        }],
        raw: false // Need Sequelize instance to handle includes properly
      });
    } catch (error) {
      console.error('Error in findGuestWithReservations:', error);
      throw error;
    }
  }

  /**
   * Find guests by status (Active, Inactive)
   * @param {string} status - Guest status
   * @returns {Promise<Array>} List of guests with specified status
   */
  async findGuestsByStatus(status) {
    try {
      return await this.model.findAll({
        where: { status },
        raw: true
      });
    } catch (error) {
      console.error('Error in findGuestsByStatus:', error);
      throw error;
    }
  }

  /**
   * Update guest status
   * @param {number} guestId - Guest ID
   * @param {string} status - New status (Active, Inactive)
   * @returns {Promise<Array>} [affectedCount, affectedRows]
   */
  async updateGuestStatus(guestId, status) {
    try {
      return await this.model.update(
        { status },
        {
          where: { guest_id: guestId }
        }
      );
    } catch (error) {
      console.error('Error in updateGuestStatus:', error);
      throw error;
    }
  }

  /**
   * Check if guest has active reservations
   * @param {number} guestId - Guest ID
   * @returns {Promise<boolean>} True if guest has active reservations
   */
  async hasActiveReservations(guestId) {
    try {
      const count = await this.models.Reservation.count({
        where: {
          guest_id: guestId,
          status: {
            [Op.notIn]: ['Cancelled', 'Completed']
          }
        }
      });

      return count > 0;
    } catch (error) {
      console.error('Error in hasActiveReservations:', error);
      throw error;
    }
  }
}

module.exports = GuestRepository;