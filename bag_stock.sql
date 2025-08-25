-- Create database
-- CREATE DATABASE bag_stock CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE bag_stock;

-- Users table (optional for login/auth)
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stock entries table
CREATE TABLE stock_entries (
  entry_id INT AUTO_INCREMENT PRIMARY KEY,
  entry_date DATE NOT NULL,
  shift ENUM('A','B','C') NOT NULL,
  brand_key VARCHAR(50) NOT NULL,
  row_label VARCHAR(50) NOT NULL,
  bundle INT DEFAULT 0,
  loose INT DEFAULT 0,
  total INT GENERATED ALWAYS AS (bundle*200 + loose) STORED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
