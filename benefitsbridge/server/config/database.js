/**
 * PostgreSQL Database Configuration
 */

import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Test connection
pool.on('connect', () => {
  console.log('✓ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client:', err);
});

/**
 * Initialize database tables
 */
export async function initializeDatabase() {
  try {
    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE,
        phone VARCHAR(20) UNIQUE,
        first_name VARCHAR(100) NOT NULL,
        firebase_uid VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Applications table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        status VARCHAR(50) DEFAULT 'submitted',
        reference_number VARCHAR(50) UNIQUE NOT NULL,
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        data JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Documents table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
        document_type VARCHAR(50) NOT NULL,
        cloudinary_url VARCHAR(500),
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Notifications table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
        notification_type VARCHAR(50) NOT NULL,
        content TEXT,
        phone_number VARCHAR(20),
        sent_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✓ Database tables initialized');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

export default pool;
