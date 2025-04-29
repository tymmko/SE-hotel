// src/models/PriceHistory.js
module.exports = (sequelize, DataTypes) => {
    const PriceHistory = sequelize.define('PriceHistory', {
      price_history_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      end_date: {
        type: DataTypes.DATEONLY,
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
      tableName: 'pricehistory',
      timestamps: false
    });
  
    PriceHistory.associate = (models) => {
      PriceHistory.belongsTo(models.Room, { foreignKey: 'room_id' });
    };
  
    return PriceHistory;
  };