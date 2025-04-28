-- Drop tables in reverse dependency order to avoid foreign key issues
DROP TABLE IF EXISTS ServiceOrder;
DROP TABLE IF EXISTS PriceHistory;
DROP TABLE IF EXISTS Bill;
DROP TABLE IF EXISTS Stay;
DROP TABLE IF EXISTS Equipment;
DROP TABLE IF EXISTS Reservation;
DROP TABLE IF EXISTS Guest;
DROP TABLE IF EXISTS Room;

-- Create tables
CREATE TABLE Room (
  room_id SERIAL PRIMARY KEY,
  room_type VARCHAR(50) NOT NULL,
  capacity INTEGER NOT NULL,
  price_per_night DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Guest (
  guest_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone_number VARCHAR(20)
);

CREATE TABLE Reservation (
  reservation_id SERIAL PRIMARY KEY,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL,
  room_id INTEGER REFERENCES Room(room_id),
  guest_id INTEGER REFERENCES Guest(guest_id)
);

CREATE TABLE Equipment (
  equipment_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  room_id INTEGER REFERENCES Room(room_id)
);

CREATE TABLE Stay (
  stay_id SERIAL PRIMARY KEY,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  reservation_id INTEGER REFERENCES Reservation(reservation_id)
);

CREATE TABLE Bill (
  bill_id SERIAL PRIMARY KEY,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) NOT NULL,
  stay_id INTEGER REFERENCES Stay(stay_id)
);

CREATE TABLE PriceHistory (
  price_history_id SERIAL PRIMARY KEY,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  room_id INTEGER REFERENCES Room(room_id)
);

CREATE TABLE ServiceOrder (
  service_order_id SERIAL PRIMARY KEY,
  service_name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  date_time TIMESTAMP NOT NULL,
  stay_id INTEGER REFERENCES Stay(stay_id)
);