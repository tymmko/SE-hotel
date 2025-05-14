const pool = require('./pool');
const fs = require('fs').promises;
const path = require('path');

// Function to read and execute SQL file statements individually
async function executeSqlFile(sqlFilePath) {
  const sqlContent = await fs.readFile(sqlFilePath, 'utf8');
  const statements = sqlContent.split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

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

// Function to reset sequences for all SERIAL columns
async function resetSequences() {
  const tables = [
    { table: 'Room', column: 'id' },
    { table: 'Guest', column: 'id' },
    { table: 'Reservation', column: 'id' },
    { table: 'Stay', column: 'stay_id' },
    { table: 'Bill', column: 'id' },
    { table: 'Equipment', column: 'id' },
    { table: 'PriceHistory', column: 'price_history_id' },
    { table: 'ServiceOrder', column: 'service_order_id' },
    { table: 'Users', column: 'id' }
  ];

  for (const { table, column } of tables) {
    const sequenceName = `${table.toLowerCase()}_${column}_seq`;
    try {
      await pool.query(`
        SELECT setval($1, (SELECT COALESCE(MAX(${column}), 0) FROM ${table}), true)
      `, [sequenceName]);
      console.log(`✅ Reset sequence for ${table}.${column}`);
    } catch (error) {
      console.error(`❌ Error resetting sequence for ${table}.${column}:`, error);
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

    // Reset sequences
    await resetSequences();
    console.log('🔄 All sequences reset successfully!');
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    throw error;
  }
}

module.exports = { setupDatabase };