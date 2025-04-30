// src/routes/apiRoutes.js
const express = require('express');
const router = express.Router();

// Import original controllers (except Room)

// Import the new room controller
const RoomController = require('../controllers/room.controller');

// Create instances of dependencies needed for the new controller
const RoomRepository = require('../data/repositories/roomRepository');
const RoomService = require('../services/roomService');

// Get models from existing configuration
const { Room, Equipment, PriceHistory, Reservation } = require('../models/model');

// Create instances for the new RoomController
const models = { Room, Equipment, PriceHistory, Reservation };
const roomRepository = new RoomRepository(models);
const roomService = new RoomService(roomRepository);
const roomController = new RoomController(roomService);

// Room routes (using the new controller)
router.route('/rooms')
  .get(roomController.getAllRooms.bind(roomController))
  .post(roomController.createRoom.bind(roomController));

router.route('/rooms/:id')
  .get(roomController.getRoom.bind(roomController))
  .put(roomController.updateRoom.bind(roomController))
  .delete(roomController.deleteRoom.bind(roomController));

router.get('/rooms/available', roomController.getAvailableRooms.bind(roomController));

router.put('/rooms/:id/status', roomController.updateRoomStatus.bind(roomController));

// Routes for other controllers (keeping original implementation)
// Guests

// ... Keep remaining original routes ...

module.exports = router;