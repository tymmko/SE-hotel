/**
 * Controller for managing reservation-related endpoints
 * Handles HTTP requests and delegates business logic to the ReservationService
 */
class ReservationController {
  /**
   * @param {ReservationService} reservationService - Service for reservation operations
   */
  constructor(reservationService) {
    this.reservationService = reservationService;
  }

  /**
   * Retrieve all reservations with optional filters
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the list of reservations
   * @example
   * // Get all reservations
   * GET /reservations
   * // Get reservations by status
   * GET /reservations?status=confirmed
   * // Get reservations by user
   * GET /reservations?user_id=123
   */
  async getAllReservations(req, res, next) {
    try {
      let reservations;
      if (req.query.status) {
        reservations = await this.reservationService.getReservationsByStatus(req.query.status);
      } else if (req.query.user_id) {
        reservations = await this.reservationService.getReservationsByUser(req.query.user_id);
      } else {
        reservations = await this.reservationService.getAllReservationsWithDetails();
      }
      
      res.status(200).json({
        success: true,
        count: reservations.length,
        reservations
      });
    } catch (error) {
      if (error.message.includes('Invalid status') || error.message === 'User not found') {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Retrieve a single reservation by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the reservation details
   * @example
   * GET /reservations/123
   */
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

  /**
   * Create a new reservation
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the created reservation
   * @example
   * POST /reservations
   * {
   *   "room_id": 123,
   *   "user_id": 456,
   *   "check_in_date": "2025-01-01",
   *   "check_out_date": "2025-01-05",
   *   "status": "confirmed"
   * }
   */
  async createReservation(req, res, next) {
    try {
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
        'Room is not available', 'Room not found', 'User (guest) not found',
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

  /**
   * Update an existing reservation
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the updated reservation
   * @example
   * PUT /reservations/123
   * {
   *   "check_in_date": "2025-01-02",
   *   "check_out_date": "2025-01-06"
   * }
   */
  async updateReservation(req, res, next) {
    try {
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
        'Room is not available', 'Room not found', 'User (guest) not found',
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

  /**
   * Update the status of a reservation
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the updated reservation
   * @example
   * PATCH /reservations/123/status
   * {
   *   "status": "checked-in"
   * }
   */
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
        error.message.includes('Room is no longer available') ||
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