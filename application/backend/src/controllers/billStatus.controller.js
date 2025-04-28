const pool = require('../../db/pool'); 

const updateBillStatusById = async (req, res) => {
  const { billId } = req.params; 
  const { status } = req.body; 

  try {
    if (!status || !['Paid', 'Unpaid'].includes(status)) {
      return res.status(400).json({
        message: 'Status must be either "Paid" or "Unpaid"',
      });
    }

    const billCheckQuery = 'SELECT * FROM Bill WHERE bill_id = $1';
    const billCheckResult = await pool.query(billCheckQuery, [billId]);

    if (billCheckResult.rows.length === 0) {
      return res.status(404).json({
        message: 'Bill not found',
      });
    }

    const updateBillQuery = `
      UPDATE Bill
      SET status = $1
      WHERE bill_id = $2
      RETURNING *;
    `;
    const updateBillResult = await pool.query(updateBillQuery, [status, billId]);

    return res.status(200).json({
      message: 'Bill status successfully updated',
      data: updateBillResult.rows[0],
    });
  } catch (error) {
    console.error('Error updating bill status:', error);
    return res.status(500).json({
      message: 'Server internal error',
      error: error.message,
    });
  }
};

module.exports = {
  updateBillStatusById,  
};
