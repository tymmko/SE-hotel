/**
 * Base Repository class providing common CRUD operations
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
   * @param {Object} [options={}] - Query options (where, include, order, etc.)
   * @returns {Promise<Array>} List of records
   * @throws {Error} If an error occurs during the query
   */
  async findAll(options = {}) {
    return await this.model.findAll(options);
  }

  /**
   * Find one record by primary key
   * @param {number|string} id - Primary key value
   * @param {Object} [options={}] - Query options (include, attributes, etc.)
   * @returns {Promise<Object|null>} Found record or null
   * @throws {Error} If an error occurs during the query
   */
  async findById(id, options = {}) {
    return await this.model.findByPk(id, options);
  }

  /**
   * Find one record by specific criteria
   * @param {Object} criteria - Where conditions
   * @param {Object} [options={}] - Additional query options
   * @returns {Promise<Object|null>} Found record or null
   * @throws {Error} If an error occurs during the query
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
   * @param {Object} [options={}] - Create options
   * @returns {Promise<Object>} Created record
   * @throws {Error} If an error occurs during creation
   */
  async create(data, options = {}) {
    return await this.model.create(data, options);
  }

  /**
   * Update existing records
   * @param {Object} data - Data to update
   * @param {Object} criteria - Where conditions
   * @param {Object} [options={}] - Update options
   * @returns {Promise<Array>} [affectedCount, affectedRows]
   * @throws {Error} If an error occurs during the update
   */
  async update(data, criteria, options = {}) {
    return await this.model.update(data, {
      where: criteria,
      ...options,
    });
  }

  /**
   * Delete records by criteria
   * @param {Object} criteria - Where conditions
   * @param {Object} [options={}] - Delete options
   * @returns {Promise<number>} Number of deleted rows
   * @throws {Error} If an error occurs during deletion
   */
  async delete(criteria, options = {}) {
    return await this.model.destroy({
      where: criteria,
      ...options,
    });
  }

  /**
   * Count records by criteria
   * @param {Object} [criteria={}] - Where conditions
   * @param {Object} [options={}] - Count options
   * @returns {Promise<number>} Number of records
   * @throws {Error} If an error occurs during the count
   */
  async count(criteria = {}, options = {}) {
    return await this.model.count({
      where: criteria,
      ...options,
    });
  }

  /**
   * Execute a transaction
   * @param {Function} callback - Function to execute within the transaction
   * @returns {Promise<any>} Transaction result
   * @throws {Error} If an error occurs during the transaction
   */
  async transaction(callback) {
    return await this.model.sequelize.transaction(callback);
  }
}

module.exports = BaseRepository;