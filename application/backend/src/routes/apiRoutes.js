const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');
const guestController = require('../controllers/guest.controller');

router.get('/reservations', reservationController.getReservations);
router.post('/reservation', reservationController.createReservation);
router.get('/guest/:id', guestController.getGuest);
router.get('/amenities/:room_id', reservationController.getAmenitiesByRoomId);

module.exports = router;