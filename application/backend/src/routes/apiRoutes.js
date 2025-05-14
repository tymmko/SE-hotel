// src/routes/apiRoutes.js
const authMiddleware = require('../middlewares/authMiddleware');
const express = require('express');
const router = express.Router();

// Import models (or rather, ensure models are correctly loaded via ./models/model)
const models = require('../models/model').models; // Use the exported 'models' object

// Import repository classes
const RoomRepository = require('../data/repositories/roomRepository');
const BillRepository = require('../data/repositories/billRepository');
const ReservationRepository = require('../data/repositories/reservationRepository');
// const GuestRepository = require('../data/repositories/guestRepository'); // REMOVED
const EquipmentRepository = require('../data/repositories/equipmentRepository');
const PriceHistoryRepository = require('../data/repositories/priceHistoryRepository');
const UserRepository = require('../data/repositories/userRepository');

// Create repository instances
const roomRepository = new RoomRepository(models);
const billRepository = new BillRepository(models);
const reservationRepository = new ReservationRepository(models);
// const guestRepository = new GuestRepository(models); // REMOVED
const equipmentRepository = new EquipmentRepository(models);
const priceHistoryRepository = new PriceHistoryRepository(models);
const userRepository = new UserRepository(models);

// Import service classes
const RoomService = require('../services/roomService');
const BillService = require('../services/billService');
const ReservationService = require('../services/reservationService');
// const GuestService = require('../services/guestService'); // REMOVED
const EquipmentService = require('../services/equipmentService');
const PriceHistoryService = require('../services/priceHistoryService');
const UserService = require('../services/userService');

// Create service instances
const roomService = new RoomService(roomRepository); // RoomService might need PriceHistoryRepository if it creates price history

// Inject all necessary repositories into BillService
const billService = new BillService(billRepository, models.Stay, models.Reservation, models.Room, models.PriceHistory); // Direct model injection is not ideal, better via repositories if possible. Or adjust BillService constructor

// Inject UserRepository into ReservationService
const reservationService = new ReservationService(reservationRepository, roomRepository, userRepository); 
// const guestService = new GuestService(guestRepository); // REMOVED
const equipmentService = new EquipmentService(equipmentRepository, roomRepository);
const priceHistoryService = new PriceHistoryService(priceHistoryRepository, roomRepository);
const userService = new UserService(userRepository);

// Import controller classes
const RoomController = require('../controllers/room.controller');
const BillController = require('../controllers/bill.controller');
const ReservationController = require('../controllers/reservation.controller');
// const GuestController = require('../controllers/guest.controller'); // REMOVED
const EquipmentControllerFactory = require('../controllers/equipment.controller'); // Assuming it's a factory
const PriceHistoryControllerFactory = require('../controllers/priceHistory.controller'); // Assuming it's a factory
const UserController = require('../controllers/user.controller');

// Create controller instances
const roomController = new RoomController(roomService);
const billController = new BillController(billService);
const reservationController = new ReservationController(reservationService);
// const guestController = new GuestController(guestService); // REMOVED
const equipmentController = EquipmentControllerFactory(equipmentService);
const priceHistoryController = PriceHistoryControllerFactory(priceHistoryService);
const userController = new UserController(userService);

// User routes
router.post('/users/register', userController.register.bind(userController)); // For regular users and admin-created users
router.post('/users/login', userController.login.bind(userController));
router.post('/users/guest', userController.createUserAsGuest.bind(userController)); // Specific endpoint for guest creation by front-end/system
router.get('/users', authMiddleware, userController.getAllUsers.bind(userController)); // Protect fetching all users
router.get('/users/:id', authMiddleware, userController.getUser.bind(userController)); // Protect fetching a specific user
router.put('/users/:id', authMiddleware, userController.updateUser.bind(userController)); // Protect updating a user

// Room routes
router.get('/rooms/available', roomController.getAvailableRooms.bind(roomController));
router.route('/rooms/:id/status').put(authMiddleware, roomController.updateRoomStatus.bind(roomController)); // Added auth
router.route('/rooms/:id/price-history')
    .get(roomController.getPriceHistoryByRoom.bind(roomController))
    .post(authMiddleware, priceHistoryController.addPriceHistory.bind(priceHistoryController)); // Added auth
router.route('/rooms/:id/equipment').get(roomController.getEquipmentByRoom.bind(roomController));
router.route('/rooms/:id/occupancy').get(roomController.getCurrentOccupancy.bind(roomController));
router.route('/rooms')
    .get(roomController.getAllRooms.bind(roomController))
    .post(authMiddleware, roomController.createRoom.bind(roomController));
router.route('/rooms/:id')
    .get(roomController.getRoom.bind(roomController))
    .put(authMiddleware, roomController.updateRoom.bind(roomController)) // Added auth
    .delete(authMiddleware, roomController.deleteRoom.bind(roomController)); // Added auth

// Equipment routes (consider auth for modification endpoints)
router.route('/rooms/:roomId/equipment')
    .get(equipmentController.getAllByRoom)
    .post(authMiddleware, equipmentController.addEquipment) // Added auth
    .delete(authMiddleware, equipmentController.deleteAllByRoom); // Added auth
router.route('/equipment').get(equipmentController.getAllEquipments);
router.route('/equipment/:equipmentId')
    .patch(authMiddleware, equipmentController.updateEquipment) // Added auth
    .delete(authMiddleware, equipmentController.deleteEquipment); // Added auth (full delete)
    // Consider if unlink should be DELETE or PATCH and its auth

// Bill routes (consider auth)
router.route('/bills')
    .get(authMiddleware, billController.getAllBills.bind(billController)) // Added auth
    .post(authMiddleware, billController.createBill.bind(billController)); // Added auth
router.route('/bills/:id')
    .get(authMiddleware, billController.getBill.bind(billController)); // Added auth
router.route('/bills/:id/status')
    .put(authMiddleware, billController.updateBillStatus.bind(billController)); // Added auth
router.route('/bills/:id/payment') // Added payment route
    .post(authMiddleware, billController.processPayment.bind(billController)); // Added auth
router.get('/bills/check-overdue', authMiddleware, billController.checkOverdueBills.bind(billController)); // Added auth


// Reservation routes (consider auth for modification endpoints)
router.route('/reservations')
    .get(authMiddleware, reservationController.getAllReservations.bind(reservationController)) // Added auth
    .post(reservationController.createReservation.bind(reservationController)); // Public or auth based on your flow
router.route('/reservations/:id')
    .get(authMiddleware, reservationController.getReservation.bind(reservationController)) // Added auth
    .put(authMiddleware, reservationController.updateReservation.bind(reservationController)); // Added auth
router.route('/reservations/:id/status')
    .put(authMiddleware, reservationController.updateReservationStatus.bind(reservationController)); // Added auth

// REMOVED Guest routes
// router.route('/guests')
//   .get(guestController.getAllGuests.bind(guestController))
//   .post(guestController.createGuest.bind(guestController));
// router.route('/guests/:id')
//   .get(guestController.getGuest.bind(guestController))
//   .put(guestController.updateGuest.bind(guestController));

module.exports = router;