// src/models/Stay.js
module.exports = (sequelize, DataTypes) => {
    const Stay = sequelize.define('Stay', {
      stay_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      check_in_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      check_out_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      reservation_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      }
    }, {
      tableName: 'stay',
      timestamps: false
    });
  
    Stay.associate = (models) => {
      Stay.belongsTo(models.Reservation, { foreignKey: 'reservation_id' });
      Stay.hasMany(models.Bill, { foreignKey: 'stay_id' });
      Stay.hasMany(models.ServiceOrder, { foreignKey: 'stay_id' });
    };
  
    return Stay;
  };