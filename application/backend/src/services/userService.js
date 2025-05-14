// const bcrypt = require('bcrypt'); // Password comparison now in model
const jwt = require('jsonwebtoken');
const BaseService = require('./common/baseService');

class UserService extends BaseService {
  constructor(userRepository) {
    super(userRepository); // Pass userRepository to BaseService
  }

  async register({ username, email, password, first_name, last_name, phone_number, role }) {
    if (!email) { // Email is a minimum requirement
      throw new Error('Email is required');
    }
    if (role === 'admin' && !password) { // Admin role should have a password for login
        throw new Error('Password is required for admin registration');
    }
    if (username && password) { // Standard user registration
        if (!username) throw new Error('Username is required for standard registration');
    } else if (first_name && last_name) { // Guest-like user creation
        // For guest-like users, username and password are not required upfront
    } else if (!password) { // If it's not a guest creation and no password
        // This case might indicate an attempt to create a non-guest user without a password
        // or a guest user without first/last name, depending on your exact logic.
        // Let's assume for now if no password, and no first/last name, it's an incomplete request.
        if (!first_name || !last_name) {
            throw new Error('Username and password, or first name and last name are required.');
        }
    }


    // Check if user already exists by email (or username if provided)
    let existingUser = await this.repository.findUserByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    if (username) {
      existingUser = await this.repository.findUserByUsername(username);
      if (existingUser) {
        throw new Error('User with this username already exists');
      }
    }

    const userObject = await this.repository.createUser({
      username,
      email,
      password, // Will be hashed by model hook if present
      first_name,
      last_name,
      phone_number,
      role: role || 'guest' // Default to guest if role not specified
    });
    
    // Don't return password hash
    delete userObject.password;
    return userObject;
  }

  async login({ username, password }) {
    if (!username || !password) {
      throw new Error('Username and password are required');
    }
    const user = await this.repository.findUserByUsername(username); // Fetches user with password
    
    if (!user || !user.password) { // User not found or user is a guest without a password
      throw new Error('Invalid username or password');
    }

    const isPasswordValid = await user.isValidPassword(password); // Use model's method
    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, role: user.role }, // Include email in token
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    // Return user details without password
    const userDetails = user.get({ plain: true });
    delete userDetails.password;

    return { token, user: userDetails };
  }

  async getAllUsers(options = {}) {
    // Optionally filter by role, e.g., options.where = { role: 'guest' }
    return await this.repository.findAllUsers(options);
  }

  async getUserById(userId) {
    const user = await this.repository.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    // Password already excluded by repository
    return user;
  }

  async createUserAsGuest(guestData) {
    if (!guestData.first_name || !guestData.last_name || !guestData.email) {
      throw new Error('First name, last name, and email are required for guest creation');
    }
    if (!this.isValidEmail(guestData.email)) {
      throw new Error('Invalid email format');
    }

    let existingUser = await this.repository.findUserByEmail(guestData.email);
    if (existingUser) {
      // Decide on behavior: error, or return existing guest-user?
      // For now, let's throw an error to prevent duplicate guest profiles via this specific endpoint.
      // Or, you might want to update the existing guest user if found.
      throw new Error('User with this email already exists. If this is you, please try logging in or use a different email.');
    }
    
    return await this.repository.createUser({
        email: guestData.email,
        first_name: guestData.first_name,
        last_name: guestData.last_name,
        phone_number: guestData.phone_number,
        role: 'guest', // Explicitly set role
        // No username or password for guest creation through this method
    });
  }
  
  async updateUser(userId, userData) {
    // Ensure critical fields like role or password (if changed) are handled with care
    // For example, you might want specific checks if 'role' is being changed.
    if (userData.email && !this.isValidEmail(userData.email)) {
      throw new Error('Invalid email format');
    }

    const userToUpdate = await this.repository.findUserById(userId);
    if (!userToUpdate) {
        throw new Error('User not found');
    }

    // Prevent changing username if it's already set and userData.username is different
    // Or allow it based on your rules. For now, let's assume username is fixed after creation if set.
    if (userToUpdate.username && userData.username && userToUpdate.username !== userData.username) {
        throw new Error('Username cannot be changed.');
    }


    const updatedCount = await this.repository.updateUser(userId, userData);
    if (updatedCount === 0) {
      throw new Error('User not found or no changes made');
    }
    
    const updatedUser = await this.repository.findUserById(userId);
    // Password already excluded by repository
    return updatedUser;
  }
  
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

module.exports = UserService;