BEGIN;

TRUNCATE TABLE 
  Bill, 
  ServiceOrder, 
  PriceHistory, 
  Equipment, 
  Stay, 
  Reservation, 
  Guest, 
  Room,
  users
RESTART IDENTITY CASCADE;

-- Insert Rooms
INSERT INTO Room (type, status, capacity, price_per_night) VALUES
  ('single','occupied',  1, 80),
  ('double', 'occupied', 2, 120),
  ('suite', 'available', 3, 250);

-- Insert Guests
INSERT INTO Guest (first_name, last_name, email, phone_number) VALUES 
  ('John', 'Doe', 'john.doe@example.com', '123456789'),
  ('Jane', 'Smith', 'jane.smith@example.com', '987654321'),
  ('Alex', 'Johnson', 'alex.johnson@example.com', '555123456');

-- Insert Reservations
INSERT INTO Reservation (check_in_date, check_out_date, status, room_id, guest_id) VALUES 
  ('2025-05-01', '2025-05-05', 'Confirmed', 1, 1),
  ('2025-05-10', '2025-05-12', 'Confirmed', 2, 2),
  ('2025-05-15', '2025-05-20', 'Confirmed', 3, 3);

-- Insert Stays
INSERT INTO Stay (check_in_date, check_out_date, reservation_id) VALUES 
  ('2025-05-01', '2025-05-05', 1),
  ('2025-05-10', '2025-05-12', 2),
  ('2025-05-15', '2025-05-20', 3);  -- This stay will not have a bill

-- Insert Bills (only for the first two stays)
INSERT INTO Bill (total_amount, status, stay_id) VALUES 
  (320.00, 'Paid', 1),
  (240.00, 'Unpaid', 2);
  -- No bill for stay_id 3

-- Insert Equipment
INSERT INTO Equipment (name, price, room_id) VALUES 
  ('TV', 300, 1),
  ('Mini fridge', 150, 2),
  ('Jacuzzi', 500, 3);

-- Insert Price History
INSERT INTO PriceHistory (start_date, end_date, price, room_id) VALUES 
  ('2025-01-01', '2025-06-30', 80, 1),
  ('2025-01-01', '2025-06-30', 120, 2),
  ('2025-01-01', '2025-06-30', 250, 3);

-- Insert Service Orders (also include one for the stay without a bill)
INSERT INTO ServiceOrder (service_name, price, date_time, stay_id) VALUES 
  ('Room Service', 30, '2025-05-02 14:00:00', 1),
  ('Laundry', 20, '2025-05-11 10:00:00', 2),
  ('Spa Treatment', 100, '2025-05-16 15:30:00', 3);

-- Insert Service Orders (also include one for the stay without a bill)
INSERT INTO users (username, email, password, role, created_at)
VALUES (
  'testuser',
  'testuser@example.com',
  '$2b$10$6z7t3Y6e1f3e9e8y9v7x9O0q8i6u4y2t0r8e4w2q6y8u0i2o4p6y8',
  'guest',
  NOW()
), (
  'adminuser',
  'admin@example.com',
  '$2b$10$6z7t3Y6e1f3e9e8y9v7x9O0q8i6u4y2t0r8e4w2q6y8u0i2o4p6y8',
  'admin',
  NOW()
);
-- Add a comment to remind you which stay has no bill
COMMENT ON TABLE Stay IS 'Note: Stay with ID 3 has no associated bill and can be used for testing bill creation';

COMMIT;