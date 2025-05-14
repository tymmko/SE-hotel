// src/routes/apiRoutes.js
const authMiddleware = require('../middlewares/authMiddleware');

const express = require('express');
const router = express.Router();

// Import models
const models = require('../models/model');

// Import repository classes
const RoomRepository = require('../data/repositories/roomRepository');
const BillRepository = require('../data/repositories/billRepository');
const ReservationRepository = require('../data/repositories/reservationRepository');
const GuestRepository = require('../data/repositories/guestRepository');
const EquipmentRepository = require('../data/repositories/equipmentRepository');
const PriceHistoryRepository = require('../data/repositories/priceHistoryRepository');
const UserRepository = require('../data/repositories/userRepository')

// Create repository instances
const roomRepository = new RoomRepository(models);
const billRepository = new BillRepository(models);
const reservationRepository = new ReservationRepository(models);
const guestRepository = new GuestRepository(models);
const equipmentRepository = new EquipmentRepository(models);
const priceHistoryRepository = new PriceHistoryRepository(models);
const userRepository = new UserRepository(models);

// Import service classes
const RoomService = require('../services/roomService');
const BillService = require('../services/billService');
const ReservationService = require('../services/reservationService');
const GuestService = require('../services/guestService');
const EquipmentService = require('../services/equipmentService');
const PriceHistoryService = require('../services/priceHistoryService');
const UserService = require('../services/userService');

// Create service instances
const roomService = new RoomService(roomRepository);
const billService = new BillService(billRepository);
const reservationService = new ReservationService(reservationRepository, roomRepository);
const guestService = new GuestService(guestRepository);
const equipmentService = new EquipmentService(equipmentRepository, roomRepository);
const priceHistoryService = new PriceHistoryService(priceHistoryRepository, roomRepository);
const userService = new UserService(userRepository);

// Import controller classes
const RoomController = require('../controllers/room.controller');
const BillController = require('../controllers/bill.controller');
const ReservationController = require('../controllers/reservation.controller');
const GuestController = require('../controllers/guest.controller');
const EquipmentController = require('../controllers/equipment.controller');
const PriceHistoryController = require('../controllers/priceHistory.controller');
const UserController = require('../controllers/user.controller');

// Create controller instances
const roomController = new RoomController(roomService);
const billController = new BillController(billService);
const reservationController = new ReservationController(reservationService);
const guestController = new GuestController(guestService);
const equipmentController = EquipmentController(equipmentService);
const priceHistoryController = PriceHistoryController(priceHistoryService);
const userController = new UserController(userService);

// Room routes
// Specific routes first to avoid routing conflicts
router.get('/rooms/available', roomController.getAvailableRooms.bind(roomController));

router.route('/rooms/:id/status')
	.put(roomController.updateRoomStatus.bind(roomController));

router.route('/rooms/:id/price-history')
	.get(roomController.getPriceHistoryByRoom.bind(roomController))
	.post(priceHistoryController.addPriceHistory.bind(priceHistoryController));

router.route('/rooms/:id/equipment')
	.get(roomController.getEquipmentByRoom.bind(roomController));

router.route('/rooms/:id/occupancy')
	.get(roomController.getCurrentOccupancy.bind(roomController));

router.route('/rooms')
	.get(roomController.getAllRooms.bind(roomController))
	.post(authMiddleware, roomController.createRoom.bind(roomController));

router.route('/rooms/:id')
	.get(roomController.getRoom.bind(roomController))
	.put(roomController.updateRoom.bind(roomController))
	.delete(roomController.deleteRoom.bind(roomController));

// Equipment routes
router.route('/rooms/:roomId/equipment')
	.get(equipmentController.getAllByRoom)
	.post(equipmentController.addEquipment)
	.delete(equipmentController.deleteAllByRoom);

router.route('/equipment')
	.get(equipmentController.getAllEquipments);

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
