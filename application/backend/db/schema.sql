-- Drop Tables
DROP TABLE IF EXISTS Bill CASCADE;
DROP TABLE IF EXISTS Equipment CASCADE;
DROP TABLE IF EXISTS PriceHistory CASCADE;
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Reservation CASCADE;
DROP TABLE IF EXISTS Room CASCADE;
DROP TABLE IF EXISTS ServiceOrder CASCADE;
DROP TABLE IF EXISTS Stay CASCADE;

-- Create Tables

CREATE TABLE Room (
	id BIGSERIAL PRIMARY KEY,
	type TEXT CHECK (type IN ('single', 'double', 'suite')) NOT NULL,
	status TEXT CHECK (status IN ('occupied', 'available', 'maintenance')) NOT NULL, -- Added 'maintenance' if used by RoomService
	capacity INT NOT NULL
);

-- Modified Users table (merged with Guest)
CREATE TABLE Users (
  id BIGSERIAL PRIMARY KEY, -- Changed from SERIAL to BIGSERIAL for consistency
  username VARCHAR(255) UNIQUE, -- Made nullable for guest users
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255), -- Made nullable for guest users
  role VARCHAR(50) NOT NULL DEFAULT 'admin', -- Max length 50, or as needed
  first_name VARCHAR(100), -- Added from Guest, nullable
  last_name VARCHAR(100),  -- Added from Guest, nullable
  phone_number VARCHAR(50), -- Added from Guest, nullable
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP -- Sequelize handles this if timestamps: true in model
);

CREATE TABLE Reservation (
	id BIGSERIAL PRIMARY KEY,
	check_in_date DATE NOT NULL,
	check_out_date DATE NOT NULL,
	status TEXT CHECK (status IN ('confirmed', 'checked-in', 'checked-out', 'paid', 'canceled')) NOT NULL, -- Added 'canceled'
	room_id BIGINT REFERENCES Room(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
	user_id BIGINT REFERENCES Users(id) ON DELETE RESTRICT ON UPDATE RESTRICT -- Changed from guest_id
);

CREATE TABLE Stay (
	stay_id BIGSERIAL PRIMARY KEY,
	check_in_date DATE NOT NULL, -- Consider if these are actual check-in/out or planned
	check_out_date DATE NOT NULL, -- May differ from reservation dates
	reservation_id BIGINT REFERENCES Reservation(id) ON DELETE RESTRICT ON UPDATE RESTRICT
    -- Consider adding actual_check_in TIMESTAMP and actual_check_out TIMESTAMP if needed
);

CREATE TABLE Bill (
	id BIGSERIAL PRIMARY KEY,
	total_amount DECIMAL(10, 2) NOT NULL, -- Changed to DECIMAL for currency
	status TEXT CHECK (status IN ('paid', 'unpaid')) NOT NULL,
	stay_id BIGINT REFERENCES Stay(stay_id) ON DELETE RESTRICT ON UPDATE RESTRICT
    -- Consider adding due_date DATE
);

CREATE TABLE Equipment (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	price DECIMAL(10, 2) NOT NULL, -- Changed to DECIMAL
	room_id BIGINT REFERENCES Room(id) ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE PriceHistory (
	price_history_id BIGSERIAL PRIMARY KEY,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	price DECIMAL(10, 2) NOT NULL, -- Changed to DECIMAL
	room_id BIGINT REFERENCES Room(id) ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE ServiceOrder (
	service_order_id BIGSERIAL PRIMARY KEY,
	service_name VARCHAR(100) NOT NULL, -- Increased length from 50
	price DECIMAL(10, 2) NOT NULL, -- Changed to DECIMAL
	date_time TIMESTAMP NOT NULL DEFAULT NOW(), -- Added default
	stay_id BIGINT REFERENCES Stay(stay_id) ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- Optional: Add indexes for frequently queried columns, especially foreign keys
CREATE INDEX IF NOT EXISTS idx_reservation_user_id ON Reservation(user_id);
CREATE INDEX IF NOT EXISTS idx_reservation_room_id ON Reservation(room_id);
CREATE INDEX IF NOT EXISTS idx_stay_reservation_id ON Stay(reservation_id);
CREATE INDEX IF NOT EXISTS idx_bill_stay_id ON Bill(stay_id);
-- Add other indexes as needed