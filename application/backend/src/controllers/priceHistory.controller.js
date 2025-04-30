// src/controllers/priceHistory.controller.js
const { PriceHistory, Room } = require('../models/model');
const { Op } = require('sequelize');

// Get all price histories
exports.getAllPriceHistories = async (req, res, next) => {
  try {
    const priceHistories = await PriceHistory.findAll();
    
    res.status(200).json({
      success: true,
      count: priceHistories.length,
      data: priceHistories
    });
  } catch (error) {
    next(error);
  }
};

// Get single price history
exports.getPriceHistory = async (req, res, next) => {
  try {
    const priceHistory = await PriceHistory.findByPk(req.params.id);
    
    if (!priceHistory) {
      return res.status(404).json({
        success: false,
        message: 'Price history not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: priceHistory
    });
  } catch (error) {
    next(error);
  }
};

// Get price history by room ID
exports.getPriceHistoryByRoomId = async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    
    // Check if room exists
    const room = await Room.findByPk(roomId);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }
    
    const priceHistories = await PriceHistory.findAll({
      where: { room_id: roomId },
      order: [['start_date', 'DESC']]
    });
    
    if (priceHistories.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No price history found for this room'
      });
    }
    
    res.status(200).json({
      success: true,
      count: priceHistories.length,
      data: priceHistories
    });
  } catch (error) {
    next(error);
  }
};

// Create new price history
exports.createPriceHistory = async (req, res, next) => {
  try {
    const { start_date, end_date, price, room_id } = req.body;
    
    // Check if room exists
    const room = await Room.findByPk(room_id);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }
    
    // Validate dates
    if (new Date(start_date) >= new Date(end_date)) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date'
      });
    }
    
    // Check for overlapping price histories
    const overlappingHistories = await PriceHistory.findAll({
      where: { room_id },
      // Find records that overlap with the new date range
      // Using raw query condition since Sequelize doesn't have built-in overlap check
    });
    
    // Manual check for overlaps
    const hasOverlap = overlappingHistories.some(history => {
      const historyStart = new Date(history.start_date);
      const historyEnd = new Date(history.end_date);
      const newStart = new Date(start_date);
      const newEnd = new Date(end_date);
      
      // Check if date ranges overlap
      return (newStart <= historyEnd && newEnd >= historyStart);
    });
    
    if (hasOverlap) {
      return res.status(400).json({
        success: false,
        message: 'The new price history overlaps with an existing one'
      });
    }
    
    const priceHistory = await PriceHistory.create({
      start_date,
      end_date,
      price,
      room_id
    });
    
    res.status(201).json({
      success: true,
      data: priceHistory
    });
  } catch (error) {
    next(error);
  }
};

// Update price history
exports.updatePriceHistory = async (req, res, next) => {
  try {
    const { start_date, end_date, price, room_id } = req.body;
    
    // Get existing price history
    const priceHistory = await PriceHistory.findByPk(req.params.id);
    if (!priceHistory) {
      return res.status(404).json({
        success: false,
        message: 'Price history not found'
      });
    }
    
    // If room_id is being changed, check if the new room exists
    if (room_id && room_id !== priceHistory.room_id) {
      const room = await Room.findByPk(room_id);
      if (!room) {
        return res.status(404).json({
          success: false,
          message: 'Room not found'
        });
      }
    }
    
    // Validate dates if they're being updated
    if (start_date && end_date && new Date(start_date) >= new Date(end_date)) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date'
      });
    }
    
    // Check for overlapping price histories (excluding this one)
    if (start_date || end_date || room_id) {
      const targetRoomId = room_id || priceHistory.room_id;
      const targetStartDate = start_date || priceHistory.start_date;
      const targetEndDate = end_date || priceHistory.end_date;
      
      const overlappingHistories = await PriceHistory.findAll({
        where: { 
          room_id: targetRoomId,
          price_history_id: { [Op.ne]: priceHistory.price_history_id } // Exclude current record
        },
      });
      
      // Manual check for overlaps
      const hasOverlap = overlappingHistories.some(history => {
        const historyStart = new Date(history.start_date);
        const historyEnd = new Date(history.end_date);
        const newStart = new Date(targetStartDate);
        const newEnd = new Date(targetEndDate);
        
        // Check if date ranges overlap
        return (newStart <= historyEnd && newEnd >= historyStart);
      });
      
      if (hasOverlap) {
        return res.status(400).json({
          success: false,
          message: 'The updated price history would overlap with an existing one'
        });
      }
    }
    
    // Update the price history
    await priceHistory.update({
      start_date: start_date || priceHistory.start_date,
      end_date: end_date || priceHistory.end_date,
      price: price || priceHistory.price,
      room_id: room_id || priceHistory.room_id
    });
    
    // Get the updated price history
    const updatedPriceHistory = await PriceHistory.findByPk(req.params.id);
    
    res.status(200).json({
      success: true,
      data: updatedPriceHistory
    });
  } catch (error) {
    next(error);
  }
};

// Delete price history
exports.deletePriceHistory = async (req, res, next) => {
  try {
    const deleted = await PriceHistory.destroy({
      where: { price_history_id: req.params.id }
    });
    
    if (deleted === 0) {
      return res.status(404).json({
        success: false,
        message: 'Price history not found'
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

module.exports = exports;