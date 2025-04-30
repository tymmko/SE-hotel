// src/data/repositories/guestRepository.js
const { Op } = require('sequelize');
const BaseRepository = require('./common/baseRepository');

/**
 * Repository for Guest-related data operations
 * Simplified to handle basic guest functionality
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
   * Find all guests
   * @returns {Promise<Array>} List of guests
   */
  async findAllGuests() {
    try {
      return await this.model.findAll({
        raw: true // Get plain JSON objects instead of Sequelize instances
      });
    } catch (error) {
      console.error('Error in findAllGuests:', error);
      throw error;
    }
  }

  /**
   * Find a single guest by ID
   * @param {number} guestId - Guest ID
   * @returns {Promise<Object>} Guest data
   */
  async findGuestById(guestId) {
    try {
      return await this.model.findByPk(guestId, {
        raw: true // Get plain JSON object instead of Sequelize instance
      });
    } catch (error) {
      console.error('Error in findGuestById:', error);
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
          status: 'Confirmed'
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