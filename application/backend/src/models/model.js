// src/models/model.js
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize with the Neon database URL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  define: {
    timestamps: true,
    underscored: true
  }
});

// Import model definitions
const defineRoom = require('./Room');
const defineGuest = require('./Guest');
const defineReservation = require('./Reservation');
const defineStay = require('./Stay');
const defineBill = require('./Bill');
const defineServiceOrder = require('./ServiceOrder');
const definePriceHistory = require('./PriceHistory');
const defineEquipment = require('./Equipment');

// Initialize models with sequelize instance
const Room = defineRoom(sequelize, DataTypes);
const Guest = defineGuest(sequelize, DataTypes);
const Reservation = defineReservation(sequelize, DataTypes);
const Stay = defineStay(sequelize, DataTypes);
const Bill = defineBill(sequelize, DataTypes);
const ServiceOrder = defineServiceOrder(sequelize, DataTypes);
const PriceHistory = definePriceHistory(sequelize, DataTypes);
const Equipment = defineEquipment(sequelize, DataTypes);

// Create model instances
const models = {
  Room,
  Guest,
  Reservation,
  Stay,
  Bill,
  ServiceOrder,
  PriceHistory,
  Equipment
};

// Set up associations between models
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Export models and sequelize instance
module.exports = {
  sequelize,
  Room,
  Guest,
  Reservation,
  Stay,
  Bill,
  ServiceOrder,
  PriceHistory,
  Equipment
};