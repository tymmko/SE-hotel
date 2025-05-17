// src/services/__tests__/priceHistoryService.test.js

const PriceHistoryService = require('../priceHistoryService'); // Adjust path as needed

// Mock the repositories that PriceHistoryService depends on
// We are mocking the *instances* of these repositories that the service would receive.
const mockPriceHistoryRepository = {
  findPriceHistoryByRoom: jest.fn(),
  addPriceHistory: jest.fn(),
  // Add any other methods from BaseRepository if PriceHistoryService directly used them,
  // though in this case, it seems to primarily use its own defined methods or those above.
};

const mockRoomRepository = {
  findRoomWithDetails: jest.fn(),
  // Add other methods if PriceHistoryService were to use them.
};

describe('PriceHistoryService', () => {
  let priceHistoryService;

  beforeEach(() => {
    // Reset mocks before each test to ensure test isolation
    jest.clearAllMocks();

    // Create a new instance of the service with mocked repositories
    priceHistoryService = new PriceHistoryService(mockPriceHistoryRepository, mockRoomRepository);
  });

  describe('addPriceHistory', () => {
    const roomId = 1;
    const price = 100;
    const startDate = new Date('2025-06-01');
    const endDate = new Date('2025-06-10');
    const mockRoom = { id: roomId, type: 'single' /* other room details */ };
    const newPriceEntry = {
        price_history_id: 1,
        room_id: roomId,
        price,
        start_date: startDate.toISOString().split('T')[0], // Assuming DATEONLY format
        end_date: endDate.toISOString().split('T')[0],
    };

    it('should add price history successfully if room exists and no overlap', async () => {
      mockRoomRepository.findRoomWithDetails.mockResolvedValue(mockRoom);
      mockPriceHistoryRepository.findPriceHistoryByRoom.mockResolvedValue([]); // No existing prices, so no overlap
      mockPriceHistoryRepository.addPriceHistory.mockResolvedValue(newPriceEntry);

      const result = await priceHistoryService.addPriceHistory(roomId, price, startDate, endDate);

      expect(mockRoomRepository.findRoomWithDetails).toHaveBeenCalledWith(roomId);
      expect(mockPriceHistoryRepository.findPriceHistoryByRoom).toHaveBeenCalledWith(roomId);
      expect(mockPriceHistoryRepository.addPriceHistory).toHaveBeenCalledWith(roomId, price, startDate, endDate);
      expect(result).toEqual(newPriceEntry);
    });

    it('should throw an error if room is not found', async () => {
      mockRoomRepository.findRoomWithDetails.mockResolvedValue(null); // Simulate room not found

      await expect(priceHistoryService.addPriceHistory(roomId, price, startDate, endDate))
        .rejects
        .toThrow('Room not found');

      expect(mockRoomRepository.findRoomWithDetails).toHaveBeenCalledWith(roomId);
      expect(mockPriceHistoryRepository.findPriceHistoryByRoom).not.toHaveBeenCalled();
      expect(mockPriceHistoryRepository.addPriceHistory).not.toHaveBeenCalled();
    });

    it('should throw an error if new price range overlaps with an existing one', async () => {
      const existingPrice = {
        start_date: '2025-06-05', // Overlaps with startDate: 2025-06-01, endDate: 2025-06-10
        end_date: '2025-06-15',
        price: 90,
        room_id: roomId,
      };
      mockRoomRepository.findRoomWithDetails.mockResolvedValue(mockRoom);
      mockPriceHistoryRepository.findPriceHistoryByRoom.mockResolvedValue([existingPrice]);

      await expect(priceHistoryService.addPriceHistory(roomId, price, startDate, endDate))
        .rejects
        .toThrow('New price range overlaps with existing price history');

      expect(mockRoomRepository.findRoomWithDetails).toHaveBeenCalledWith(roomId);
      expect(mockPriceHistoryRepository.findPriceHistoryByRoom).toHaveBeenCalledWith(roomId);
      expect(mockPriceHistoryRepository.addPriceHistory).not.toHaveBeenCalled();
    });

    it('should handle various overlap scenarios correctly (e.g., new inside existing)', async () => {
      const existingPrice = {
        start_date: '2025-06-01',
        end_date: '2025-06-15',
        price: 90,
        room_id: roomId,
      };
      const newStartDate = new Date('2025-06-02');
      const newEndDate = new Date('2025-06-10');

      mockRoomRepository.findRoomWithDetails.mockResolvedValue(mockRoom);
      mockPriceHistoryRepository.findPriceHistoryByRoom.mockResolvedValue([existingPrice]);

      await expect(priceHistoryService.addPriceHistory(roomId, price, newStartDate, newEndDate))
        .rejects
        .toThrow('New price range overlaps with existing price history');
    });

    it('should handle various overlap scenarios correctly (e.g., existing inside new)', async () => {
        const existingPrice = {
            start_date: '2025-06-05',
            end_date: '2025-06-08',
            price: 90,
            room_id: roomId,
        };
        const newStartDate = new Date('2025-06-01');
        const newEndDate = new Date('2025-06-10');

        mockRoomRepository.findRoomWithDetails.mockResolvedValue(mockRoom);
        mockPriceHistoryRepository.findPriceHistoryByRoom.mockResolvedValue([existingPrice]);

        await expect(priceHistoryService.addPriceHistory(roomId, price, newStartDate, newEndDate))
            .rejects
            .toThrow('New price range overlaps with existing price history');
    });


    it('should use default start date (today) if startDate is not provided', async () => {
      const today = new Date();
      // For comparison, we need to ensure the time part is zeroed out or handle it carefully.
      // The service logic uses `new Date()`, so we match that.
      // The `addPriceHistory` repo mock will receive this date.
      const expectedStartDate = today; // The service will create `new Date()`
      const expectedEndDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));


      mockRoomRepository.findRoomWithDetails.mockResolvedValue(mockRoom);
      mockPriceHistoryRepository.findPriceHistoryByRoom.mockResolvedValue([]);
      mockPriceHistoryRepository.addPriceHistory.mockResolvedValue({
        ...newPriceEntry,
        start_date: expectedStartDate.toISOString().split('T')[0],
        end_date: expectedEndDate.toISOString().split('T')[0],
      });

      await priceHistoryService.addPriceHistory(roomId, price, undefined, null); // Pass undefined for startDate, null for endDate

      // Get the actual Date object passed to addPriceHistory mock
      const actualCallArgs = mockPriceHistoryRepository.addPriceHistory.mock.calls[0];
      const actualStartDate = actualCallArgs[2];
      const actualEndDate = actualCallArgs[3];

      // Check if the date part is the same for start date
      expect(actualStartDate.getFullYear()).toEqual(expectedStartDate.getFullYear());
      expect(actualStartDate.getMonth()).toEqual(expectedStartDate.getMonth());
      expect(actualStartDate.getDate()).toEqual(expectedStartDate.getDate());

      // Check if the date part is the same for end date
      expect(actualEndDate.getFullYear()).toEqual(expectedEndDate.getFullYear());
      expect(actualEndDate.getMonth()).toEqual(expectedEndDate.getMonth());
      expect(actualEndDate.getDate()).toEqual(expectedEndDate.getDate());
    });

    it('should use default end date (one year from start) if endDate is not provided', async () => {
      const providedStartDate = new Date('2025-07-01');
      const expectedEndDate = new Date(new Date(providedStartDate).setFullYear(providedStartDate.getFullYear() + 1));

      mockRoomRepository.findRoomWithDetails.mockResolvedValue(mockRoom);
      mockPriceHistoryRepository.findPriceHistoryByRoom.mockResolvedValue([]);
      mockPriceHistoryRepository.addPriceHistory.mockResolvedValue({
        ...newPriceEntry,
        start_date: providedStartDate.toISOString().split('T')[0],
        end_date: expectedEndDate.toISOString().split('T')[0],
      });

      await priceHistoryService.addPriceHistory(roomId, price, providedStartDate, undefined);

      expect(mockPriceHistoryRepository.addPriceHistory).toHaveBeenCalledWith(
        roomId,
        price,
        providedStartDate, // The service normalizes this
        expect.any(Date) // For expectedEndDate, which is calculated
      );
      // More precise check for the end date passed to the mock
      const actualEndDatePassedToMock = mockPriceHistoryRepository.addPriceHistory.mock.calls[0][3];
      expect(actualEndDatePassedToMock.getFullYear()).toBe(expectedEndDate.getFullYear());
      expect(actualEndDatePassedToMock.getMonth()).toBe(expectedEndDate.getMonth());
      expect(actualEndDatePassedToMock.getDate()).toBe(expectedEndDate.getDate());
    });

  });
});