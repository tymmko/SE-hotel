// src/controllers/bill.controller.js

// Fixed imports to include all necessary models
const { Bill, Reservation, Stay, Room, ServiceOrder } = require('../models/model');
const { Op } = require('sequelize');

// Get all bills
exports.getAllBills = async (req, res, next) => {
  try {
    const bills = await Bill.findAll();
    
    res.status(200).json({
      success: true,
      count: bills.length,
      data: bills
    });
  } catch (error) {
    next(error);
  }
};

// Get single bill
exports.getBill = async (req, res, next) => {
  try {
    const bill = await Bill.findByPk(req.params.id);
    
    if (!bill) {
      return res.status(404).json({
        success: false,
        message: 'Bill not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: bill
    });
  } catch (error) {
    next(error);
  }
};

// Calculate bill total amount
async function calculateBillTotal(stay_id) {
    try {
      // First get just the stay
      const stay = await Stay.findByPk(stay_id);
      
      if (!stay) {
        throw new Error('Stay not found');
      }
      
      // Get the reservation separately
      const reservation = await Reservation.findByPk(stay.reservation_id);
      if (!reservation) {
        throw new Error('Reservation not found for this stay');
      }
      
      // Get the room separately
      const room = await Room.findByPk(reservation.room_id);
      if (!room) {
        throw new Error('Room not found for this reservation');
      }
      
      // Calculate number of nights
      const checkIn = new Date(stay.check_in_date);
      const checkOut = new Date(stay.check_out_date);
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      
      // Calculate room cost
      const roomCost = nights * room.price_per_night;
      
      // Get all service orders for this stay
      const serviceOrders = await ServiceOrder.findAll({
        where: { stay_id: stay_id }
      });
      
      // Calculate service orders total
      const serviceOrdersTotal = serviceOrders.reduce((total, order) => 
        total + parseFloat(order.price), 0);
      
      // Return the total bill amount
      return roomCost + serviceOrdersTotal;
    } catch (error) {
      console.error('Error calculating bill total:', error);
      throw error;
    }
}

// Create new bill
exports.createBill = async (req, res, next) => {
  try {
    const { stay_id, status } = req.body;
    
    // Check if stay exists
    const stay = await Stay.findByPk(stay_id);
    if (!stay) {
      return res.status(404).json({
        success: false,
        message: 'Stay not found'
      });
    }
    
    // Check if a bill already exists for this stay
    const existingBill = await Bill.findOne({ where: { stay_id } });
    if (existingBill) {
      return res.status(400).json({
        success: false,
        message: 'A bill already exists for this stay'
      });
    }
    
    // Calculate the total amount
    const total_amount = await calculateBillTotal(stay_id);
    
    // Create the bill with calculated total
    const bill = await Bill.create({
      stay_id,
      status: status || 'Pending',
      total_amount
    });
    
    res.status(201).json({
      success: true,
      data: bill
    });
  } catch (error) {
    next(error);
  }
};

// Update bill
exports.updateBill = async (req, res, next) => {
  try {
    const { status, stay_id } = req.body;
    
    // Get the existing bill
    const bill = await Bill.findByPk(req.params.id);
    if (!bill) {
      return res.status(404).json({
        success: false,
        message: 'Bill not found'
      });
    }
    
    // If changing stay_id, verify the new stay exists
    if (stay_id && stay_id !== bill.stay_id) {
      const stay = await Stay.findByPk(stay_id);
      if (!stay) {
        return res.status(404).json({
          success: false,
          message: 'Stay not found'
        });
      }
      
      // Recalculate total amount for the new stay
      const total_amount = await calculateBillTotal(stay_id);
      
      // Update the bill
      await bill.update({
        stay_id,
        status: status || bill.status,
        total_amount
      });
    } else if (stay_id) {
      // If stay_id is the same but explicitly provided, recalculate in case service orders changed
      const total_amount = await calculateBillTotal(bill.stay_id);
      
      // Update the bill
      await bill.update({
        status: status || bill.status,
        total_amount
      });
    } else {
      // If only updating status, no need to recalculate
      await bill.update({
        status: status || bill.status
      });
    }
    
    // Get the updated bill
    const updatedBill = await Bill.findByPk(req.params.id);
    
    res.status(200).json({
      success: true,
      data: updatedBill
    });
  } catch (error) {
    next(error);
  }
};

// Delete bill
exports.deleteBill = async (req, res, next) => {
  try {
    const deleted = await Bill.destroy({
      where: { bill_id: req.params.id }
    });
    
    if (deleted === 0) {
      return res.status(404).json({
        success: false,
        message: 'Bill not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// Recalculate bill
exports.recalculateBill = async (req, res, next) => {
  try {
    // Get the bill
    const bill = await Bill.findByPk(req.params.id);
    if (!bill) {
      return res.status(404).json({
        success: false,
        message: 'Bill not found'
      });
    }
    
    // Recalculate the total
    const total_amount = await calculateBillTotal(bill.stay_id);
    
    // Update the bill
    await bill.update({ total_amount });
    
    // Get the updated bill
    const updatedBill = await Bill.findByPk(req.params.id);
    
    res.status(200).json({
      success: true,
      data: updatedBill
    });
  } catch (error) {
    next(error);
  }
};

// Get bills by stay ID
exports.getBillsByStay = async (req, res, next) => {
  try {
    const bills = await Bill.findAll({
      where: { stay_id: req.params.stay_id }
    });
    
    res.status(200).json({
      success: true,
      count: bills.length,
      data: bills
    });
  } catch (error) {
    next(error);
  }
};

// Get detailed bill with service orders
exports.getDetailedBill = async (req, res, next) => {
  try {
    // Get the bill with stay association
    const bill = await Bill.findByPk(req.params.id, {
      include: [{
        model: Stay,
        include: [{
          model: Reservation,
          include: [Room]
        }]
      }]
    });
    
    if (!bill) {
      return res.status(404).json({
        success: false,
        message: 'Bill not found'
      });
    }
    
    // Get service orders for this stay
    const serviceOrders = await ServiceOrder.findAll({
      where: { stay_id: bill.stay_id }
    });
    
    // Calculate number of nights
    const checkIn = new Date(bill.Stay.check_in_date);
    const checkOut = new Date(bill.Stay.check_out_date);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    // Calculate room cost
    const roomCost = nights * bill.Stay.Reservation.Room.price_per_night;
    
    // Calculate service orders total
    const serviceOrdersTotal = serviceOrders.reduce((total, order) => 
      total + parseFloat(order.price), 0);
    
    res.status(200).json({
      success: true,
      data: {
        bill_id: bill.bill_id,
        stay_id: bill.stay_id,
        status: bill.status,
        total_amount: bill.total_amount,
        check_in_date: bill.Stay.check_in_date,
        check_out_date: bill.Stay.check_out_date,
        nights: nights,
        room_type: bill.Stay.Reservation.Room.room_type,
        room_cost: roomCost,
        service_orders: serviceOrders,
        service_orders_total: serviceOrdersTotal,
        grand_total: roomCost + serviceOrdersTotal
      }
    });
  } catch (error) {
    next(error);
  }
};

// Make sure to match method names with your routes
exports.getAllBills = exports.getAllBills;
exports.getBill = exports.getBill;
exports.createBill = exports.createBill;
exports.updateBill = exports.updateBill;
exports.deleteBill = exports.deleteBill;
exports.getBillsByStay = exports.getBillsByStay;
exports.getDetailedBill = exports.getDetailedBill;
exports.recalculateBill = exports.recalculateBill;
