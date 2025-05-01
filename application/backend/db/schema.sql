-- Drop Tables
DROP TABLE IF EXISTS Bill CASCADE;
DROP TABLE IF EXISTS Equipment CASCADE;
DROP TABLE IF EXISTS Guest CASCADE;
DROP TABLE IF EXISTS PriceHistory CASCADE;
DROP TABLE IF EXISTS Reservation CASCADE;
DROP TABLE IF EXISTS Room CASCADE;
DROP TABLE IF EXISTS ServiceOrder CASCADE;
DROP TABLE IF EXISTS Stay CASCADE;

-- Create Tables

CREATE TABLE Guest (
    guest_id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(50) NOT NULL
);

CREATE TABLE Room (
    id BIGSERIAL PRIMARY KEY,
    type TEXT CHECK (type IN ('single', 'double', 'suite')) NOT NULL,
    status TEXT CHECK (status IN ('occupied', 'available')) NOT NULL,
    capacity INT NOT NULL,
    price_per_night FLOAT NOT NULL
);

CREATE TABLE Reservation (
    reservation_id BIGSERIAL PRIMARY KEY,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    status TEXT CHECK (status IN ('Confirmed', 'Canceled')) NOT NULL,
    room_id BIGINT REFERENCES Room(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
    guest_id BIGINT REFERENCES Guest(guest_id) ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE Stay (
    stay_id BIGSERIAL PRIMARY KEY,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    reservation_id BIGINT REFERENCES Reservation(reservation_id) ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE Bill (
    bill_id BIGSERIAL PRIMARY KEY,
    total_amount FLOAT NOT NULL,
    status TEXT CHECK (status IN ('Paid', 'Unpaid')) NOT NULL,
    stay_id BIGINT REFERENCES Stay(stay_id) ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE Equipment (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price FLOAT NOT NULL,
    room_id BIGINT REFERENCES Room(id) ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE PriceHistory (
    price_history_id BIGSERIAL PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price FLOAT NOT NULL,
    room_id BIGINT REFERENCES Room(id) ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE ServiceOrder (
    service_order_id BIGSERIAL PRIMARY KEY,
    service_name VARCHAR(50) NOT NULL,
    price FLOAT NOT NULL,
    date_time TIMESTAMP NOT NULL,
    stay_id BIGINT REFERENCES Stay(stay_id) ON DELETE RESTRICT ON UPDATE RESTRICT
);
