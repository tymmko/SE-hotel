// src/data/common/baseRepository.js

/**
 * Base Repository class that provides common CRUD operations
 * Follows the Repository Pattern to abstract data access
 */
class BaseRepository {
    /**
     * @param {Object} model - Sequelize model
     */
    constructor(model) {
      this.model = model;
    }
  
    /**
     * Find all records with optional filtering
     * @param {Object} options - Query options (where, include, order, etc.)
     * @returns {Promise<Array>} List of records
     */
    async findAll(options = {}) {
      return await this.model.findAll(options);
    }
  
    /**
     * Find one record by primary key
     * @param {number|string} id - Primary key value
     * @param {Object} options - Query options (include, attributes, etc.)
     * @returns {Promise<Object>} Found record or null
     */
    async findById(id, options = {}) {
      return await this.model.findByPk(id, options);
    }
  
    /**
     * Find one record by specific criteria
     * @param {Object} criteria - Where conditions
     * @param {Object} options - Additional options
     * @returns {Promise<Object>} Found record or null
     */
    async findOne(criteria, options = {}) {
      return await this.model.findOne({
        where: criteria,
        ...options,
      });
    }
  
    /**
     * Create a new record
     * @param {Object} data - Data to create
     * @param {Object} options - Create options
     * @returns {Promise<Object>} Created record
     */
    async create(data, options = {}) {
      return await this.model.create(data, options);
    }
  
    /**
     * Update an existing record
     * @param {Object} data - Data to update
     * @param {Object} criteria - Where conditions
     * @param {Object} options - Update options
     * @returns {Promise<Array>} [affectedCount, affectedRows]
     */
    async update(data, criteria, options = {}) {
      return await this.model.update(data, {
        where: criteria,
        ...options,
      });
    }
  
    /**
     * Delete record(s) by criteria
     * @param {Object} criteria - Where conditions
     * @param {Object} options - Delete options
     * @returns {Promise<number>} Number of deleted rows
     */
    async delete(criteria, options = {}) {
      return await this.model.destroy({
        where: criteria,
        ...options,
      });
    }
  
    /**
     * Count records by criteria
     * @param {Object} criteria - Where conditions
     * @param {Object} options - Count options
     * @returns {Promise<number>} Count of records
     */
    async count(criteria = {}, options = {}) {
      return await this.model.count({
        where: criteria,
        ...options,
      });
    }
  
    /**
     * Execute a transaction
     * @param {Function} callback - Function to execute in transaction
     * @returns {Promise<any>} Transaction result
     */
    async transaction(callback) {
      return await this.model.sequelize.transaction(callback);
    }
  }
  
  module.exports = BaseRepository;