module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: [['single', 'double', 'suite']] // Match the database CHECK constraint
      }
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [['occupied', 'available']]
      }
    },
    capacity: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    price_per_night: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    }
  }, {
    tableName: 'room',
    timestamps: false // Set to true if your DB tables have created_at/updated_at columns
  });

  Room.associate = (models) => {
    Room.hasMany(models.Reservation, { foreignKey: 'room_id' });
    Room.hasMany(models.PriceHistory, { foreignKey: 'room_id' });
    Room.hasMany(models.Equipment, { foreignKey: 'room_id' });
  };

  return Room;
};