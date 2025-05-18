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
    // Use UserRepository to find a user by ID and also check their role.
    const guest = await this.repository.findUserById(guestId);
    
    if (!guest || guest.role !== this.guestRole) { // Check role here
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

  // Create a shallow clone of guestData. This is the key fix.
  const guestDataClone = { ...guestData };

  // Destructure from the clone
  // Destructure to check/use specific fields from guestDataClone
  const {
    first_name,
    last_name,
    phone_number,
    email
    // role, username, password are deliberately not included here for building the update payload
  } = guestDataClone;

  const updatesPayload = {};
  if (first_name !== undefined) updatesPayload.first_name = first_name;
  if (last_name !== undefined) updatesPayload.last_name = last_name;
  if (phone_number !== undefined) updatesPayload.phone_number = phone_number;
  if (email !== undefined) updatesPayload.email = email;
  // Add any other fields that are permissible for guests to update

  // Ensure we don't pass an empty object if no valid fields were in guestData
  if (Object.keys(updatesPayload).length === 0 && Object.keys(guestData).length > 0) {
    // This case means guestData had keys, but none were updatable by this logic.
    // Depending on desired behavior, you could throw an error, or proceed knowing no DB update will occur.
    // For now, we'll let it proceed; the `updateUser` mock expecting an empty object will fail if the test data actually had updatable fields.
    // The current test structure might be okay if it leads to [0] updated rows.
  }


  const updatedCount = await this.repository.updateUser(guestId, updatesPayload);

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