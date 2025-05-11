const express = require('express');
const router = express.Router();

// Import models
const models = require('../models/model');

// Import repository classes
const RoomRepository = require('../data/repositories/roomRepository');
const BillRepository = require('../data/repositories/billRepository');
const ReservationRepository = require('../data/repositories/reservationRepository');
const GuestRepository = require('../data/repositories/guestRepository');
const UserRepository = require('../data/repositories/userRepository');
const EquipmentRepository = require('../data/repositories/equipmentRepository');
const PriceHistoryRepository = require('../data/repositories/priceHistoryRepository');

// Create repository instances
const roomRepository = new RoomRepository(models);
const billRepository = new BillRepository(models);
const reservationRepository = new ReservationRepository(models);
const guestRepository = new GuestRepository(models);
const userRepository = new UserRepository(models);
const equipmentRepository = new EquipmentRepository(models);
const priceHistoryRepository = new PriceHistoryRepository(models);

// Import service classes
const RoomService = require('../services/roomService');
const BillService = require('../services/billService');
const ReservationService = require('../services/reservationService');
const GuestService = require('../services/guestService');
const UserService = require('../services/userService');
const EquipmentService = require('../services/equipmentService');
const PriceHistoryService = require('../services/priceHistoryService');

// Create service instances
const roomService = new RoomService(roomRepository);
const billService = new BillService(billRepository);
const reservationService = new ReservationService(reservationRepository, roomRepository);
const guestService = new GuestService(guestRepository);
const userService = new UserService(userRepository);
const equipmentService = new EquipmentService(equipmentRepository, roomRepository);
const priceHistoryService = new PriceHistoryService(priceHistoryRepository, roomRepository);

// Import controller classes
const RoomController = require('../controllers/room.controller');
const BillController = require('../controllers/bill.controller');
const ReservationController = require('../controllers/reservation.controller');
const GuestController = require('../controllers/guest.controller');
const UserController = require('../controllers/user.controller');
const EquipmentController = require('../controllers/equipment.controller');
const PriceHistoryController = require('../controllers/priceHistory.controller');

// Create controller instances
const roomController = new RoomController(roomService);
const billController = new BillController(billService);
const reservationController = new ReservationController(reservationService);
const guestController = new GuestController(guestService);
const userController = new UserController(userService);
const equipmentController = EquipmentController(equipmentService);
const priceHistoryController = PriceHistoryController(priceHistoryService);

// Room routes
router.get('/rooms/available', roomController.getAvailableRooms.bind(roomController));

router.route('/rooms/:id/status')
  .put(roomController.updateRoomStatus.bind(roomController));

router.route('/rooms/:id/price-history')
  .get(roomController.getPriceHistoryByRoom.bind(roomController));

router.route('/rooms/:id/equipment')
  .get(roomController.getEquipmentByRoom.bind(roomController));

router.route('/rooms/:id/occupancy')
  .get(roomController.getCurrentOccupancy.bind(roomController));

router.route('/rooms')
  .get(roomController.getAllRooms.bind(roomController))
  .post(roomController.createRoom.bind(roomController));

router.route('/rooms/:id')
  .get(roomController.getRoom.bind(roomController))
  .put(roomController.updateRoom.bind(roomController))
  .delete(roomController.deleteRoom.bind(roomController));

// Equipment routes
router.route('/rooms/:roomId/equipment')
  .get(equipmentController.getAllByRoom)
  .post(equipmentController.addEquipment)
  .delete(equipmentController.deleteAllByRoom);

router.route('/equipment/:equipmentId')
  .patch(equipmentController.updateEquipment)
  .delete(equipmentController.deleteEquipment);

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


// User routes
router.post('/register', userController.register.bind(userController));
router.post('/login', userController.login.bind(userController));

module.exports = router;

router.post(
  '/rooms/:roomId/price-history',
  priceHistoryController.addPriceHistory
);

module.exports = router;
