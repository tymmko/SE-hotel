// src/services/__tests__/guestService.test.js

const GuestService = require('../guestService'); // Adjust path as needed

// Mock the UserRepository
const mockUserRepository = {
  findAllUsers: jest.fn(),
  findUserById: jest.fn(),
  findUserByEmail: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
};

describe('GuestService', () => {
  let guestService;
  const guestRole = 'guest';

  beforeEach(() => {
    jest.clearAllMocks();
    guestService = new GuestService(mockUserRepository);
  });

  // --- Test for getAllGuests ---
  describe('getAllGuests', () => {
    it('should return all users with the role "guest"', async () => {
      const mockGuests = [
        { id: 1, email: 'guest1@example.com', role: guestRole, first_name: 'Guest', last_name: 'One' },
        { id: 2, email: 'guest2@example.com', role: guestRole, first_name: 'Guest', last_name: 'Two' },
      ];
      mockUserRepository.findAllUsers.mockResolvedValue(mockGuests);

      const result = await guestService.getAllGuests();

      expect(mockUserRepository.findAllUsers).toHaveBeenCalledWith({
        where: { role: guestRole },
        attributes: { exclude: ['password'] },
      });
      expect(result).toEqual(mockGuests);
    });
  });

  // --- Test for getGuestById ---
  describe('getGuestById', () => {
    const guestId = 1;
    const mockGuest = { id: guestId, email: 'guest@example.com', role: guestRole, first_name: 'Test', last_name: 'Guest' };
    const mockAdminUser = { id: guestId, email: 'admin@example.com', role: 'admin', first_name: 'Admin', last_name: 'User' };

    it('should return a guest user if found and role is "guest"', async () => {
      mockUserRepository.findUserById.mockResolvedValue(mockGuest);

      const result = await guestService.getGuestById(guestId);

      expect(mockUserRepository.findUserById).toHaveBeenCalledWith(guestId);
      expect(result).toEqual(mockGuest);
    });

    it('should throw "Guest not found" if user is found but role is not "guest"', async () => {
      mockUserRepository.findUserById.mockResolvedValue(mockAdminUser);

      await expect(guestService.getGuestById(guestId))
        .rejects
        .toThrow('Guest not found');
      expect(mockUserRepository.findUserById).toHaveBeenCalledWith(guestId);
    });

    it('should throw "Guest not found" if user is not found by ID', async () => {
      mockUserRepository.findUserById.mockResolvedValue(null);

      await expect(guestService.getGuestById(guestId))
        .rejects
        .toThrow('Guest not found');
      expect(mockUserRepository.findUserById).toHaveBeenCalledWith(guestId);
    });
  });

  // --- Test for createGuest ---
  describe('createGuest', () => {
    const guestData = {
      first_name: 'New',
      last_name: 'Guest',
      email: 'newguest@example.com',
      phone_number: '1234567890',
    };
    const createdGuestUser = { ...guestData, id: 3, role: guestRole };

    it('should create a new guest user successfully', async () => {
      mockUserRepository.findUserByEmail.mockResolvedValue(null); // No existing user with this email
      mockUserRepository.createUser.mockResolvedValue(createdGuestUser);

      const result = await guestService.createGuest(guestData);

      expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith(guestData.email);
      expect(mockUserRepository.createUser).toHaveBeenCalledWith({
        ...guestData,
        role: guestRole,
      });
      expect(result).toEqual(createdGuestUser);
    });

    it.each([
      [{ last_name: 'Guest', email: 'test@example.com' }, 'First name, last name, and email are required'], // Missing first_name
      [{ first_name: 'Guest', email: 'test@example.com' }, 'First name, last name, and email are required'], // Missing last_name
      [{ first_name: 'Guest', last_name: 'User' }, 'First name, last name, and email are required'],         // Missing email
    ])('should throw an error if required fields are missing %s', async (invalidData, errorMessage) => {
      await expect(guestService.createGuest(invalidData))
        .rejects
        .toThrow(errorMessage);
    });

    it('should throw an error for invalid email format', async () => {
      const invalidEmailData = { ...guestData, email: 'invalid-email' };
      await expect(guestService.createGuest(invalidEmailData))
        .rejects
        .toThrow('Invalid email format');
    });

    it('should throw an error if an account with the email already exists', async () => {
      mockUserRepository.findUserByEmail.mockResolvedValue({ id: 99, email: guestData.email, role: 'some_role' });

      await expect(guestService.createGuest(guestData))
        .rejects
        .toThrow('An account with this email already exists.');
      expect(mockUserRepository.createUser).not.toHaveBeenCalled();
    });
  });

  // --- Test for updateGuest ---
  describe('updateGuest', () => {
    const guestId = 1;
    const existingGuest = { id: guestId, first_name: 'Old', last_name: 'Name', email: 'old@example.com', phone_number: '111', role: guestRole };
    const guestDataToUpdate = { first_name: 'UpdatedApiTestViaRoute', phone_number: '111222333' };
    // This data includes role, which should be ignored by updateGuest
    const guestDataWithRoleUpdateAttempt = { ...guestDataToUpdate, role: 'admin', username: 'newuser' };
    const successfullyUpdatedGuest = { ...existingGuest, ...guestDataToUpdate };


    beforeEach(() => {
      // For updateGuest, the first call is usually getGuestById, then updateUser, then getGuestById again.
      // We need to mock findUserById for these getGuestById calls.
      mockUserRepository.findUserById
        .mockResolvedValueOnce(existingGuest) // For the initial check within updateGuest (via this.getGuestById)
        .mockResolvedValueOnce(successfullyUpdatedGuest); // For the final re-fetch
    });

    it('should update a guest successfully with allowed fields', async () => {
      mockUserRepository.updateUser.mockResolvedValue([1]); // Simulate 1 row updated

      const result = await guestService.updateGuest(guestId, guestDataToUpdate);

      expect(mockUserRepository.findUserById).toHaveBeenCalledWith(guestId); // Called twice
      expect(mockUserRepository.updateUser).toHaveBeenCalledWith(guestId, guestDataToUpdate); // Only allowed fields
      expect(result).toEqual(successfullyUpdatedGuest);
    });

    it('should ignore role, username, and password fields during update', async () => {
      mockUserRepository.updateUser.mockResolvedValue([1]);
      // Reset findUserById mocks specifically for this test if its behavior needs to be different
      mockUserRepository.findUserById.mockReset();
      mockUserRepository.findUserById
        .mockResolvedValueOnce(existingGuest)
        .mockResolvedValueOnce({ ...existingGuest, first_name: guestDataWithRoleUpdateAttempt.first_name, phone_number: guestDataWithRoleUpdateAttempt.phone_number }); // simulate only allowed fields updated

      await guestService.updateGuest(guestId, guestDataWithRoleUpdateAttempt);

      // The crucial check: updateUser should be called WITHOUT role, username, password
      const expectedUpdatesPayload = {
        first_name: guestDataWithRoleUpdateAttempt.first_name,
        phone_number: guestDataWithRoleUpdateAttempt.phone_number,
        // email would be included if present in guestDataWithRoleUpdateAttempt and valid
      };
      // If guestDataWithRoleUpdateAttempt also contained email, it should be here:
      // if (guestDataWithRoleUpdateAttempt.email) {
      //  expectedUpdatesPayload.email = guestDataWithRoleUpdateAttempt.email;
      // }

      expect(mockUserRepository.updateUser).toHaveBeenCalledWith(guestId, expectedUpdatesPayload);
    });

    it('should throw an error for invalid email format during update', async () => {
      // Reset findUserById for this specific path, as it's called inside updateGuest
      mockUserRepository.findUserById.mockReset();
      mockUserRepository.findUserById.mockResolvedValue(existingGuest); // For the initial check

      const invalidEmailUpdate = { email: 'invalid-email-format' };
      await expect(guestService.updateGuest(guestId, invalidEmailUpdate))
        .rejects
        .toThrow('Invalid email format');
      expect(mockUserRepository.updateUser).not.toHaveBeenCalled();
    });

    it('should throw "Guest not found" if the guest to update does not exist or is not a guest', async () => {
      // Reset and setup findUserById to simulate guest not found for the *first* call in updateGuest
      mockUserRepository.findUserById.mockReset();
      mockUserRepository.findUserById.mockResolvedValue(null); // Or a non-guest user

      await expect(guestService.updateGuest(guestId, guestDataToUpdate))
        .rejects
        .toThrow('Guest not found'); // This error comes from this.getGuestById()
      expect(mockUserRepository.updateUser).not.toHaveBeenCalled();
    });

    it('should re-fetch and return the guest even if updateUser reports 0 rows affected (e.g. data was the same)', async () => {
      mockUserRepository.findUserById.mockReset();
      mockUserRepository.findUserById
        .mockResolvedValueOnce(existingGuest)     // First call for initial check
        .mockResolvedValueOnce(existingGuest);    // Second call to re-fetch (data unchanged)

      mockUserRepository.updateUser.mockResolvedValue([0]); // Simulate 0 rows updated

      const result = await guestService.updateGuest(guestId, { first_name: existingGuest.first_name }); // Update with same data

      expect(mockUserRepository.updateUser).toHaveBeenCalledWith(guestId, { first_name: existingGuest.first_name });
      expect(result).toEqual(existingGuest); // Should still return the (unchanged) guest
    });
  });
});