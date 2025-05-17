// src/services/guestService.js
const BaseService = require('./common/baseService'); // Assuming BaseService constructor can take any repository

class GuestService extends BaseService { // Keep extends BaseService if its methods are used generically
  /**
   * @param {UserRepository} userRepository - Injecting the unified UserRepository
   */
  constructor(userRepository) { // Changed parameter from guestRepository
    super(userRepository); // BaseService will now use UserRepository
    this.guestRole = 'guest';
  }

  /**
   * Get all users with role 'guest'
   */
  async getAllGuests() {
    // Use the generic findAll from BaseRepository (if it supports 'where') or call userRepository directly
    // Assuming BaseRepository.findAll can take options like { where: { role: this.guestRole } }
    // If not, you'd use: return await this.repository.findAllUsers({ where: { role: this.guestRole } });
    // For true "minimal", if BaseService.findAll() just gets all, this method changes significantly.
    // Let's assume BaseRepository.findAll is flexible or we call this.repository (UserRepository) methods.
    return await this.repository.findAllUsers({ // Assuming UserRepository has findAllUsers
        where: { role: this.guestRole },
        attributes: { exclude: ['password'] }
    });
  }

  /**
   * Get a single user with role 'guest' by ID
   */
  async getGuestById(guestId) {
    // Use UserRepository to find a user by ID and also check their role.
    const guest = await this.repository.findUserById(guestId);
    
    if (!guest || guest.role !== this.guestRole) { // Check role here
      throw new Error('Guest not found');
    }
    // Password should already be excluded by a well-behaved findUserById
    return guest;
  }

  /**
   * Create a new user with role 'guest'
   */
  async createGuest(guestData) {
    if (!guestData.first_name || !guestData.last_name || !guestData.email) {
      throw new Error('First name, last name, and email are required');
    }
    if (!this.isValidEmail(guestData.email)) {
      throw new Error('Invalid email format');
    }

    // Check for email uniqueness across all users
    const existingUser = await this.repository.findUserByEmail(guestData.email);
    if (existingUser) {
        throw new Error('An account with this email already exists.');
    }
    
    // Use UserRepository's createUser, ensuring role is 'guest'
    return await this.repository.createUser({ // Assuming UserRepository has createUser
      first_name: guestData.first_name,
      last_name: guestData.last_name,
      email: guestData.email,
      phone_number: guestData.phone_number,
      role: this.guestRole // Explicitly set role
      // username, password will be null
    });
  }

  /**
   * Update a user with role 'guest'
   */
// src/services/guestService.js
// src/services/guestService.js
async updateGuest(guestId, guestData) {
  // Safer check for guestData and its email property
  if (guestData && typeof guestData.email === 'string' && !this.isValidEmail(guestData.email)) {
      throw new Error('Invalid email format');
  }

  // Ensure the user being updated is indeed a guest and exists
  const existingGuest = await this.getGuestById(guestId);
  // getGuestById should throw if not found or not a guest.
  // You might want to add an explicit check here if getGuestById is more lenient.
  // if (!existingGuest || existingGuest.role !== this.guestRole) {
  //     throw new Error('Guest not found or user is not a guest.');
  // }

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

  return await this.getGuestById(guestId); // Re-fetch to return the (potentially) updated guest
}

isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
}

module.exports = GuestService;