// src/services/common/baseService.js

/**
 * Base Service class that provides common functionality
 * Implements the Service Layer Pattern for business logic
 */
class BaseService {
  /**
   * @param {Object} repository - Data repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Get all records
   * @param {Object} options - Query options
   * @returns {Promise<Array>} List of records
   */
  async getAll(options = {}) {
    return await this.repository.findAll(options);
  }

  /**
   * Get one record by ID
   * @param {number|string} id - Record ID
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Found record
   * @throws {Error} If record not found
   */
  async getById(id, options = {}) {
    const record = await this.repository.findById(id, options);
    if (!record) {
      throw new Error('Record not found');
    }
    return record;
  }

  /**
   * Create a new record
   * @param {Object} data - Data to create
   * @returns {Promise<Object>} Created record
   */
  async create(data) {
    return await this.repository.create(data);
  }

  /**
   * Update an existing record
   * @param {number|string} id - Record ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>} Updated record
   * @throws {Error} If record not found
   */
  async update(id, data) {
    const [updated] = await this.repository.update(data, { id });
    
    if (updated === 0) {
      throw new Error('Record not found');
    }
    
    return await this.getById(id);
  }

  /**
   * Delete a record
   * @param {number|string} id - Record ID
   * @returns {Promise<boolean>} Deletion success
   * @throws {Error} If record not found
   */
  async delete(id) {
    const deleted = await this.repository.delete({ id });
    
    if (deleted === 0) {
      throw new Error('Record not found');
    }
    
    return true;
  }
}

module.exports = BaseService;