// src/data/repositories/billRepository.js
const { Op } = require('sequelize');
const BaseRepository = require('./common/baseRepository');

/**
 * Repository for Bill-related data operations
 * Extends BaseRepository with bill-specific data access methods
 */
class BillRepository extends BaseRepository {
  /**
   * @param {Object} models - Sequelize models
   */
  constructor(models) {
    super(models.Bill);
    this.models = models; // Store all models for relationships
  }

  /**
   * Find bills with basic details
   * @param {Object} options - Additional query options
   * @returns {Promise<Array>} List of bills with related data
   */
  async findBillsWithDetails(options = {}) {
    try {
      // Start with a simpler query without complex includes
      return await this.model.findAll({
        ...options,
        raw: true // Get plain JSON objects instead of Sequelize instances
      });
    } catch (error) {
      console.error('Error in findBillsWithDetails:', error);
      throw error; // Rethrow to let the service handle it
    }
  }

  /**
   * Find a single bill with details
   * @param {number} billId - Bill ID
   * @returns {Promise<Object>} Bill with related data
   */
  async findBillWithDetails(billId) {
    try {
      return await this.model.findByPk(billId, {
        raw: true // Get plain JSON object instead of Sequelize instance
      });
    } catch (error) {
      console.error('Error in findBillWithDetails:', error);
      throw error; // Rethrow to let the service handle it
    }
  }

  /**
   * Find bills by status
   * @param {string} status - Bill status
   * @returns {Promise<Array>} List of bills with specified status
   */
  async findBillsByStatus(status) {
    try {
      return await this.model.findAll({
        where: { status },
        raw: true
      });
    } catch (error) {
      console.error('Error in findBillsByStatus:', error);
      throw error;
    }
  }

  /**
   * Find bills for a specific stay
   * @param {number} stayId - Stay ID
   * @returns {Promise<Array>} List of bills for the stay
   */
  async findBillsByStay(stayId) {
    try {
      return await this.model.findAll({
        where: { stay_id: stayId },
        raw: true
      });
    } catch (error) {
      console.error('Error in findBillsByStay:', error);
      throw error;
    }
  }

  /**
   * Find bills for a specific guest through their reservations and stays
   * @param {number} guestId - Guest ID
   * @returns {Promise<Array>} List of bills for the guest
   */
  async findBillsByGuest(guestId) {
    try {
      // Find all reservations for the guest
      const reservations = await this.models.Reservation.findAll({
        where: { guest_id: guestId },
        attributes: ['id'],
        raw: true
      });
      
      const reservationIds = reservations.map(res => res.reservation_id);
      
      if (reservationIds.length === 0) {
        return [];
      }
      
      // Find all stays associated with those reservations
      const stays = await this.models.Stay.findAll({
        where: {
          reservation_id: {
            [Op.in]: reservationIds
          }
        },
        attributes: ['stay_id'],
        raw: true
      });
      
      const stayIds = stays.map(stay => stay.stay_id);
      
      if (stayIds.length === 0) {
        return [];
      }
      
      // Find all bills for those stays
      return await this.model.findAll({
        where: {
          stay_id: {
            [Op.in]: stayIds
          }
        },
        raw: true
      });
    } catch (error) {
      console.error('Error in findBillsByGuest:', error);
      throw error;
    }
  }

  /**
   * Update bill status
   * @param {number} billId - Bill ID
   * @param {string} status - New status
   * @returns {Promise<Array>} [affectedCount, affectedRows]
   */
  async updateBillStatus(billId, status) {
    try {
      return await this.model.update(
        { status },
        {
          where: { bill_id: billId }
        }
      );
    } catch (error) {
      console.error('Error in updateBillStatus:', error);
      throw error;
    }
  }

  /**
   * Create a payment for a bill
   * @param {number} billId - Bill ID
   * @param {Object} paymentData - Payment data
   * @returns {Promise<Object>} Created payment
   */
  async createPayment(billId, paymentData) {
    try {
      return await this.models.Payment.create({
        bill_id: billId,
        ...paymentData
      });
    } catch (error) {
      console.error('Error in createPayment:', error);
      throw error;
    }
  }

  /**
   * Get total payments for a bill
   * @param {number} billId - Bill ID
   * @returns {Promise<number>} Total amount paid
   */
  async getTotalPaymentsForBill(billId) {
    try {
      const result = await this.models.Payment.sum('amount', {
        where: { bill_id: billId }
      });
      
      return result || 0;
    } catch (error) {
      console.error('Error in getTotalPaymentsForBill:', error);
      throw error;
    }
  }
}

module.exports = BillRepository;