/**
 * Service for managing equipment-related business logic
 * Extends BaseService to provide equipment-specific operations
 */
class EquipmentService extends BaseService {
  /**
   * @param {EquipmentRepository} equipmentRepository - Repository for equipment data
   * @param {RoomRepository} roomRepository - Repository for room data
   */
  constructor(equipmentRepository, roomRepository) {
    super(equipmentRepository);
    this.roomRepository = roomRepository;
  }

  /**
   * Retrieve all equipment for a specific room
   * @param {number} roomId - Room ID
   * @returns {Promise<Array>} List of equipment items
   * @throws {Error} If room is not found
   */
  async getEquipmentByRoom(roomId) {
    const room = await this.roomRepository.findRoomWithDetails(roomId);
    if (!room) {
      throw new Error('Room not found');
    }

    return await this.repository.findByRoom(roomId);
  }

  /**
   * Retrieve all equipment names
   * @returns {Promise<Array>} List of equipment names
   */
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
   * @throws {Error} If room is not found or data is invalid
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

  /**
   * Add or reuse existing equipment for a room
   * @param {number} roomId - Room ID
   * @param {string} name - Equipment name
   * @param {number} price - Equipment price
   * @returns {Promise<Object>} Created or reused equipment
   * @throws {Error} If room is not found or data is invalid
   */
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

    return await this.repository.addEquipment(roomId, name, price);
  }

  /**
   * Update an equipment item
   * @param {number} equipmentId - Equipment ID
   * @param {Object} updates - Fields to update
   * @param {string} [updates.name] - New equipment name
   * @param {number} [updates.price] - New equipment price
   * @returns {Promise<Object>} Updated equipment
   * @throws {Error} If equipment is not found or no fields are provided
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

  /**
   * Unlink an equipment item from its room (soft delete)
   * @param {number} equipmentId - Equipment ID
   * @returns {Promise<Object>} Updated equipment
   * @throws {Error} If equipment is not found
   */
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
   * @returns {Promise<boolean>} True if deletion was successful
   * @throws {Error} If equipment is not found
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
   * @throws {Error} If room is not found
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