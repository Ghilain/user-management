-- Create databese with name of "zplatform"
CREATE DATABASE zplatform;

-- Query to generate table for users

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  gender VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL,
  dob DATE NOT NULL,
  marital_status VARCHAR(255) NOT NULL,
  nationality VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL DEFAULT 'UNVERIFIED',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Query to generate table for verification_requests

CREATE TABLE verification_requests (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  nid VARCHAR(255),
  passport VARCHAR(255),
  photo VARCHAR(255),
  status VARCHAR(255) NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
