const bcrypt = require('bcrypt'); // bcrypt is used in the model now, but kept here if direct password ops are needed
const { Op } = require('sequelize');
const BaseRepository = require('./common/baseRepository');

class UserRepository extends BaseRepository {
  constructor(models) {
    if (!models.User) {
      throw new Error('User model is not defined in models');
    }
    super(models.User); // Pass the User model to BaseRepository
    this.models = models;
    if (!this.model.findOne) { // Check 'this.model' which is 'models.User'
      throw new Error('User model is missing findOne method, possibly due to Sequelize initialization failure');
    }
  }

  async createUser({ username, email, password, first_name, last_name, phone_number, role }) {
    try {
      // Password hashing is handled by the model's hook if password is provided
      const userData = {
        username,
        email,
        first_name,
        last_name,
        phone_number,
        role: role || 'guest', // Default to 'guest' if not specified
        created_at: new Date(),
      };
      if (password) {
        userData.password = password; // Hook will hash it
      }

      const user = await this.model.create(userData);
      // Return a plain object, exclude password
      const userObject = user.get({ plain: true });
      delete userObject.password;
      return userObject;

    } catch (error) {
      // Check for unique constraint errors for email/username
      if (error.name === 'SequelizeUniqueConstraintError') {
        const field = error.errors[0].path;
        throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`);
      }
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await this.model.findOne({ where: { email }, raw: true });
      if (user) delete user.password;
      return user || null;
    } catch (error) {
      throw new Error(`Failed to find user by email: ${error.message}`);
    }
  }

  async findUserByUsername(username) {
    try {
      // Make sure to select password here if it's needed for login comparison in service layer
      const user = await this.model.findOne({ where: { username } }); // Not raw, to use instance methods like isValidPassword
      return user || null; // The service layer will handle password comparison using user.isValidPassword
    } catch (error) {
      throw new Error(`Failed to find user by username: ${error.message}`);
    }
  }

  async findUserById(userId) {
    try {
      const user = await this.model.findByPk(userId, { raw: true });
      if (user) delete user.password;
      return user;
    } catch (error) {
      console.error('Error in findUserById:', error);
      throw error;
    }
  }

  async findAllUsers(options = {}) {
    try {
      // Ensure password is not returned in lists
      const users = await this.model.findAll({ ...options, attributes: { exclude: ['password'] }, raw: true });
      return users;
    } catch (error) {
      console.error('Error in findAllUsers:', error);
      throw error;
    }
  }
  
  async updateUser(userId, userData) {
    try {
      const [updatedCount] = await this.model.update(userData, {
        where: { id: userId },
        individualHooks: true // To trigger beforeUpdate hook for password hashing if password changes
      });
      return updatedCount;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }


  async hasActiveReservations(userId) {
    try {
      const count = await this.models.Reservation.count({
        where: {
          user_id: userId, // Changed from guest_id
          status: { [Op.in]: ['confirmed', 'checked-in'] } // Consider what "active" means
        }
      });
      return count > 0;
    } catch (error) {
      console.error('Error in hasActiveReservations:', error);
      throw error;
    }
  }
}

module.exports = UserRepository;