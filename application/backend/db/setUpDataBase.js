const pool = require('./pool');
const fs = require('fs').promises;
const path = require('path');

// Function to read and execute SQL file statements individually
async function executeSqlFile(sqlFilePath) {
  const sqlContent = await fs.readFile(sqlFilePath, 'utf8');
  // Improved split to handle potential empty statements better and comments
  const statements = sqlContent.split(/;\s*$/m) // Split by semicolon at the end of a line (multiline aware)
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--')); // Filter out empty lines and full-line comments

  for (const statement of statements) {
    try {
      await pool.query(statement);
      console.log(`✅ Executed: ${statement.substring(0, 80).replace(/\r?\n|\r/g, " ")}...`);
    } catch (error) {
      console.error(`❌ Error executing statement: ${statement.substring(0, 80).replace(/\r?\n|\r/g, " ")}...`, error.message);
      // Decide if you want to throw and stop, or continue with other statements
      // For schema setup, it's often better to stop on error.
      throw error;
    }
  }
}

// Function to reset sequences for all SERIAL/BIGSERIAL columns
async function resetSequences() {
  const tables = [
    { table: 'Room', column: 'id' },
    // { table: 'Guest', column: 'id' }, // Removed
    { table: 'Users', column: 'id' }, // Added Users here explicitly as it's BIGSERIAL
    { table: 'Reservation', column: 'id' },
    { table: 'Stay', column: 'stay_id' },
    { table: 'Bill', column: 'id' },
    { table: 'Equipment', column: 'id' },
    { table: 'PriceHistory', column: 'price_history_id' },
    { table: 'ServiceOrder', column: 'service_order_id' }
    // Users table's id sequence will be reset if it's named users_id_seq (PostgreSQL default for SERIAL/BIGSERIAL)
  ];

  for (const { table, column } of tables) {
    // PostgreSQL default sequence name for SERIAL/BIGSERIAL is tablename_columnname_seq
    const sequenceName = `${table.toLowerCase()}_${column}_seq`;
    try {
      // Ensure the column is actually a serial type by checking if the sequence exists
      const checkSeqExists = await pool.query(
        "SELECT 1 FROM pg_class WHERE relkind = 'S' AND relname = $1",
        [sequenceName]
      );

      if (checkSeqExists.rowCount > 0) {
        await pool.query(`
          SELECT setval($1, COALESCE((SELECT MAX(${column}) FROM "${table}"), 0) + 1, false)
        `, [sequenceName]); // Set next value to MAX+1, last param false means next nextval() will be this value
        console.log(`✅ Reset sequence ${sequenceName} for "${table}"."${column}"`);
      } else {
        console.log(`ℹ️ Sequence ${sequenceName} not found for "${table}"."${column}", skipping reset.`);
      }
    } catch (error) {
      // Log error but don't necessarily throw, as some tables might not have sequences if defined differently
      console.warn(`⚠️ Error resetting sequence for "${table}"."${column}" (Sequence: ${sequenceName}):`, error.message);
    }
  }
}

// Main setup function
async function setupDatabase() {
  try {
    console.log('🚀 Setting up database...');

    // Execute schema.sql
    const schemaPath = path.join(__dirname, 'schema.sql');
    console.log('📄 Executing schema.sql...');
    await executeSqlFile(schemaPath);
    console.log('✅ Database schema created successfully!');

    // Execute seed.sql
    const seedPath = path.join(__dirname, 'seed.sql');
    console.log('🌱 Executing seed.sql...');
    await executeSqlFile(seedPath);
    console.log('🌱 Database seeded successfully!');

    // Reset sequences after seeding
    console.log('🔄 Resetting sequences...');
    await resetSequences();
    console.log('🔄 All sequences reset successfully!');

    console.log('🎉 Database setup complete!');
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    // process.exit(1); // Exit if setup fails
  } finally {
    await pool.end(); // Close the pool connection
    console.log('🚪 Database pool closed.');
  }
}

// If run directly: node setUpDataBase.js
if (require.main === module) {
  setupDatabase();
}

module.exports = { setupDatabase, executeSqlFile, resetSequences }; // Export for potential programmatic use