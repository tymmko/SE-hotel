// src/models/Guest.js
module.exports = (sequelize, DataTypes) => {
    const Guest = sequelize.define('Guest', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      phone_number: {
        type: DataTypes.STRING(50),
        allowNull: true
      }
    }, {
      tableName: 'guest',
      timestamps: false
    });
  
    Guest.associate = (models) => {
      Guest.hasMany(models.Reservation, { foreignKey: 'guest_id' });
    };
  
    return Guest;
  };