/**
 * Controller for managing price history-related endpoints
 * Handles HTTP requests for price history operations
 * @param {PriceHistoryService} priceHistoryService - Service for price history operations
 * @returns {Object} Object containing controller methods
 */
function PriceHistoryController(priceHistoryService) {
  return {
    /**
     * Add a new price history entry for a room
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>} Sends a JSON response with the created price history entry
     * @example
     * POST /rooms/123/price-history
     * {
     *   "price": 100.00,
     *   "start_date": "2025-01-01",
     *   "end_date": "2025-12-31"
     * }
     */
    async addPriceHistory(req, res) {
      const roomId = Number(req.params.id);
      const { price, start_date, end_date } = req.body;
      
      if (isNaN(roomId)) {
        return res.status(400).json({ message: 'Invalid room ID' });
      }

      if (price === undefined) {
        return res.status(400).json({ message: 'Price is required' });
      }

      try {
        const newEntry = await priceHistoryService.addPriceHistory(
          roomId,
          price,
          start_date ? new Date(start_date) : undefined,
          end_date ? new Date(end_date) : new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        );
        return res.status(201).json(newEntry);
      } catch (error) {
        console.error('Error in addPriceHistory:', error);
        return res.status(400).json({ message: error.message });
      }
    }
  };
}

module.exports = PriceHistoryController;