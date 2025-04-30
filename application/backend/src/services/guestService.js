// src/services/guestService.js
const BaseService = require('./common/baseService');

/**
 * Service for Guest-related business logic
 * Simplified to handle basic guest functionality
 */
class GuestService extends BaseService {
  /**
   * @param {GuestRepository} guestRepository - Repository for guest data
   */
  constructor(guestRepository) {
    super(guestRepository);
  }

  /**
   * Get all guests
   * @returns {Promise<Array>} List of all guests
   */
  async getAllGuests() {
    return await this.repository.findAllGuests();
  }

  /**
   * Get guest by ID
   * @param {number} guestId - Guest ID
   * @returns {Promise<Object>} Guest data
   * @throws {Error} If guest not found
   */
  async getGuestById(guestId) {
    const guest = await this.repository.findGuestById(guestId);
    
    if (!guest) {
      throw new Error('Guest not found');
    }
    
    return guest;
  }

  /**
   * Create a new guest
   * @param {Object} guestData - Guest data
   * @returns {Promise<Object>} Created guest
   * @throws {Error} If required fields are missing or data is invalid
   */
  async createGuest(guestData) {
    // Validate required fields
    if (!guestData.first_name || !guestData.last_name || !guestData.email) {
      throw new Error('First name, last name, and email are required');
    }
    
    // Validate email format
    if (!this.isValidEmail(guestData.email)) {
      throw new Error('Invalid email format');
    }
    
    // Create the guest
    return await this.repository.create(guestData);
  }

  /**
   * Update a guest
   * @param {number} guestId - Guest ID
   * @param {Object} guestData - Guest data to update
   * @returns {Promise<Object>} Updated guest
   * @throws {Error} If guest not found or data is invalid
   */
  async updateGuest(guestId, guestData) {
    // Validate email if provided
    if (guestData.email && !this.isValidEmail(guestData.email)) {
      throw new Error('Invalid email format');
    }
    
    // Update the guest
    const [updated] = await this.repository.update(guestData, { guest_id: guestId });
    
    if (updated === 0) {
      throw new Error('Guest not found');
    }
    
    return await this.getGuestById(guestId);
  }
  
  /**
   * Helper to validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} True if email is valid
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

module.exports = GuestService;