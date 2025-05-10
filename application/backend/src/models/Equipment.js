// src/models/Equipment.js
module.exports = (sequelize, DataTypes) => {
    const Equipment = sequelize.define('Equipment', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0
        }
      },
      room_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      }
    }, {
      tableName: 'equipment',
      timestamps: false
    });
  
    Equipment.associate = (models) => {
      Equipment.belongsTo(models.Room, { foreignKey: 'id' });
    };
  
    return Equipment;
  };