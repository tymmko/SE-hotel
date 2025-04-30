const pool = require('../../db/pool');

const getGuest = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Guest WHERE guest_id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Guest not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = { getGuest };