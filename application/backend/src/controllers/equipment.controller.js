/**
 * Controller for managing equipment-related endpoints
 * Provides methods to handle equipment operations for rooms
 * @param {EquipmentService} equipmentService - Service for equipment operations
 * @returns {Object} Object containing controller methods
 */
function EquipmentController(equipmentService) {
  return {
    /**
     * Retrieve all equipment for a specific room
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>} Sends a JSON response with the list of equipment
     * @example
     * GET /rooms/123/equipment
     */
    async getAllByRoom(req, res) {
      const { roomId } = req.params;
      try {
        const equipment = await equipmentService.getEquipmentByRoom(roomId);
        return res.status(200).json(equipment);
      } catch (error) {
        console.error('Error in getAllByRoom:', error);
        return res.status(400).json({ message: error.message });
      }
    },

    /**
     * Retrieve all equipment items
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>} Sends a JSON response with the list of equipment
     * @example
     * GET /equipment
     */
    async getAllEquipments(req, res) {
      try {
        const names = await equipmentService.getAllEquipments();
        return res.status(200).json(names);
      } catch (error) {
        console.error('Error in getAllEquipmentNames:', error);
        return res.status(500).json({ message: error.message });
      }
    },

    /**
     * Add a new equipment item to a room
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>} Sends a JSON response with the created equipment
     * @example
     * POST /rooms/123/equipment
     * {
     *   "name": "TV",
     *   "price": 50.00
     * }
     */
    async addEquipment(req, res) {
      const { roomId } = req.params;
      const { name, price } = req.body;

      try {
        const newItem = await equipmentService.addOrReuseEquipment(roomId, name, price);
        return res.status(201).json(newItem);
      } catch (error) {
        console.error('Error in addEquipment:', error);
        return res.status(400).json({ message: error.message });
      }
    },

    /**
     * Update an equipment item
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>} Sends a JSON response with the updated equipment
     * @example
     * PUT /equipment/456
     * {
     *   "name": "Smart TV",
     *   "price": 75.00
     * }
     */
    async updateEquipment(req, res) {
      const { equipmentId } = req.params;
      const { name, price } = req.body;

      try {
        const updatedItem = await equipmentService.updateEquipment(equipmentId, { name, price });
        return res.status(200).json(updatedItem);
      } catch (error) {
        console.error('Error in updateEquipment:', error);
        return res.status(400).json({ message: error.message });
      }
    },

    /**
     * Unlink an equipment item from its room (soft delete)
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>} Sends a JSON response confirming unlinking
     * @example
     * DELETE /equipment/456/unlink
     */
    async unlinkEquipment(req, res) {
      const { equipmentId } = req.params;

      try {
        await equipmentService.unlinkEquipment(equipmentId);
        return res.status(200).json({ message: 'Equipment unlinked successfully' });
      } catch (error) {
        console.error('Error in unlinkEquipment:', error);
        return res.status(400).json({ message: error.message });
      }
    },

    /**
     * Delete an equipment item by ID
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>} Sends a JSON response confirming deletion
     * @example
     * DELETE /equipment/456
     */
    async deleteEquipment(req, res) {
      const { equipmentId } = req.params;

      try {
        await equipmentService.deleteEquipment(equipmentId);
        return res.status(200).json({ message: 'Equipment deleted successfully' });
      } catch (error) {
        console.error('Error in deleteEquipment:', error);
        return res.status(400).json({ message: error.message });
      }
    },

    /**
     * Delete all equipment items for a room
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>} Sends a JSON response with the number of deleted items
     * @example
     * DELETE /rooms/123/equipment
     */
    async deleteAllByRoom(req, res) {
      const { roomId } = req.params;

      try {
        const deletedCount = await equipmentService.deleteAllByRoom(roomId);
        return res.status(200).json({ message: `${deletedCount} equipment items deleted` });
      } catch (error) {
        console.error('Error in deleteAllByRoom:', error);
        return res.status(400).json({ message: error.message });
      }
    }
  };
}

module.exports = EquipmentController;