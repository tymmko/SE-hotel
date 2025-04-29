// src/controllers/room.controller.js
const { Room } = require('../models/model');

// Get all rooms
exports.getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.findAll();
    
    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms
    });
  } catch (error) {
    next(error);
  }
};

// Get single room
exports.getRoom = async (req, res, next) => {
  try {
    const room = await Room.findByPk(req.params.id);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: room
    });
  } catch (error) {
    next(error);
  }
};

// Create new room
exports.createRoom = async (req, res, next) => {
  try {
    const room = await Room.create(req.body);
    
    res.status(201).json({
      success: true,
      data: room
    });
  } catch (error) {
    next(error);
  }
};

// Update room
exports.updateRoom = async (req, res, next) => {
  try {
    const [updated] = await Room.update(req.body, {
      where: { room_id: req.params.id }
    });
    
    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }
    
    const room = await Room.findByPk(req.params.id);
    
    res.status(200).json({
      success: true,
      data: room
    });
  } catch (error) {
    next(error);
  }
};

// Delete room
exports.deleteRoom = async (req, res, next) => {
  try {
    const deleted = await Room.destroy({
      where: { room_id: req.params.id }
    });
    
    if (deleted === 0) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
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