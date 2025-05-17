// src/services/userService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
  constructor(userRepository) { // Expects the unified UserRepository
    this.userRepository = userRepository;
  }

  async register({ username, email, password, first_name, last_name, phone_number }) { // Added optional fields
    if (!username || !email || !password) {
      throw new Error('Username, email, and password are required');
    }

    // Check for existing user by email or username using the unified repository
    const existingUserByEmail = await this.userRepository.findUserByEmail(email);
    if (existingUserByEmail) {
      throw new Error('User already exists (email conflict)');
    }
    const existingUserByUsername = await this.userRepository.findUserByUsername(username);
    if (existingUserByUsername) {
      throw new Error('User already exists (username conflict)');
    }

    // As per your clarification, /register creates an 'admin' user.
    // The User model will handle password hashing via its hook.
    const user = await this.userRepository.createUser({
      username,
      email,
      password,
      first_name, // Pass along if UserController sends them
      last_name,
      phone_number,
      role: 'admin' // Explicitly set role to 'admin'
    });

    // The createUser in the unified repository should return the user object (excluding password).
    // The response structure here should match what your UserController expects.
    // Your original UserController's register just did res.status(201).json(user);
    // So, we return the user object as created by the repository.
    return user;
  }

  async login({ username, password }) {
    // Use findUserByUsername from unified repo, requesting password for comparison
    const user = await this.userRepository.findUserByUsername(username);
    
    if (!user) { // Handles user not found
      throw new Error('Invalid username or password');
    }
    if (!user.password) { // Handles users that might exist without a password (e.g. guests)
        throw new Error('Invalid username or password (account not configured for password login).');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables!");
      throw new Error('Authentication system configuration error.');
    }

    // User object here is a Sequelize instance, so access properties directly
    const tokenPayload = { id: user.id, username: user.username, email: user.email, role: user.role };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Return the structure your UserController expects for the login response
    return { token, user: tokenPayload };
  }
}

module.exports = UserService;