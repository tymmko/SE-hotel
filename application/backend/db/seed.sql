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
INSERT INTO Room (room_type, capacity, price_per_night) VALUES
  ('Single', 1, 80),
  ('Double', 2, 120),
  ('Suite', 4, 250);

-- Insert Guests
INSERT INTO Guest (first_name, last_name, email, phone_number) VALUES
  ('John', 'Doe', 'john.doe@example.com', '123456789'),
  ('Jane', 'Smith', 'jane.smith@example.com', '987654321');

-- Insert Reservations
INSERT INTO Reservation (check_in_date, check_out_date, status, room_id, guest_id) VALUES
  ('2025-05-01', '2025-05-05', 'Confirmed', 1, 1),
  ('2025-05-10', '2025-05-12', 'Confirmed', 2, 2);

-- Insert Stays
INSERT INTO Stay (check_in_date, check_out_date, reservation_id) VALUES
  ('2025-05-01', '2025-05-05', 1),
  ('2025-05-10', '2025-05-12', 2);

-- Insert Bills
INSERT INTO Bill (total_amount, status, stay_id) VALUES
  (320.00, 'Paid', 1),
  (240.00, 'Unpaid', 2);

-- Insert Equipment
INSERT INTO Equipment (name, price, room_id) VALUES
  ('TV', 300, 1),
  ('Mini fridge', 150, 2);

-- Insert Price History
INSERT INTO PriceHistory (start_date, end_date, price, room_id) VALUES
  ('2025-01-01', '2025-06-30', 80, 1),
  ('2025-01-01', '2025-06-30', 120, 2);

-- Insert Service Orders
INSERT INTO ServiceOrder (service_name, price, date_time, stay_id) VALUES
  ('Room Service', 30, '2025-05-02 14:00:00', 1),
  ('Laundry', 20, '2025-05-11 10:00:00', 2);

COMMIT;