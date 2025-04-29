// src/models/ServiceOrder.js
module.exports = (sequelize, DataTypes) => {
    const ServiceOrder = sequelize.define('ServiceOrder', {
      service_order_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      service_name: {
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
      date_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      stay_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      }
    }, {
      tableName: 'serviceorder',
      timestamps: false
    });
  
    ServiceOrder.associate = (models) => {
      ServiceOrder.belongsTo(models.Stay, { foreignKey: 'stay_id' });
    };
  
    return ServiceOrder;
  };