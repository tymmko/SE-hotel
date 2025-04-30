require('dotenv').config();
const { neon } = require("@neondatabase/serverless");
const fs = require('fs').promises;
const path = require('path');

const sql = neon(process.env.DATABASE_URL);

async function setupDatabase() {
  try {
    console.log('🚀 Setting up database...');

    // Execute schema
    const schemaPath = path.join(__dirname, 'db/schema.sql');
    const schema = await fs.readFile(schemaPath, 'utf8');

    const schemaStatements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const statement of schemaStatements) {
      await sql.query(statement);
    }

    console.log('✅ Database schema created successfully!');

    // Execute seed
    const seedPath = path.join(__dirname, 'db/seed.sql');
    const seed = await fs.readFile(seedPath, 'utf8');

    const seedStatements = seed
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const statement of seedStatements) {
      await sql.query(statement);
    }

    console.log('🌱 Database seeded successfully!');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
  }
}

setupDatabase();
