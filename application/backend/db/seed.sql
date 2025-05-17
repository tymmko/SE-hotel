BEGIN;

TRUNCATE TABLE
  Bill,
  ServiceOrder,
  PriceHistory,
  Equipment,
  Stay,
  Reservation,
  -- Guest, -- Removed
  Room,
  Users -- Users will be truncated
RESTART IDENTITY CASCADE;

-- Insert Rooms
INSERT INTO Room (type, status, capacity) VALUES
  ('single', 'available', 1),  -- Initial status to available, reservations will change it
  ('double', 'available', 2),
  ('suite', 'available', 3);

-- Insert Users (combining former Guests and existing Users)
-- Former Guests (now Users with role 'guest', no username/password initially)
INSERT INTO Users (first_name, last_name, email, phone_number, role, created_at, updated_at) VALUES
  ('John', 'Doe', 'john.doe@example.com', '123456789', 'guest', NOW(), NOW()),         -- Will have ID 1
  ('Jane', 'Smith', 'jane.smith@example.com', '987654321', 'guest', NOW(), NOW()),       -- Will have ID 2
  ('Alex', 'Johnson', 'alex.johnson@example.com', '555123456', 'guest', NOW(), NOW()); -- Will have ID 3

-- Existing Users (username/password, specific roles)
INSERT INTO Users (username, email, password, role, first_name, last_name, phone_number, created_at, updated_at) VALUES
(
  'testuser',
  'testuser@example.com',
  '$2b$10$6z7t3Y6e1f3e9e8y9v7x9O0q8i6u4y2t0r8e4w2q6y8u0i2o4p6y8', -- Example hash, replace with actual
  'guest', -- Or another role like 'registered_user'
  'Test', 'User', '111222333', -- Add FName, LName, Phone for completeness if applicable
  NOW(),
  NOW()
),
(
  'adminuser',
  'admin@example.com',
  '$2b$10$n9u5Z9K6S475b5wk/gWK6uwMui/g3wIkllaf5ROmGhkIDwosaVi.G', -- Example hash, replace with actual
  'admin',
  'Admin', 'Super', '000000000', -- Add FName, LName, Phone for completeness if applicable
  NOW(),
  NOW()
);

-- Insert Reservations (linking to the new Users table IDs)
-- Assuming 'John Doe' is User ID 1, 'Jane Smith' is User ID 2, 'Alex Johnson' is User ID 3
INSERT INTO Reservation (check_in_date, check_out_date, status, room_id, user_id) VALUES
  ('2025-06-01', '2025-06-05', 'confirmed', 1, 1), -- John Doe to Room 1
  ('2025-06-10', '2025-06-12', 'checked-in', 2, 2), -- Jane Smith to Room 2
  ('2025-06-15', '2025-06-20', 'confirmed', 3, 3); -- Alex Johnson to Room 3

-- Insert Stays
INSERT INTO Stay (check_in_date, check_out_date, reservation_id) VALUES
  ('2025-06-01', '2025-06-05', 1),
  ('2025-06-10', '2025-06-12', 2),
  ('2025-06-15', '2025-06-20', 3);

-- Insert Bills (using DECIMAL format)
INSERT INTO Bill (total_amount, status, stay_id) VALUES
  (320.00, 'paid', 1),
  (240.00, 'unpaid', 2);

-- Insert Equipment (using DECIMAL format)
INSERT INTO Equipment (name, price, room_id) VALUES
  ('TV', 300.00, 1),
  ('Mini fridge', 150.00, 2),
  ('Jacuzzi', 500.00, 3);

-- Insert Price History (using DECIMAL format)
INSERT INTO PriceHistory (start_date, end_date, price, room_id) VALUES
  ('2025-01-01', '2025-12-31', 80.00, 1),
  ('2025-01-01', '2025-12-31', 120.00, 2),
  ('2025-01-01', '2025-12-31', 250.00, 3);

-- Insert Service Orders (using DECIMAL format)
INSERT INTO ServiceOrder (service_name, price, date_time, stay_id) VALUES
  ('Room Service', 30.00, '2025-06-02 14:00:00', 1),
  ('Laundry', 20.00, '2025-06-11 10:00:00', 2),
  ('Spa Treatment', 100.00, '2025-06-16 15:30:00', 3);


COMMIT;