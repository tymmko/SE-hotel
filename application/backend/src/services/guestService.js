/**
 * Service for managing guest-related business logic
 * Extends BaseService to provide guest-specific operations using UserRepository
 */
class GuestService extends BaseService {
  /**
   * @param {UserRepository} userRepository - Repository for user data
   */
  constructor(userRepository) {
    super(userRepository);
    this.guestRole = 'guest';
  }

  /**
   * Retrieve all users with the 'guest' role
   * @returns {Promise<Array>} List of guest users
   */
  async getAllGuests() {
    return await this.repository.findAllUsers({
      where: { role: this.guestRole },
      attributes: { exclude: ['password'] }
    });
  }

  /**
   * Retrieve a single guest user by ID
   * @param {number|string} guestId - Guest user ID
   * @returns {Promise<Object>} Guest user
   * @throws {Error} If guest is not found or user is not a guest
   */
  async getGuestById(guestId) {
    const guest = await this.repository.findUserById(guestId);
    if (!guest || guest.role !== this.guestRole) {
      throw new Error('Guest not found');
    }
    return guest;
  }

  /**
   * Create a new guest user
   * @param {Object} guestData - Guest data
   * @param {string} guestData.first_name - First name
   * @param {string} guestData.last_name - Last name
   * @param {string} guestData.email - Email address
   * @param {string} [guestData.phone_number] - Phone number
   * @returns {Promise<Object>} Created guest user
   * @throws {Error} If required fields are missing, email is invalid, or email is already in use
   */
  async createGuest(guestData) {
    if (!guestData.first_name || !guestData.last_name || !guestData.email) {
      throw new Error('First name, last name, and email are required');
    }
    if (!this.isValidEmail(guestData.email)) {
      throw new Error('Invalid email format');
    }

    const existingUser = await this.repository.findUserByEmail(guestData.email);
    if (existingUser) {
      throw new Error('An account with this email already exists.');
    }
    
    return await this.repository.createUser({
      first_name: guestData.first_name,
      last_name: guestData.last_name,
      email: guestData.email,
      phone_number: guestData.phone_number,
      role: this.guestRole
    });
  }

  /**
   * Update an existing guest user
   * @param {number|string} guestId - Guest user ID
   * @param {Object} guestData - Data to update
   * @param {string} [guestData.first_name] - First name
   * @param {string} [guestData.last_name] - Last name
   * @param {string} [guestData.email] - Email address
   * @param {string} [guestData.phone_number] - Phone number
   * @returns {Promise<Object>} Updated guest user
   * @throws {Error} If guest is not found or email is invalid
   */
  async updateGuest(guestId, guestData) {
    if (guestData && typeof guestData.email === 'string' && !this.isValidEmail(guestData.email)) {
      throw new Error('Invalid email format');
    }

    await this.getGuestById(guestId);

    const guestDataClone = { ...guestData };
    const {
      role,
      username,
      password,
      first_name,
      last_name,
      phone_number,
      email,
      ...allowedUpdates
    } = guestDataClone;

    const updatedCount = await this.repository.updateUser(guestId, allowedUpdates);

    if (updatedCount === 0) {
      console.log(`[GuestService.updateGuest] No rows updated for guestId: ${guestId}. Data might be the same.`);
    }

    return await this.getGuestById(guestId);
  }

  /**
   * Validate an email address
   * @param {string} email - Email address to validate
   * @returns {boolean} True if email is valid
   * @private
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

module.exports = GuestService;