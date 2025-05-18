// src/controllers/reservation.controller.js

class ReservationController {
	constructor(reservationService) {
	  this.reservationService = reservationService;
	}
  
	async getAllReservations(req, res, next) {
	  try {
		let reservations;
		if (req.query.status) {
		  reservations = await this.reservationService.getReservationsByStatus(req.query.status);
		} else if (req.query.user_id) { // Changed from guest_id
		  reservations = await this.reservationService.getReservationsByUser(req.query.user_id); // Changed from getReservationsByGuest
		} else {
		  reservations = await this.reservationService.getAllReservationsWithDetails();
		}
		
		res.status(200).json({
		  success: true,
		  count: reservations.length,
		  reservations
		});
	  } catch (error) {
		if (error.message.includes('Invalid status') || error.message === 'User not found') { // Added User not found
		  return res.status(400).json({
			success: false,
			message: error.message
		  });
		}
		next(error);
	  }
	}
  
	async getReservation(req, res, next) {
	  try {
		const reservation = await this.reservationService.getReservationWithDetails(req.params.id);
		res.status(200).json({
		  success: true,
		  reservation
		});
	  } catch (error) {
		if (error.message === 'Reservation not found') {
		  return res.status(404).json({
			success: false,
			message: error.message
		  });
		}
		next(error);
	  }
	}
  
	async createReservation(req, res, next) {
	  try {
		// Ensure req.body contains user_id instead of guest_id
		const { room_id, user_id, check_in_date, check_out_date, status } = req.body;
		if (!user_id) {
		  return res.status(400).json({ success: false, message: 'user_id is required.' });
		}
		const reservation = await this.reservationService.createReservation({ room_id, user_id, check_in_date, check_out_date, status });
		
		res.status(201).json({
		  success: true,
		  reservation
		});
	  } catch (error) {
		const badRequestMessages = [
		  'required', 'Invalid date', 'Check-out date', 'Check-in date',
		  'Room is not available', 'Room not found', 'User (guest) not found', // Added user not found
		  'Status must be', 'Could not determine room price'
		];
		if (badRequestMessages.some(msg => error.message.includes(msg))) {
		  return res.status(400).json({
			success: false,
			message: error.message
		  });
		}
		next(error);
	  }
	}
  
	async updateReservation(req, res, next) {
	  try {
		// Ensure req.body might contain user_id for update
		const reservation = await this.reservationService.updateReservation(req.params.id, req.body);
		res.status(200).json({
		  success: true,
		  data: reservation
		});
	  } catch (error) {
		if (error.message === 'Reservation not found') {
		  return res.status(404).json({
			success: false,
			message: error.message
		  });
		}
		
		const badRequestMessages = [
		  'Invalid date', 'Check-out date', 'Check-in date',
		  'Room is not available', 'Room not found', 'User (guest) not found', // Added user not found
		  'Status must be', 'Could not determine room price'
		];
		if (badRequestMessages.some(msg => error.message.includes(msg))) {
		  return res.status(400).json({
			success: false,
			message: error.message
		  });
		}
		next(error);
	  }
	}
  
	async updateReservationStatus(req, res, next) {
	  try {
		const { status } = req.body;
		if (!status) {
		  return res.status(400).json({
			success: false,
			message: 'Please provide a status'
		  });
		}
		const reservation = await this.reservationService.updateReservationStatus(req.params.id, status);
		res.status(200).json({
		  success: true,
		  reservation
		});
	  } catch (error) {
		if (error.message === 'Reservation not found') {
		  return res.status(404).json({
			success: false,
			message: error.message
		  });
		}
		if (
		  error.message.includes('Invalid status') || 
		  error.message.includes('Room is no longer available') || // This might be caught by isRoomAvailable now
		  error.message.includes('Another reservation is already checked-in')
		) {
		  return res.status(400).json({
			success: false,
			message: error.message
		  });
		}
		next(error);
	  }
	}
  }
  
  module.exports = ReservationController;