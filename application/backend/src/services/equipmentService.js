// src/services/equipmentService.js
const BaseService = require('./common/baseService');

/**
 * Service for Equipment-related business logic
 */
class EquipmentService extends BaseService {
	/**
	 * @param {EquipmentRepository} equipmentRepository - Repository for equipment data
	 * @param {RoomRepository} roomRepository - Repository for room data (for validation)
	 */
	constructor(equipmentRepository, roomRepository) {
		super(equipmentRepository);
		this.roomRepository = roomRepository;
	}

	/**
	 * Get all equipment for a specific room
	 * @param {number} roomId - Room ID
	 * @returns {Promise<Array>} List of equipment
	 * @throws {Error} If room not found
	 */
	async getEquipmentByRoom(roomId) {
		const room = await this.roomRepository.findRoomWithDetails(roomId);
		if (!room) {
			throw new Error('Room not found');
		}

		return await this.repository.findByRoom(roomId);
	}

	async getAllEquipments() {
		const records = await this.repository.getAllEquipments();
		return records.map(e => e.name);
	}	  

	/**
	 * Add new equipment to a room
	 * @param {number} roomId - Room ID
	 * @param {string} name - Equipment name
	 * @param {number} price - Equipment price
	 * @returns {Promise<Object>} Created equipment
	 * @throws {Error} If room not found or invalid data
	 */
	async addEquipment(roomId, name, price) {
		const room = await this.roomRepository.findRoomWithDetails(roomId);
		if (!room) {
			throw new Error('Room not found');
		}

		if (!name || price === undefined || price < 0) {
			throw new Error('Name and a valid (non-negative) price are required');
		}

		return await this.repository.addEquipment(roomId, name, price);
	}

	// Add or reuse existing equipment if unlinked
	async addOrReuseEquipment(roomId, name, price) {
		const room = await this.roomRepository.findRoomWithDetails(roomId);
		if (!room) {
			throw new Error('Room not found');
		}
	
		if (!name || price === undefined || price < 0) {
			throw new Error('Name and valid price are required');
		}
	
		const existing = await this.repository.findUnlinkedByName(name.toLowerCase());

		if (existing) {
			return await this.repository.updateEquipment(existing.id, { room_id: roomId });
		}

		// Save name as provided by user, not in lowercase
		return await this.repository.addEquipment(roomId, name, price);
	}

	/**
	 * Update an equipment item
	 * @param {number} equipmentId - Equipment ID
	 * @param {Object} updates - Fields to update (name, price)
	 * @returns {Promise<Object>} Updated equipment
	 * @throws {Error} If equipment not found
	 */
	async updateEquipment(equipmentId, updates) {
		const equipment = await this.repository.findById(equipmentId);
		if (!equipment) {
			throw new Error('Equipment not found');
		}

		if (!updates.name && updates.price === undefined) {
			throw new Error('At least one field (name or price) must be provided');
		}

		await this.repository.updateEquipment(equipmentId, updates);
		return await this.repository.findById(equipmentId);
	}

	// Unlink equipment from room without deleting
	async unlinkEquipment(equipmentId) {
		const equipment = await this.repository.findById(equipmentId);
		if (!equipment) {
			throw new Error('Equipment not found');
		}
	
		return await this.repository.updateEquipment(equipmentId, { room_id: null });
	}

	/**
	 * Delete an equipment item
	 * @param {number} equipmentId - Equipment ID
	 * @returns {Promise<boolean>} Deletion success
	 * @throws {Error} If equipment not found
	 */
	async deleteEquipment(equipmentId) {
		const equipment = await this.repository.findById(equipmentId);
		if (!equipment) {
			throw new Error('Equipment not found');
		}

		await this.repository.deleteEquipment(equipmentId);
		return true;
	}

	/**
	 * Delete all equipment for a specific room
	 * @param {number} roomId - Room ID
	 * @returns {Promise<number>} Number of deleted equipment items
	 * @throws {Error} If room not found
	 */
	async deleteAllByRoom(roomId) {
		const room = await this.roomRepository.findRoomWithDetails(roomId);
		if (!room) {
			throw new Error('Room not found');
		}

		return await this.repository.deleteAllByRoom(roomId);
	}
}

module.exports = EquipmentService;
