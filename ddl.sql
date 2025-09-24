-- Tabel users untuk login admin
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL -- hash pakai bcrypt kalau mau lebih aman
);

-- Insert akun admin default
INSERT INTO users (username, password) VALUES ('admin', 'admin123');

-- Tabel visitors
CREATE TABLE visitors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  photo TEXT,
  checkin_time TIMESTAMP DEFAULT NOW(),
  checkout_time TIMESTAMP
);
