// src/controllers/equipmentController.js

/**
 * Controller for Equipment operations (uses EquipmentService)
 * @param {EquipmentService} equipmentService - Service injected dependency
 */
function EquipmentController(equipmentService) {
		return {
			/**
			 * Get all equipment for a room
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
			 * Get all equipments
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
	