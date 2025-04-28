const pool = require('../../db/pool');

const createBill = async (req, res) => {
  const { stay_id, total_amount, status } = req.body;

  try {
    if (!stay_id || total_amount === undefined || !status) {
      return res.status(400).json({ message: 'All fields are mandatory' });
    }

    if (!['Paid', 'Unpaid'].includes(status)) {
      return res.status(400).json({ message: 'Status must be "Paid" or "Unpaid"' });
    }

    const result = await pool.query(
      'INSERT INTO Bill (stay_id, total_amount, status) VALUES ($1, $2, $3) RETURNING *',
      [stay_id, total_amount, status]
    );

    return res.status(201).json({
      message: 'Bill successfully created',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error during the generation of the bill:', error);
    return res.status(500).json({ message: 'Server internal error', error });
  }
};

module.exports = {
  createBill,
};
