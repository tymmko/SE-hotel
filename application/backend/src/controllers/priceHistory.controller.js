const pool = require('../../db/pool'); 

const getPriceHistoryByRoomId = async (req, res) => {
  try {
    const { roomId } = req.params;

    const result = await pool.query(
      'SELECT * FROM PriceHistory WHERE room_id = $1 ORDER BY start_date DESC', 
      [roomId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No price history found for this room.' });
    }

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching price history:', err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const PriceHistoryController = {
  getPriceHistoryByRoomId,
};

module.exports = PriceHistoryController;
