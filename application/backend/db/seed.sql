BEGIN;

TRUNCATE TABLE
  Bill,
  ServiceOrder,
  PriceHistory,
  Equipment,
  Stay,
  Reservation,
  Guest,
  Room
RESTART IDENTITY CASCADE;

-- Insert Rooms
INSERT INTO Room (room_id, room_type, capacity, price_per_night) VALUES
  (1, 'Single', 1, 80),
  (2, 'Double', 2, 120),
  (3, 'Suite', 4, 250);

-- Insert Guests
INSERT INTO Guest (guest_id, first_name, last_name, email, phone_number) VALUES
  (1, 'John', 'Doe', 'john.doe@example.com', '123456789'),
  (2, 'Jane', 'Smith', 'jane.smith@example.com', '987654321');

-- Insert Reservations
INSERT INTO Reservation (reservation_id, check_in_date, check_out_date, status, room_id, guest_id) VALUES
  (1, '2025-05-01', '2025-05-05', 'Confirmed', 1, 1),
  (2, '2025-05-10', '2025-05-12', 'Confirmed', 2, 2);

-- Insert Stays
INSERT INTO Stay (stay_id, check_in_date, check_out_date, reservation_id) VALUES
  (1, '2025-05-01', '2025-05-05', 1),
  (2, '2025-05-10', '2025-05-12', 2);

-- Insert Bills
INSERT INTO Bill (bill_id, total_amount, status, stay_id) VALUES
  (1, 320.00, 'Paid', 1),
  (2, 240.00, 'Unpaid', 2);

-- Insert Equipment
INSERT INTO Equipment (equipment_id, name, price, room_id) VALUES
  (1, 'TV', 300, 1),
  (2, 'Mini fridge', 150, 2);

-- Insert Price History
INSERT INTO PriceHistory (price_history_id, start_date, end_date, price, room_id) VALUES
  (1, '2025-01-01', '2025-06-30', 80, 1),
  (2, '2025-01-01', '2025-06-30', 120, 2);

-- Insert Service Orders
INSERT INTO ServiceOrder (service_order_id, service_name, price, date_time, stay_id) VALUES
  (1, 'Room Service', 30, '2025-05-02 14:00:00', 1),
  (2, 'Laundry', 20, '2025-05-11 10:00:00', 2);

COMMIT;
