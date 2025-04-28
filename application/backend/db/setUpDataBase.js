const pool = require('./pool');
const fs = require('fs').promises;
const path = require('path');

// Function to read and execute SQL file statements individually
async function executeSqlFile(sqlFilePath) {
  // Read the SQL file content
  const sqlContent = await fs.readFile(sqlFilePath, 'utf8');
  
  // Split into individual statements by semicolon, remove empty ones
  const statements = sqlContent.split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  // Execute each statement separately
  for (const statement of statements) {
    try {
      await pool.query(statement);
      console.log(`✅ Executed: ${statement.substring(0, 50)}...`);
    } catch (error) {
      console.error(`❌ Error executing statement: ${statement}`, error);
      throw error;
    }
  }
}

// Main setup function
async function setupDatabase() {
  try {
    console.log('🚀 Setting up database...');

    // Execute schema.sql
    const schemaPath = path.join(__dirname, 'schema.sql');
    await executeSqlFile(schemaPath);
    console.log('✅ Database schema created successfully!');

    // Execute seed.sql
    const seedPath = path.join(__dirname, 'seed.sql');
    await executeSqlFile(seedPath);
    console.log('🌱 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    throw error;
  }
}

module.exports = { setupDatabase };