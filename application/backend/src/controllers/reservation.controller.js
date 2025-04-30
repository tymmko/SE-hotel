const pool = require('../../db/pool');

const getReservations = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM Reservation');
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

const createReservation = async (req, res, next) => {
  const { check_in_date, check_out_date, status, room_id, guest_id } = req.body;
  try {
    if (!check_in_date || !check_out_date || !status || !room_id || !guest_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const roomCheck = await pool.query('SELECT * FROM Room WHERE room_id = $1', [room_id]);
    const guestCheck = await pool.query('SELECT * FROM Guest WHERE guest_id = $1', [guest_id]);
    if (roomCheck.rows.length === 0 || guestCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Room or Guest not found' });
    }
    const result = await pool.query(
      'INSERT INTO Reservation (check_in_date, check_out_date, status, room_id, guest_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [check_in_date, check_out_date, status, room_id, guest_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const getAmenitiesByRoomId = async (req, res, next) => {
  const { room_id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Equipment WHERE room_id = $1', [room_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No amenities found for this room' });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

module.exports = { getReservations, createReservation, getAmenitiesByRoomId };