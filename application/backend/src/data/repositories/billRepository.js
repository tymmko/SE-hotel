// src/data/repositories/billRepository.js
const { Op } = require('sequelize');
const BaseRepository = require('./common/baseRepository');

class BillRepository extends BaseRepository {
  constructor(models) {
    super(models.Bill);
    this.models = models;
  }

  async findBillsWithDetails(options = {}) {
    try {
      return await this.model.findAll({
        include: [ // It's good practice to specify includes if you need related data
          {
            model: this.models.Stay,
            include: [
              {
                model: this.models.Reservation,
                include: [
                  {
                    model: this.models.User, // For user details
                    attributes: ['id', 'first_name', 'last_name', 'email']
                  },
                  {
                    model: this.models.Room, // For room details
                    attributes: ['id', 'type']
                  }
                ]
              }
            ]
          }
        ],
        ...options,
        raw: false // Set to false if using includes to get nested objects
      });
    } catch (error) {
      console.error('Error in findBillsWithDetails:', error);
      throw error;
    }
  }

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

  async findBillsByStatus(status) {
    try {
      return await this.findBillsWithDetails({ where: { status } });
    } catch (error) {
      console.error('Error in findBillsByStatus:', error);
      throw error;
    }
  }

  async findBillsByStay(stayId) {
    try {
      return await this.findBillsWithDetails({ where: { '$Stay.stay_id$': stayId } }); // Adjusted for include
    } catch (error) {
      console.error('Error in findBillsByStay:', error);
      throw error;
    }
  }

  async findBillsByUser(userId) { // Changed from findBillsByGuest and guestId
    try {
      const reservations = await this.models.Reservation.findAll({
        where: { user_id: userId }, // Changed from guest_id
        attributes: ['id'],
        raw: true
      });
      
      const reservationIds = reservations.map(res => res.id); // Assuming reservation id is 'id'
      
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

  async createPayment(billId, paymentData) {
    try {
      // Assuming Payment model is associated with Bill and has bill_id
      // Or if Payment model's primary key is the billId as in your previous code structure.
      // This might need adjustment based on your Payment model definition.
      return await this.models.Payment.create({
        bill_id: billId, // Ensure your Payment model has a bill_id foreign key
        ...paymentData
      });
    } catch (error) {
      console.error('Error in createPayment:', error);
      throw error;
    }
  }

  async getTotalPaymentsForBill(billId) {
    try {
      const result = await this.models.Payment.sum('amount', {
        where: { bill_id: billId } // Ensure your Payment model has a bill_id foreign key
      });
      return result || 0;
    } catch (error) {
      console.error('Error in getTotalPaymentsForBill:', error);
      throw error;
    }
  }
}

module.exports = BillRepository;