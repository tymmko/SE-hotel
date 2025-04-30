// src/controllers/reservation.controller.js

/**
 * Controller for Reservation-related endpoints
 * Handles HTTP requests/responses and delegates business logic to the service layer
 */
class ReservationController {
  /**
   * @param {ReservationService} reservationService - Service for reservation operations
   */
  constructor(reservationService) {
    this.reservationService = reservationService;
  }

  /**
   * Get all reservations
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getAllReservations(req, res, next) {
    try {
      // Filter by status if provided in query
      if (req.query.status) {
        const reservations = await this.reservationService.getReservationsByStatus(req.query.status);
        
        return res.status(200).json({
          success: true,
          count: reservations.length,
          data: reservations
        });
      }
      
      // Get all reservations
      const reservations = await this.reservationService.getAllReservationsWithDetails();
      
      res.status(200).json({
        success: true,
        count: reservations.length,
        data: reservations
      });
    } catch (error) {
      if (error.message.includes('Invalid status')) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Get single reservation by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getReservation(req, res, next) {
    try {
      const reservation = await this.reservationService.getReservationWithDetails(req.params.id);
      
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
      next(error);
    }
  }

  /**
   * Create new reservation
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async createReservation(req, res, next) {
    try {
      const reservation = await this.reservationService.createReservation(req.body);
      
      res.status(201).json({
        success: true,
        data: reservation
      });
    } catch (error) {
      if (error.message.includes('required') || 
          error.message.includes('Invalid date') ||
          error.message.includes('Check-out date') ||
          error.message.includes('Check-in date') ||
          error.message.includes('Room is not available') ||
          error.message.includes('Room not found') ||
          error.message.includes('Status must be')) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Update reservation
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
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
      
      if (error.message.includes('Invalid date') ||
          error.message.includes('Check-out date') ||
          error.message.includes('Check-in date') ||
          error.message.includes('Room is not available') ||
          error.message.includes('Room not found') ||
          error.message.includes('Status must be')) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Update reservation status
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
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
        data: reservation
      });
    } catch (error) {
      if (error.message === 'Reservation not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      
      if (error.message.includes('Invalid status') || 
          error.message.includes('Room is no longer available')) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  /**
   * Cancel reservation
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */



}

module.exports = ReservationController;