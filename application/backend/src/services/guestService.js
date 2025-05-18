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
    const guest = await this.repository.findUserById(guestId, { // Assuming UserRepository has findUserById
        // No need to pass role here if findUserById doesn't support it,
        // but then we must check the role on the returned user.
        // For simplicity, assume findUserById is generic.
        // attributes: { exclude: ['password'] } // findUserById in unified repo should handle this
    });
    
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
  const {
      role,          // Extracted from input, but not used to change the role
      username,
      password,
      first_name,
      last_name,
      phone_number,
      email,
      ...allowedUpdates // Contains properties from guestDataClone not explicitly destructured
  } = guestDataClone;

  // Note: The `allowedUpdates` will correctly contain only the fields
  // that are in guestData but not in the list of explicitly destructured ones.
  // For your input: { "first_name": "UpdatedApiTestViaRoute", "phone_number": "111222333", "role": "admin" }
  // `allowedUpdates` will be an empty object {} because all keys are destructured.
  // If guestData had other fields, they would be in allowedUpdates.

  // Ensure `updateUser` is called correctly and its return (a number) is handled.
  const updatedCount = await this.repository.updateUser(guestId, allowedUpdates);

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