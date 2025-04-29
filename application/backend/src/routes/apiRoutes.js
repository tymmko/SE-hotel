

const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');
const guestController = require('../controllers/guest.controller');
const roomController = require('../controllers/room.controller');
const billController = require('../controllers/bill.controller');
const priceHistoryController = require('../controllers/priceHistory.controller');


router.get('/reservations', reservationController.getReservations);
router.post('/reservation', reservationController.createReservation);
router.get('/guest/:id', guestController.getGuest);
router.get('/amenities/:room_id', reservationController.getAmenitiesByRoomId);

router.get('/rooms', roomController.getAllRooms);
router.get('/rooms/:id', roomController.getRoom);
router.post('/rooms', roomController.createRoom);
router.put('/rooms/:id', roomController.updateRoom);
router.delete('/rooms/:id', roomController.deleteRoom);

router.get('/bills', billController.getAllBills);
router.get('/bills/:id', billController.getBill);
router.post('/bills', billController.createBill);
router.put('/bills/:id', billController.updateBill);

// Price History routes
router.get('/pricehistory', priceHistoryController.getAllPriceHistories);
router.get('/pricehistory/:id', priceHistoryController.getPriceHistory);
router.get('/pricehistory/room/:roomId', priceHistoryController.getPriceHistoryByRoomId);
router.post('/pricehistory', priceHistoryController.createPriceHistory);
router.put('/pricehistory/:id', priceHistoryController.updatePriceHistory);
router.delete('/pricehistory/:id', priceHistoryController.deletePriceHistory);



module.exports = router;