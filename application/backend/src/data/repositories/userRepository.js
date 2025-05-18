/**
 * Repository for managing user-related data operations
 * Extends BaseRepository to provide user-specific data access methods
 */
class UserRepository extends BaseRepository {
  /**
   * @param {Object} models - Sequelize models
   * @throws {Error} If User model is not defined or missing required methods
   */
  constructor(models) {
    if (!models.User) {
      throw new Error('User model is not defined in models');
    }
    super(models.User);
    this.models = models;
    if (!this.model.findOne) {
      throw new Error('User model is missing findOne method, possibly due to Sequelize initialization failure');
    }
  }

  /**
   * Create a new user
   * @param {Object} userData - User data
   * @param {string} userData.username - Username
   * @param {string} userData.email - Email address
   * @param {string} [userData.password] - Password (hashed by model hook)
   * @param {string} [userData.first_name] - First name
   * @param {string} [userData.last_name] - Last name
   * @param {string} [userData.phone_number] - Phone number
   * @param {string} [userData.role] - Role (defaults to 'guest')
   * @returns {Promise<Object>} Created user (without password)
   * @throws {Error} If creation fails or constraints are violated
   */
  async createUser({ username, email, password, first_name, last_name, phone_number, role }) {
    try {
      const userData = {
        username,
        email,
        first_name,
        last_name,
        phone_number,
        role: role || 'guest',
        created_at: new Date(),
      };
      if (password) {
        userData.password = password;
      }

      const user = await this.model.create(userData);
      const userObject = user.get({ plain: true });
      delete userObject.password;
      return userObject;

    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        const field = error.errors[0].path;
        throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`);
      }
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  /**
   * Find a user by email
   * @param {string} email - Email address
   * @returns {Promise<Object|null>} User data (without password) or null
   * @throws {Error} If an error occurs during the query
   */
  async findUserByEmail(email) {
    try {
      const user = await this.model.findOne({ where: { email }, raw: true });
      if (user) delete user.password;
      return user || null;
    } catch (error) {
      throw new Error(`Failed to find user by email: ${error.message}`);
    }
  }

  /**
   * Find a user by username
   * @param {string} username - Username
   * @returns {Promise<Object|null>} User data or null
   * @throws {Error} If an error occurs during the query
   */
  async findUserByUsername(username) {
    try {
      const user = await this.model.findOne({ where: { username } });
      return user || null;
    } catch (error) {
      throw new Error(`Failed to find user by username: ${error.message}`);
    }
  }

  /**
   * Find a user by ID
   * @param {number|string} userId - User ID
   * @returns {Promise<Object|null>} User data (without password) or null
   * @throws {Error} If an error occurs during the query
   */
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

  /**
   * Find all users with optional filtering
   * @param {Object} [options={}] - Query options
   * @returns {Promise<Array>} List of users (without passwords)
   * @throws {Error} If an error occurs during the query
   */
  async findAllUsers(options = {}) {
    try {
      return await this.model.findAll({ ...options, attributes: { exclude: ['password'] }, raw: true });
    } catch (error) {
      console.error('Error in findAllUsers:', error);
      throw error;
    }
  }

  /**
   * Update a user
   * @param {number|string} userId - User ID
   * @param {Object} userData - Data to update
   * @returns {Promise<number>} Number of updated rows
   * @throws {Error} If an error occurs during the update
   */
  async updateUser(userId, userData) {
    try {
      const [updatedCount] = await this.model.update(userData, {
        where: { id: userId },
        individualHooks: true
      });
      return updatedCount;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  /**
   * Check if a user has active reservations
   * @param {number|string} userId - User ID
   * @returns {Promise<boolean>} True if the user has active reservations
   * @throws {Error} If an error occurs during the query
   */
  async hasActiveReservations(userId) {
    try {
      const count = await this.models.Reservation.count({
        where: {
          user_id: userId,
          status: { [Op.in]: ['confirmed', 'checked-in'] }
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