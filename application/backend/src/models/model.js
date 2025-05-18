const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  define: {
    timestamps: true, // Ensure this is true if you want sequelize to manage createdAt/updatedAt
    underscored: true,
  },
});

// Import model definitions
const defineRoom = require('./Room');
// const defineGuest = require('./Guest'); // REMOVED
const defineReservation = require('./Reservation');
const defineStay = require('./Stay');
const defineBill = require('./Bill');
const defineServiceOrder = require('./ServiceOrder');
const definePriceHistory = require('./PriceHistory');
const defineEquipment = require('./Equipment');
const defineUser = require('./User');

// Initialize models
const Room = defineRoom(sequelize, DataTypes);
// const Guest = defineGuest(sequelize, DataTypes); // REMOVED
const Reservation = defineReservation(sequelize, DataTypes);
const Stay = defineStay(sequelize, DataTypes);
const Bill = defineBill(sequelize, DataTypes);
const ServiceOrder = defineServiceOrder(sequelize, DataTypes);
const PriceHistory = definePriceHistory(sequelize, DataTypes);
const Equipment = defineEquipment(sequelize, DataTypes);
const User = defineUser(sequelize, DataTypes); // User is already defined

// Create model instances
const models = {
  Room,
  // Guest, // REMOVED
  Reservation,
  Stay,
  Bill,
  ServiceOrder,
  PriceHistory,
  Equipment,
  User,
};

// Set up associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  sequelize,
  Room,
  // Guest, // REMOVED
  Reservation,
  Stay,
  Bill,
  ServiceOrder,
  PriceHistory,
  Equipment,
  User,
  // Also export models object if it's used elsewhere for convenience
  models, // ADDED for consistency if other parts of the app rely on the 'models' object
};