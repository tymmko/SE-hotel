// src/services/guestService.js
const BaseService = require('./common/baseService');

/**
 * Service for Guest-related business logic
 * Implements business rules for guest management
 */
class GuestService extends BaseService {
  /**
   * @param {GuestRepository} guestRepository - Repository for guest data
   */
  constructor(guestRepository) {
    super(guestRepository);
  }

  /**
   * Get all guests with details
   * @returns {Promise<Array>} List of guests with details
   */
  async getAllGuestsWithDetails() {
    return await this.repository.findGuestsWithDetails();
  }

  /**
   * Get a single guest with details
   * @param {number} guestId - Guest ID
   * @returns {Promise<Object>} Guest with details
   * @throws {Error} If guest not found
   */
  async getGuestWithDetails(guestId) {
    const guest = await this.repository.findGuestWithDetails(guestId);
    
    if (!guest) {
      throw new Error('Guest not found');
    }
    
    return guest;
  }

  /**
   * Get a guest with reservation history
   * @param {number} guestId - Guest ID
   * @returns {Promise<Object>} Guest with reservations
   * @throws {Error} If guest not found
   */
  async getGuestWithReservations(guestId) {
    const guest = await this.repository.findGuestWithReservations(guestId);
    
    if (!guest) {
      throw new Error('Guest not found');
    }
    
    return guest;
  }

  /**
   * Update guest status (Active, Inactive)
   * @param {number} guestId - Guest ID
   * @param {string} status - New status
   * @returns {Promise<Object>} Updated guest
   * @throws {Error} If status is invalid or guest not found
   */
  async updateGuestStatus(guestId, status) {
    // Validate status
    const validStatuses = ['Active', 'Inactive'];
    
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }
    
    // Apply business rule: cannot mark guest as Inactive if they have active reservations
    if (status === 'Inactive') {
      const hasActiveReservations = await this.repository.hasActiveReservations(guestId);
      
      if (hasActiveReservations) {
        throw new Error('Cannot mark guest as Inactive when they have active reservations');
      }
    }
    
    // Update guest status
    const [updated] = await this.repository.updateGuestStatus(guestId, status);
    
    if (updated === 0) {
      throw new Error('Guest not found');
    }
    
    return await this.getGuestWithDetails(guestId);
  }

  /**
   * Create a new guest
   * @param {Object} guestData - Guest data
   * @returns {Promise<Object>} Created guest
   */
  async createGuest(guestData) {
    // Set default status if not provided
    if (!guestData.status) {
      guestData.status = 'Active';
    }
    
    // Validate email format
    if (guestData.email && !this.isValidEmail(guestData.email)) {
      throw new Error('Invalid email format');
    }
    
    // Create the guest
    return await this.repository.create(guestData);
  }

  /**
   * Update a guest
   * @param {number} guestId - Guest ID
   * @param {Object} guestData - Updated guest data
   * @returns {Promise<Object>} Updated guest
   * @throws {Error} If guest not found
   */

}

module.exports = GuestService;