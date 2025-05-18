// src/services/__tests__/reservationService.test.js

const ReservationService = require('../reservationService'); // Adjust path
const { Op } = require('sequelize'); // Needed for Op.ne in one mock

// Mock Repositories
const mockReservationRepository = {
    findReservationsWithDetails: jest.fn(),
    findReservationWithDetails: jest.fn(),
    findReservationsByStatus: jest.fn(),
    findReservationsByUser: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    updateReservationStatus: jest.fn(), // <<<<<< ADD THIS LINE
    findOne: jest.fn(),
    isRoomAvailable: jest.fn(),
  };

const mockRoomRepository = {
  findRoomWithDetails: jest.fn(),
  findCurrentPrice: jest.fn(),
  update: jest.fn(),
};

const mockUserRepository = {
  findUserById: jest.fn(),
};

describe('ReservationService', () => {
  let reservationService;
  const today = new Date();
  today.setHours(0,0,0,0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);


  beforeEach(() => {
    jest.clearAllMocks();
    reservationService = new ReservationService(
      mockReservationRepository,
      mockRoomRepository,
      mockUserRepository
    );
  });

  // --- getReservationWithDetails ---
  describe('getReservationWithDetails', () => {
    it('should return reservation details if found', async () => {
      const mockReservation = { id: 1, room_id: 101, user_id: 1 };
      mockReservationRepository.findReservationWithDetails.mockResolvedValue(mockReservation);
      const result = await reservationService.getReservationWithDetails(1);
      expect(result).toEqual(mockReservation);
      expect(mockReservationRepository.findReservationWithDetails).toHaveBeenCalledWith(1);
    });

    it('should throw "Reservation not found" if not found', async () => {
      mockReservationRepository.findReservationWithDetails.mockResolvedValue(null);
      await expect(reservationService.getReservationWithDetails(1))
        .rejects.toThrow('Reservation not found');
    });
  });

  // --- createReservation ---
  describe('createReservation', () => {
    const reservationData = {
      room_id: 1,
      user_id: 1,
      check_in_date: tomorrow.toISOString().split('T')[0],
      check_out_date: dayAfterTomorrow.toISOString().split('T')[0],
    };
    const mockUser = { id: 1, name: 'Test User' };
    const mockRoom = { id: 1, type: 'single' };
    const mockPriceEntry = { price: 100.00 };
    const createdReservation = { ...reservationData, id: 123, status: 'confirmed' };

    beforeEach(() => {
      mockUserRepository.findUserById.mockResolvedValue(mockUser);
      mockRoomRepository.findRoomWithDetails.mockResolvedValue(mockRoom);
      mockRoomRepository.findCurrentPrice.mockResolvedValue(mockPriceEntry);
      mockReservationRepository.isRoomAvailable.mockResolvedValue(true);
      mockReservationRepository.create.mockResolvedValue({ ...reservationData, id: 123 }); // raw created
      mockReservationRepository.findReservationWithDetails.mockResolvedValue(createdReservation); // for re-fetch
    });

    it('should create a reservation successfully', async () => {
      const result = await reservationService.createReservation(reservationData);
      expect(mockUserRepository.findUserById).toHaveBeenCalledWith(reservationData.user_id);
      expect(mockRoomRepository.findRoomWithDetails).toHaveBeenCalledWith(reservationData.room_id);
      expect(mockRoomRepository.findCurrentPrice).toHaveBeenCalledWith(reservationData.room_id, new Date(reservationData.check_in_date));
      expect(mockReservationRepository.isRoomAvailable).toHaveBeenCalledWith(
        reservationData.room_id,
        new Date(reservationData.check_in_date),
        new Date(reservationData.check_out_date)
      );
      expect(mockReservationRepository.create).toHaveBeenCalledWith({
        ...reservationData,
        status: 'confirmed',
      });
      expect(mockReservationRepository.findReservationWithDetails).toHaveBeenCalledWith(123);
      expect(result).toEqual(createdReservation);
    });

    it('should throw error if room_id is missing', async () => {
      await expect(reservationService.createReservation({ ...reservationData, room_id: null }))
        .rejects.toThrow('Room ID, User ID, check-in date, and check-out date are required');
    });

    it('should throw error if user not found', async () => {
      mockUserRepository.findUserById.mockResolvedValue(null);
      await expect(reservationService.createReservation(reservationData))
        .rejects.toThrow('User (guest) not found');
    });

    it('should throw error if room not found', async () => {
      mockRoomRepository.findRoomWithDetails.mockResolvedValue(null);
      await expect(reservationService.createReservation(reservationData))
        .rejects.toThrow('Room not found');
    });

    it('should throw error if room price cannot be determined', async () => {
      mockRoomRepository.findCurrentPrice.mockResolvedValue(null);
      await expect(reservationService.createReservation(reservationData))
        .rejects.toThrow('Could not determine room price for the selected dates.');
    });
    
    it('should throw error if check-in date is in the past', async () => {
        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - 1);
        await expect(reservationService.createReservation({ ...reservationData, check_in_date: pastDate.toISOString().split('T')[0] }))
            .rejects.toThrow('Check-in date cannot be in the past');
    });

    it('should throw error if room is not available', async () => {
      mockReservationRepository.isRoomAvailable.mockResolvedValue(false);
      await expect(reservationService.createReservation(reservationData))
        .rejects.toThrow('Room is not available for the selected dates');
    });

    it('should use provided status if valid ("canceled")', async () => {
        const dataWithStatus = { ...reservationData, status: 'canceled' };
        mockReservationRepository.create.mockResolvedValueOnce({ ...dataWithStatus, id: 124 });
        mockReservationRepository.findReservationWithDetails.mockResolvedValueOnce({ ...dataWithStatus, id: 124 });

        await reservationService.createReservation(dataWithStatus);
        expect(mockReservationRepository.create).toHaveBeenCalledWith(
          expect.objectContaining({ status: 'canceled' })
        );
    });

    it('should throw error for invalid initial status', async () => {
        const dataWithInvalidStatus = { ...reservationData, status: 'checked-in' };
        await expect(reservationService.createReservation(dataWithInvalidStatus))
            .rejects.toThrow('Initial status must be either confirmed or canceled, or left empty (defaults to confirmed)');
    });
  });

  // --- updateReservationStatus ---
  describe('updateReservationStatus', () => {
    const reservationId = 1;
    const mockReservation = { id: reservationId, room_id: 101, user_id: 1, status: 'confirmed', check_in_date: tomorrow.toISOString().split('T')[0], check_out_date: dayAfterTomorrow.toISOString().split('T')[0] };

    beforeEach(() => {
      mockReservationRepository.findReservationWithDetails.mockResolvedValue(mockReservation);
      // This is the key mock for the direct call that was failing:
      mockReservationRepository.updateReservationStatus.mockResolvedValue([1]); // Simulate 1 row updated
      // Mocks for other repository calls within the service method:
      mockRoomRepository.update.mockResolvedValue([1]);
      mockReservationRepository.findOne.mockResolvedValue(null); // Default to no conflicting reservation
    });

    it('should update status to "checked-in" and room to "occupied"', async () => {
      // Set up findReservationWithDetails to return the *final* state for the assertion
      mockReservationRepository.findReservationWithDetails.mockResolvedValue({ ...mockReservation, status: 'checked-in' });

      const result = await reservationService.updateReservationStatus(reservationId, 'checked-in');

      expect(mockReservationRepository.findReservationWithDetails).toHaveBeenCalledWith(reservationId); // Called for initial fetch and final re-fetch
      expect(mockReservationRepository.findOne).toHaveBeenCalledWith({
        room_id: mockReservation.room_id,
        status: 'checked-in',
        id: { [Op.ne]: reservationId },
      });
      expect(mockRoomRepository.update).toHaveBeenCalledWith({ status: 'occupied' }, { id: mockReservation.room_id });
      expect(mockReservationRepository.updateReservationStatus).toHaveBeenCalledWith(reservationId, 'checked-in');
      expect(result.status).toBe('checked-in');
    });

    it('should throw error if trying to check-in when another reservation is already checked-in for the room', async () => {
      mockReservationRepository.findOne.mockResolvedValue({ id: 2, room_id: mockReservation.room_id, status: 'checked-in' }); // Conflict

      await expect(reservationService.updateReservationStatus(reservationId, 'checked-in'))
        .rejects.toThrow('Another reservation is already checked-in for this room');
      expect(mockRoomRepository.update).not.toHaveBeenCalled();
      expect(mockReservationRepository.updateReservationStatus).not.toHaveBeenCalled(); // Should not be called if prior check fails
    });

    it('should update status to "checked-out" and room to "available" if no other checked-in', async () => {
      mockReservationRepository.findOne.mockResolvedValue(null); // No other checked-in
      mockReservationRepository.findReservationWithDetails.mockResolvedValue({ ...mockReservation, status: 'checked-out' });

      const result = await reservationService.updateReservationStatus(reservationId, 'checked-out');

      expect(mockRoomRepository.update).toHaveBeenCalledWith({ status: 'available' }, { id: mockReservation.room_id });
      expect(mockReservationRepository.updateReservationStatus).toHaveBeenCalledWith(reservationId, 'checked-out');
      expect(result.status).toBe('checked-out');
    });

    it('should update status to "canceled" and room to "available" if no other checked-in', async () => {
        mockReservationRepository.findOne.mockResolvedValue(null); // No other checked-in
        mockReservationRepository.findReservationWithDetails.mockResolvedValue({ ...mockReservation, status: 'canceled' });

        const result = await reservationService.updateReservationStatus(reservationId, 'canceled');
        expect(mockRoomRepository.update).toHaveBeenCalledWith({ status: 'available' }, { id: mockReservation.room_id });
        expect(mockReservationRepository.updateReservationStatus).toHaveBeenCalledWith(reservationId, 'canceled');
        expect(result.status).toBe('canceled');
    });

    it('should update status to "checked-out" but NOT room to "available" if another reservation is still checked-in', async () => {
      const otherCheckedInReservation = { id: 99, room_id: mockReservation.room_id, status: 'checked-in' };
      mockReservationRepository.findOne.mockResolvedValue(otherCheckedInReservation); // Another reservation is checked-in
      mockReservationRepository.findReservationWithDetails.mockResolvedValue({ ...mockReservation, status: 'checked-out' });

      const result = await reservationService.updateReservationStatus(reservationId, 'checked-out');

      expect(mockRoomRepository.update).not.toHaveBeenCalledWith(expect.objectContaining({ status: 'available' }), expect.anything());
      // Room update to 'occupied' or other statuses might still be called if it was checked-in before,
      // but not to 'available' if another is present. The current logic for 'checked-out'/'canceled' calls:
      // roomRepository.update({ status: 'available' }, { id: reservation.room_id });
      // So this not.toHaveBeenCalledWith is appropriate for the 'available' status.
      expect(mockReservationRepository.updateReservationStatus).toHaveBeenCalledWith(reservationId, 'checked-out');
      expect(result.status).toBe('checked-out');
    });

    it('should throw error for invalid status string', async () => {
      await expect(reservationService.updateReservationStatus(reservationId, 'invalid_status'))
        .rejects.toThrow('Invalid status. Must be one of: confirmed, checked-in, checked-out, paid, canceled');
    });
  });

  // More tests can be added for updateReservation, getReservationsByStatus, getReservationsByUser
});