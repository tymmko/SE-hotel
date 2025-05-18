const BaseRepository = require('./common/baseRepository');
const { Op } = require('sequelize');

/**
 * Repository for managing bill-related data operations
 * Extends BaseRepository to provide bill-specific data access methods
 */
class BillRepository extends BaseRepository {
  /**
   * @param {Object} models - Sequelize models
   */
  constructor(models) {
    super(models.Bill);
    this.models = models;
  }

  /**
   * Find all bills with associated details
   * @param {Object} [options={}] - Additional query options
   * @returns {Promise<Array>} List of bills with related data
   * @throws {Error} If an error occurs during the query
   */
  async findBillsWithDetails(options = {}) {
    try {
      return await this.model.findAll({
        include: [
          {
            model: this.models.Stay,
            include: [
              {
                model: this.models.Reservation,
                include: [
                  {
                    model: this.models.User,
                    attributes: ['id', 'first_name', 'last_name', 'email']
                  },
                  {
                    model: this.models.Room,
                    attributes: ['id', 'type']
                  }
                ]
              }
            ]
          }
        ],
        ...options,
        raw: false
      });
    } catch (error) {
      console.error('Error in findBillsWithDetails:', error);
      throw error;
    }
  }

  /**
   * Find a single bill by ID with associated details
   * @param {number|string} billId - Bill ID
   * @returns {Promise<Object|null>} Bill with related data
   * @throws {Error} If an error occurs during the query
   */
  async findBillWithDetails(billId) {
    try {
      return await this.model.findByPk(billId, {
        include: [
          {
            model: this.models.Stay,
            include: [
              {
                model: this.models.Reservation,
                include: [
                  {
                    model: this.models.User,
                    attributes: ['id', 'first_name', 'last_name', 'email']
                  },
                  {
                    model: this.models.Room,
                    attributes: ['id', 'type']
                  }
                ]
              }
            ]
          }
        ],
        raw: false
      });
    } catch (error) {
      console.error('Error in findBillWithDetails:', error);
      throw error;
    }
  }

  /**
   * Find bills by status
   * @param {string} status - Bill status (e.g., 'paid', 'unpaid')
   * @returns {Promise<Array>} List of bills with the specified status
   * @throws {Error} If an error occurs during the query
   */
  async findBillsByStatus(status) {
    try {
      return await this.findBillsWithDetails({ where: { status } });
    } catch (error) {
      console.error('Error in findBillsByStatus:', error);
      throw error;
    }
  }

  /**
   * Find bills associated with a stay
   * @param {number|string} stayId - Stay ID
   * @returns {Promise<Array>} List of bills for the stay
   * @throws {Error} If an error occurs during the query
   */
  async findBillsByStay(stayId) {
    try {
      return await this.findBillsWithDetails({ where: { '$Stay.stay_id$': stayId } });
    } catch (error) {
      console.error('Error in findBillsByStay:', error);
      throw error;
    }
  }

  /**
   * Find bills associated with a user
   * @param {number|string} userId - User ID
   * @returns {Promise<Array>} List of bills for the user
   * @throws {Error} If an error occurs during the query
   */
  async findBillsByUser(userId) {
    try {
      const reservations = await this.models.Reservation.findAll({
        where: { user_id: userId },
        attributes: ['id'],
        raw: true
      });
      
      const reservationIds = reservations.map(res => res.id);
      
      if (reservationIds.length === 0) {
        return [];
      }
      
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
      
      return await this.findBillsWithDetails({ where: { stay_id: { [Op.in]: stayIds } }});
    } catch (error) {
      console.error('Error in findBillsByUser:', error);
      throw error;
    }
  }

  /**
   * Update the status of a bill
   * @param {number|string} billId - Bill ID
   * @param {string} status - New status
   * @returns {Promise<Array>} [affectedCount, affectedRows]
   * @throws {Error} If an error occurs during the update
   */
  async updateBillStatus(billId, status) {
    try {
      return await this.model.update(
        { status },
        {
          where: { id: billId }
        }
      );
    } catch (error) {
      console.error('Error in updateBillStatus:', error);
      throw error;
    }
  }

  /**
   * Create a payment for a bill
   * @param {number|string} billId - Bill ID
   * @param {Object} paymentData - Payment data
   * @returns {Promise<Object>} Created payment
   * @throws {Error} If an error occurs during creation
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
   * Calculate the total payments for a bill
   * @param {number|string} billId - Bill ID
   * @returns {Promise<number>} Total payment amount
   * @throws {Error} If an error occurs during the query
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