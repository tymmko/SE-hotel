// src/models/Reservation.js
module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define('Reservation', {
      reservation_id: {
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
        allowNull: false,
        validate: {
          isLaterThanCheckIn(value) {
            if (new Date(value) <= new Date(this.check_in_date)) {
              throw new Error('Check-out date must be after check-in date');
            }
          }
        }
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          isIn: [['Confirmed', 'Canceled']]
        }
      },
      room_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      guest_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      }
    }, {
      tableName: 'reservation',
      timestamps: false
    });
  
    Reservation.associate = (models) => {
      Reservation.belongsTo(models.Room, { foreignKey: 'room_id' });
      Reservation.belongsTo(models.Guest, { foreignKey: 'guest_id' });
      Reservation.hasMany(models.Stay, { foreignKey: 'reservation_id' });
    };
  
    return Reservation;
  };