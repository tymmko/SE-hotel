// src/services/__tests__/roomService.test.js

const RoomService = require('../roomService'); // Adjust path as needed

// Mock the RoomRepository
const mockRoomRepository = {
  findRoomsWithDetails: jest.fn(),
  findRoomWithDetails: jest.fn(),
  findCurrentPrice: jest.fn(),
  findById: jest.fn(),
  findCurrentReservationAndGuest: jest.fn(),
  findPriceHistoryByRoom: jest.fn(),
  findEquipmentByRoom: jest.fn(),
  transaction: jest.fn(), // Important for createRoom and updateRoom
  create: jest.fn(),
  update: jest.fn(),
  endCurrentPriceHistory: jest.fn(),
  createPriceHistory: jest.fn(),
  hasActiveReservations: jest.fn(),
  delete: jest.fn(),
  findAvailableRooms: jest.fn(),
  findBookedRoomIds: jest.fn(),
  // BaseRepository methods if used directly and not overridden by RoomRepository specific ones
};

describe('RoomService', () => {
  let roomService;
  const today = new Date(); // For consistent date checks if needed

  beforeEach(() => {
    jest.clearAllMocks();
    roomService = new RoomService(mockRoomRepository);

    // Mock implementation for transaction to immediately execute the callback
    mockRoomRepository.transaction.mockImplementation(async (callback) => {
      // Pass a mock transaction object if your repository methods expect one.
      // For simplicity here, we assume they might not strictly need it if the operations are simple.
      // Or, you can pass a simple object: const mockTransaction = {};
      return callback(/* mockTransaction */);
    });
  });

  // --- Test for getAllRoomsWithDetails ---
  describe('getAllRoomsWithDetails', () => {
    it('should return all rooms with their current prices', async () => {
      const mockRooms = [
        { id: 1, type: 'single' },
        { id: 2, type: 'double' },
      ];
      const mockPrice1 = { room_id: 1, price: 100 };
      const mockPrice2 = { room_id: 2, price: 150 };

      mockRoomRepository.findRoomsWithDetails.mockResolvedValue(mockRooms);
      mockRoomRepository.findCurrentPrice
        .mockResolvedValueOnce(mockPrice1) // For room 1
        .mockResolvedValueOnce(mockPrice2); // For room 2

      const result = await roomService.getAllRoomsWithDetails();

      expect(mockRoomRepository.findRoomsWithDetails).toHaveBeenCalled();
      expect(mockRoomRepository.findCurrentPrice).toHaveBeenCalledTimes(2);
      expect(mockRoomRepository.findCurrentPrice).toHaveBeenCalledWith(1, expect.any(Date));
      expect(mockRoomRepository.findCurrentPrice).toHaveBeenCalledWith(2, expect.any(Date));
      expect(result).toEqual([
        { ...mockRooms[0], price_per_night: mockPrice1.price },
        { ...mockRooms[1], price_per_night: mockPrice2.price },
      ]);
    });

    it('should return rooms with null price if no current price found', async () => {
        const mockRooms = [{ id: 1, type: 'single' }];
        mockRoomRepository.findRoomsWithDetails.mockResolvedValue(mockRooms);
        mockRoomRepository.findCurrentPrice.mockResolvedValue(null); // No price for room 1

        const result = await roomService.getAllRoomsWithDetails();
        expect(result).toEqual([{ ...mockRooms[0], price_per_night: null }]);
    });
  });

  // --- Test for getRoomWithDetails ---
  describe('getRoomWithDetails', () => {
    const roomId = 1;
    const mockRoom = { id: roomId, type: 'suite' };
    const mockPrice = { room_id: roomId, price: 200 };

    it('should return room details with current price if room found', async () => {
      mockRoomRepository.findRoomWithDetails.mockResolvedValue(mockRoom);
      mockRoomRepository.findCurrentPrice.mockResolvedValue(mockPrice);

      const result = await roomService.getRoomWithDetails(roomId);

      expect(mockRoomRepository.findRoomWithDetails).toHaveBeenCalledWith(roomId);
      expect(mockRoomRepository.findCurrentPrice).toHaveBeenCalledWith(roomId, expect.any(Date));
      expect(result).toEqual({ ...mockRoom, price_per_night: mockPrice.price });
    });

    it('should throw "Room not found" if room is not found', async () => {
      mockRoomRepository.findRoomWithDetails.mockResolvedValue(null);

      await expect(roomService.getRoomWithDetails(roomId))
        .rejects
        .toThrow('Room not found');
      expect(mockRoomRepository.findCurrentPrice).not.toHaveBeenCalled();
    });
  });

  // --- Test for createRoom ---
  describe('createRoom', () => {
    const roomData = { type: 'suite', status: 'available', capacity: 4 };
    const adminUser = { role: 'admin' };
    const guestUser = { role: 'guest' };
    const createdRoom = { id: 1, ...roomData };

    it('should create a room if user is admin', async () => {
      mockRoomRepository.create.mockResolvedValue(createdRoom); // Mock create within transaction

      const result = await roomService.createRoom(roomData, adminUser);

      expect(mockRoomRepository.transaction).toHaveBeenCalled();
      expect(mockRoomRepository.create).toHaveBeenCalledWith(roomData, { transaction: undefined }); // or expect.anything() for transaction object
      expect(result).toEqual(createdRoom);
    });

    it('should throw an error if user is not admin', async () => {
      await expect(roomService.createRoom(roomData, guestUser))
        .rejects
        .toThrow('Only admins can create rooms');
      expect(mockRoomRepository.transaction).not.toHaveBeenCalled();
    });
  });

  // --- Test for updateRoom ---
  describe('updateRoom', () => {
    const roomId = 1;
    const roomData = { status: 'maintenance' };
    const roomDataWithPrice = { price_per_night: 250, type: 'deluxe' };
    const adminUser = { role: 'admin' };
    const guestUser = { role: 'guest' };
    const mockUpdatedRoom = { id: roomId, ...roomDataWithPrice, price_per_night: 250 }; // price_per_night is conceptual here for return

    beforeEach(() => {
        // Default mock for update returning 1 row affected
        mockRoomRepository.update.mockResolvedValue([1]);
        // Default mock for findRoomWithDetails after update
        mockRoomRepository.findRoomWithDetails.mockImplementation(async (id) => ({
            id,
            ...(id === roomId ? roomDataWithPrice : {}), // Return updated data
            price_per_night: roomDataWithPrice.price_per_night // Assume this is set by findRoomWithDetails mock itself
        }));
    });

    it('should update room details if user is admin (even with price)', async () => {
      const result = await roomService.updateRoom(roomId, roomDataWithPrice, adminUser);

      expect(mockRoomRepository.transaction).toHaveBeenCalled();
      expect(mockRoomRepository.update).toHaveBeenCalledWith(roomDataWithPrice, { id: roomId }, { transaction: undefined });
      expect(mockRoomRepository.endCurrentPriceHistory).toHaveBeenCalledWith(roomId, { transaction: undefined });
      expect(mockRoomRepository.createPriceHistory).toHaveBeenCalledWith(
        roomId,
        roomDataWithPrice.price_per_night,
        expect.any(Date),
        null,
        { transaction: undefined }
      );
      expect(mockRoomRepository.findRoomWithDetails).toHaveBeenCalledWith(roomId);
      expect(result.price_per_night).toBe(roomDataWithPrice.price_per_night);
    });

    it('should update room details if user is not admin and not updating price', async () => {
        mockRoomRepository.findRoomWithDetails.mockImplementation(async (id) => ({
            id,
            ...roomData, // Return updated data
            price_per_night: 100 // Some existing price
        }));
      const result = await roomService.updateRoom(roomId, roomData, guestUser);

      expect(mockRoomRepository.transaction).toHaveBeenCalled();
      expect(mockRoomRepository.update).toHaveBeenCalledWith(roomData, { id: roomId }, { transaction: undefined });
      expect(mockRoomRepository.endCurrentPriceHistory).not.toHaveBeenCalled();
      expect(mockRoomRepository.createPriceHistory).not.toHaveBeenCalled();
      expect(mockRoomRepository.findRoomWithDetails).toHaveBeenCalledWith(roomId);
      expect(result.status).toBe(roomData.status);
    });

    it('should throw error if user is not admin and tries to update price', async () => {
      await expect(roomService.updateRoom(roomId, roomDataWithPrice, guestUser))
        .rejects
        .toThrow('Only admins can update room prices');
      expect(mockRoomRepository.transaction).not.toHaveBeenCalled();
    });

    it('should throw "Room not found" if update affects 0 rows', async () => {
      mockRoomRepository.update.mockResolvedValue([0]); // No rows affected

      await expect(roomService.updateRoom(roomId, roomData, adminUser))
        .rejects
        .toThrow('Room not found');
       // findRoomWithDetails might still be called within the transaction before the error is thrown by the service
       // depending on how the transaction promise chain is structured. If service checks updated count *before* find,
       // then findRoomWithDetails won't be called after the update in this error path.
       // Current service: if (updated === 0) { throw new Error('Room not found'); }
       // So findRoomWithDetails would not be called to *return* the room.
    });
  });

  // --- Test for deleteRoom ---
  describe('deleteRoom', () => {
    const roomId = 1;

    it('should delete room if it has no active reservations', async () => {
      mockRoomRepository.hasActiveReservations.mockResolvedValue(false);
      mockRoomRepository.delete.mockResolvedValue(1); // 1 row deleted

      const result = await roomService.deleteRoom(roomId);

      expect(mockRoomRepository.hasActiveReservations).toHaveBeenCalledWith(roomId);
      expect(mockRoomRepository.delete).toHaveBeenCalledWith({ id: roomId });
      expect(result).toBe(true);
    });

    it('should throw error if room has active reservations', async () => {
      mockRoomRepository.hasActiveReservations.mockResolvedValue(true);

      await expect(roomService.deleteRoom(roomId))
        .rejects
        .toThrow('Cannot delete room with active reservations');
      expect(mockRoomRepository.delete).not.toHaveBeenCalled();
    });

    it('should throw "Room not found" if delete affects 0 rows', async () => {
      mockRoomRepository.hasActiveReservations.mockResolvedValue(false);
      mockRoomRepository.delete.mockResolvedValue(0); // 0 rows deleted

      await expect(roomService.deleteRoom(roomId))
        .rejects
        .toThrow('Room not found');
    });
  });

  // --- Test for getAvailableRooms ---
  describe('getAvailableRooms', () => {
    const checkIn = '2025-12-01';
    const checkOut = '2025-12-05';
    const mockAvailableRooms = [{ id: 1, type: 'single' }];

    it('should return available rooms for valid date range', async () => {
      mockRoomRepository.findAvailableRooms.mockResolvedValue(mockAvailableRooms);

      const result = await roomService.getAvailableRooms(checkIn, checkOut);

      expect(mockRoomRepository.findAvailableRooms).toHaveBeenCalledWith(new Date(checkIn), new Date(checkOut));
      expect(result).toEqual(mockAvailableRooms);
    });

    it.each([
      [null, checkOut, 'Check-in and check-out dates are required'],
      [checkIn, null, 'Check-in and check-out dates are required'],
      ['invalid-date', checkOut, 'Invalid date format'],
      [checkIn, 'invalid-date', 'Invalid date format'],
      [checkOut, checkIn, 'Check-out date must be after check-in date'], // checkIn > checkOut
      [new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], checkOut, 'Check-in date cannot be in the past'], // Past check-in
    ])('should throw error for invalid input: checkIn=%s, checkOut=%s', async (ci, co, errorMsg) => {
        await expect(roomService.getAvailableRooms(ci, co)).rejects.toThrow(errorMsg);
    });
  });

  // --- Test for updateRoomStatus ---
  describe('updateRoomStatus', () => {
    const roomId = 1;
    const mockExistingRoom = { id: roomId, status: 'available', type: 'deluxe', capacity: 2, price_per_night: 100 };

    it('should update room status successfully for valid statuses (not "available")', async () => {
      // updateRoomStatus calls this.updateRoom, which calls repo.update and then repo.findRoomWithDetails
      mockRoomRepository.update.mockResolvedValue([1]); // update within this.updateRoom
      mockRoomRepository.findRoomWithDetails.mockResolvedValue({ ...mockExistingRoom, status: 'occupied' }); // find after update

      const result = await roomService.updateRoomStatus(roomId, 'occupied');

      expect(mockRoomRepository.update).toHaveBeenCalledWith({ status: 'occupied' }, { id: roomId }, { transaction: undefined });
      expect(result.status).toBe('occupied');
      expect(mockRoomRepository.findBookedRoomIds).not.toHaveBeenCalled(); // Not called if status isn't 'available'
    });

    it('should update status to "available" if room has no current/future bookings', async () => {
      mockRoomRepository.findBookedRoomIds.mockResolvedValue([]); // No bookings for today/tomorrow
      mockRoomRepository.update.mockResolvedValue([1]);
      mockRoomRepository.findRoomWithDetails.mockResolvedValue({ ...mockExistingRoom, status: 'available' });

      const result = await roomService.updateRoomStatus(roomId, 'available');

      expect(mockRoomRepository.findBookedRoomIds).toHaveBeenCalledWith(expect.any(Date), expect.any(Date));
      expect(mockRoomRepository.update).toHaveBeenCalledWith({ status: 'available' }, { id: roomId }, { transaction: undefined });
      expect(result.status).toBe('available');
    });

    it('should throw error when updating to "available" if room has bookings', async () => {
      mockRoomRepository.findBookedRoomIds.mockResolvedValue([roomId]); // Room is booked

      await expect(roomService.updateRoomStatus(roomId, 'available'))
        .rejects
        .toThrow('Cannot mark room as Available when it has reservations for today');
      expect(mockRoomRepository.update).not.toHaveBeenCalled();
    });

    it('should throw error for invalid status string', async () => {
      await expect(roomService.updateRoomStatus(roomId, 'nonexistent_status'))
        .rejects
        .toThrow('Invalid status. Must be one of: available, occupied, maintenance');
    });
  });

});