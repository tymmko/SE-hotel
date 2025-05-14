// src/data/repositories/equipmentRepository.js
const { Op } = require('sequelize');
const BaseRepository = require('./common/baseRepository');

class EquipmentRepository extends BaseRepository {
	/**
	 * @param {Object} models - Sequelize models
	 */
	constructor(models) {
		super(models.Equipment);
		this.models = models;
	}

	/**
	 * Find all equipment for a specific room
	 * @param {number} roomId - Room ID
	 * @param {Object} options - Additional query options
	 * @returns {Promise<Array>} List of equipment items
	 */
	async findByRoom(roomId, options = {}) {
		try {
			return await this.model.findAll({
				where: { room_id: roomId },
				order: [['name', 'ASC']],
				...options,
				raw: true
			});
		} catch (error) {
			console.error('Error in findByRoom:', error);
			throw error;
		}
	}

	async getAllEquipments() {
		return await this.model.findAll({
			attributes: ['name'],
			group: ['name'],
			raw: true,
		});
	}  

	/**
	 * Add a new equipment item to a room
	 * @param {number} roomId - Room ID
	 * @param {string} name - Equipment name
	 * @param {number} price - Equipment price
	 * @returns {Promise<Object>} Created equipment item
	 */
	async addEquipment(roomId, name, price) {
		try {
			return await this.model.create({
				room_id: roomId,
				name: name,
				price: price
			});
		} catch (error) {
			console.error('Error in addEquipment:', error);
			throw error;
		}
	}

	/**
	 * Update an equipment item
	 * @param {number} equipmentId - Equipment ID
	 * @param {Object} updates - Fields to update (name, price)
	 * @returns {Promise<[affectedCount, affectedRows]>} Sequelize update result
	 */
	async updateEquipment(equipmentId, updates) {
		try {
			return await this.model.update(updates, {
				where: { id: equipmentId }
			});
		} catch (error) {
			console.error('Error in updateEquipment:', error);
			throw error;
		}
	}

	// Find equipment that is unlinked and matches name (case-insensitive)
	async findUnlinkedByName(name) {
		return await this.model.findOne({
			where: {
				name: { [Op.iLike]: name }, // case-insensitive
				room_id: null
			},
			raw: true
		});
	}

	/**
	 * Delete an equipment item by its ID
	 * @param {number} equipmentId - Equipment ID
	 * @returns {Promise<number>} Number of deleted rows
	 */
	async deleteEquipment(equipmentId) {
		try {
			return await this.model.destroy({
				where: { id: equipmentId }
			});
		} catch (error) {
			console.error('Error in deleteEquipment:', error);
			throw error;
		}
	}

	/**
	 * Delete all equipment items for a room
	 * @param {number} roomId - Room ID
	 * @returns {Promise<number>} Number of deleted rows
	 */
	async deleteAllByRoom(roomId) {
		try {
			return await this.model.destroy({
				where: { room_id: roomId }
			});
		} catch (error) {
			console.error('Error in deleteAllByRoom:', error);
			throw error;
		}
	}

	/**
	 * Get an equipment item by its ID
	 * @param {number} equipmentId - Equipment ID
	 * @returns {Promise<Object|null>} Equipment item or null
	 */
	async findById(equipmentId) {
		try {
			return await this.model.findByPk(equipmentId, { raw: true });
		} catch (error) {
			console.error('Error in findById:', error);
			throw error;
		}
	}
}

module.exports = EquipmentRepository;
