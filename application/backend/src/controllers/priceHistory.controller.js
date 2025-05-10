// src/controllers/priceHistoryController.js

/**
 * Controller for PriceHistory operations (uses PriceHistoryService)
 * @param {PriceHistoryService} priceHistoryService
 */
function PriceHistoryController(priceHistoryService) {
    return {
      /**
       * Add a new price history entry to a rooms
       */
      async addPriceHistory(req, res) {
        const { roomId } = req.params;
        const { price, start_date, end_date } = req.body;
  
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
  