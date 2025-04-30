// src/routes/apiRoutes.js
const express = require('express');
const router = express.Router();

// Import models
const models = require('../models/model');

// Import repository class
const RoomRepository = require('../data/repositories/roomRepository');

// Create repository instance
const roomRepository = new RoomRepository(models);

// Import service class
const RoomService = require('../services/roomService');

// Create service instance
const roomService = new RoomService(roomRepository);

// Import controller class
const RoomController = require('../controllers/room.controller');

// Create controller instance
const roomController = new RoomController(roomService);

// Room routes
// Specific routes first to avoid routing conflicts
router.get('/rooms/available', roomController.getAvailableRooms.bind(roomController));

router.route('/rooms/:id/status')
  .put(roomController.updateRoomStatus.bind(roomController));

router.route('/rooms/:id/price-history')
  .get(roomController.getPriceHistoryByRoom.bind(roomController));

router.route('/rooms/:id/equipment')
  .get(roomController.getEquipmentByRoom.bind(roomController));

router.route('/rooms')
  .get(roomController.getAllRooms.bind(roomController))
  .post(roomController.createRoom.bind(roomController));

router.route('/rooms/:id')
  .get(roomController.getRoom.bind(roomController))
  .put(roomController.updateRoom.bind(roomController))
  .delete(roomController.deleteRoom.bind(roomController));

module.exports = router;