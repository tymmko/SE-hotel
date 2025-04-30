// src/routes/apiRoutes.js
const express = require('express');
const router = express.Router();

// Import models
const models = require('../models/model');

// Import repository classes
const RoomRepository = require('../data/repositories/roomRepository');
const BillRepository = require('../data/repositories/billRepository');
const ReservationRepository = require('../data/repositories/reservationRepository');
const GuestRepository = require('../data/repositories/guestRepository');

// Create repository instances
const roomRepository = new RoomRepository(models);
const billRepository = new BillRepository(models);
const reservationRepository = new ReservationRepository(models);
const guestRepository = new GuestRepository(models);

// Import service classes
const RoomService = require('../services/roomService');
const BillService = require('../services/billService');
const ReservationService = require('../services/reservationService');
const GuestService = require('../services/guestService');

// Create service instances
const roomService = new RoomService(roomRepository);
const billService = new BillService(billRepository);
const reservationService = new ReservationService(reservationRepository, roomRepository);
const guestService = new GuestService(guestRepository);

// Import controller classes
const RoomController = require('../controllers/room.controller');
const BillController = require('../controllers/bill.controller');
const ReservationController = require('../controllers/reservation.controller');
const GuestController = require('../controllers/guest.controller');

// Create controller instances
const roomController = new RoomController(roomService);
const billController = new BillController(billService);
const reservationController = new ReservationController(reservationService);
const guestController = new GuestController(guestService);

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

// Bill routes
router.route('/bills')
  .get(billController.getAllBills.bind(billController))
  .post(billController.createBill.bind(billController));

router.route('/bills/:id')
  .get(billController.getBill.bind(billController));

router.route('/bills/:id/status')
  .put(billController.updateBillStatus.bind(billController));

// Reservation routes
router.route('/reservations')
  .get(reservationController.getAllReservations.bind(reservationController))
  .post(reservationController.createReservation.bind(reservationController));

router.route('/reservations/:id')
  .get(reservationController.getReservation.bind(reservationController))
  .put(reservationController.updateReservation.bind(reservationController));

router.route('/reservations/:id/status')
  .put(reservationController.updateReservationStatus.bind(reservationController));

// Guest routes
router.route('/guests')
  .get(guestController.getAllGuests.bind(guestController))
  .post(guestController.createGuest.bind(guestController));

router.route('/guests/:id')
  .get(guestController.getGuest.bind(guestController))
  .put(guestController.updateGuest.bind(guestController));

module.exports = router;