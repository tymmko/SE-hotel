// src/services/__tests__/userService.test.js

const UserService = require('../userService'); // Adjust path as needed
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mock dependencies
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const mockUserRepository = {
  findUserByEmail: jest.fn(),
  findUserByUsername: jest.fn(),
  createUser: jest.fn(),
  // No updateUser needed for register/login tests here
};

describe('UserService', () => {
  let userService;
  let originalProcessEnv;

  beforeAll(() => {
    // Store original process.env
    originalProcessEnv = { ...process.env };
  });

  beforeEach(() => {
    jest.clearAllMocks();
    userService = new UserService(mockUserRepository);
    // Ensure JWT_SECRET is set for tests that need it
    process.env.JWT_SECRET = 'testsecret';
  });

  afterAll(() => {
    // Restore original process.env
    process.env = originalProcessEnv;
  });


  // --- Tests for register ---
  describe('register', () => {
    const userData = {
      username: 'newadmin',
      email: 'admin@example.com',
      password: 'password123',
      first_name: 'Admin',
      last_name: 'User',
      phone_number: '123456789',
    };
    const createdAdminUser = {
      id: 1,
      username: userData.username,
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      phone_number: userData.phone_number,
      role: 'admin', // Service sets this
      // password should not be returned
    };

    it('should register a new admin user successfully', async () => {
      mockUserRepository.findUserByEmail.mockResolvedValue(null);
      mockUserRepository.findUserByUsername.mockResolvedValue(null);
      mockUserRepository.createUser.mockResolvedValue(createdAdminUser);

      const result = await userService.register(userData);

      expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith(userData.email);
      expect(mockUserRepository.findUserByUsername).toHaveBeenCalledWith(userData.username);
      expect(mockUserRepository.createUser).toHaveBeenCalledWith({
        ...userData,
        role: 'admin',
      });
      expect(result).toEqual(createdAdminUser);
    });

    it.each([
      [{ email: 'e@e.com', password: 'p' }, 'Username, email, and password are required'], // Missing username
      [{ username: 'u', password: 'p' }, 'Username, email, and password are required'], // Missing email
      [{ username: 'u', email: 'e@e.com' }, 'Username, email, and password are required'], // Missing password
    ])('should throw an error if required fields are missing (%s)', async (invalidData, errorMessage) => {
      const fullInvalidData = {
        username: invalidData.username,
        email: invalidData.email,
        password: invalidData.password,
        first_name: 'Test', // include other fields to isolate missing ones
        last_name: 'User',
        phone_number: '123'
      };
      await expect(userService.register(fullInvalidData))
        .rejects
        .toThrow(errorMessage);
    });

    it('should throw an error if email already exists', async () => {
      mockUserRepository.findUserByEmail.mockResolvedValue({ id: 2, email: userData.email }); // Email exists
      mockUserRepository.findUserByUsername.mockResolvedValue(null);

      await expect(userService.register(userData))
        .rejects
        .toThrow('User already exists (email conflict)');
      expect(mockUserRepository.createUser).not.toHaveBeenCalled();
    });

    it('should throw an error if username already exists', async () => {
      mockUserRepository.findUserByEmail.mockResolvedValue(null);
      mockUserRepository.findUserByUsername.mockResolvedValue({ id: 3, username: userData.username }); // Username exists

      await expect(userService.register(userData))
        .rejects
        .toThrow('User already exists (username conflict)');
      expect(mockUserRepository.createUser).not.toHaveBeenCalled();
    });
  });

  // --- Tests for login ---
  describe('login', () => {
    const loginCredentials = { username: 'testuser', password: 'password123' };
    const mockUserFromDb = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedPassword123', // This is the hashed password from DB
      role: 'admin',
    };
    const tokenPayload = { id: mockUserFromDb.id, username: mockUserFromDb.username, email: mockUserFromDb.email, role: mockUserFromDb.role };
    const mockToken = 'mocked.jwt.token';

    it('should login successfully with valid credentials', async () => {
      mockUserRepository.findUserByUsername.mockResolvedValue(mockUserFromDb);
      bcrypt.compare.mockResolvedValue(true); // Password matches
      jwt.sign.mockReturnValue(mockToken);

      const result = await userService.login(loginCredentials);

      expect(mockUserRepository.findUserByUsername).toHaveBeenCalledWith(loginCredentials.username); // Service asks for password if includePassword:true
      expect(bcrypt.compare).toHaveBeenCalledWith(loginCredentials.password, mockUserFromDb.password);
      expect(jwt.sign).toHaveBeenCalledWith(tokenPayload, 'testsecret', { expiresIn: '1h' });
      expect(result).toEqual({ token: mockToken, user: tokenPayload });
    });

    it('should throw "Invalid username or password" if user not found', async () => {
      mockUserRepository.findUserByUsername.mockResolvedValue(null);

      await expect(userService.login(loginCredentials))
        .rejects
        .toThrow('Invalid username or password');
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it('should throw "Invalid username or password" if user exists but password is not set', async () => {
      const userWithoutPassword = { ...mockUserFromDb, password: null };
      mockUserRepository.findUserByUsername.mockResolvedValue(userWithoutPassword);

      await expect(userService.login(loginCredentials))
        .rejects
        .toThrow('Invalid username or password (account not configured for password login).');
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });


    it('should throw "Invalid username or password" if password does not match', async () => {
      mockUserRepository.findUserByUsername.mockResolvedValue(mockUserFromDb);
      bcrypt.compare.mockResolvedValue(false); // Password does not match

      await expect(userService.login(loginCredentials))
        .rejects
        .toThrow('Invalid username or password');
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it('should throw "Authentication system configuration error" if JWT_SECRET is not defined', async () => {
      process.env.JWT_SECRET = ''; // Simulate undefined or empty secret
      mockUserRepository.findUserByUsername.mockResolvedValue(mockUserFromDb);
      bcrypt.compare.mockResolvedValue(true);

      // Temporarily spy on console.error to suppress it during this specific test if desired
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await expect(userService.login(loginCredentials))
        .rejects
        .toThrow('Authentication system configuration error.');

      consoleErrorSpy.mockRestore(); // Restore console.error
      expect(jwt.sign).not.toHaveBeenCalled(); // jwt.sign should not be called if secret is missing
    });
  });
});