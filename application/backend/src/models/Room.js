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
				isIn: [['occupied', 'available', 'maintenance']]
			}
		},
		capacity: { 
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 1
			}
		},
	}, {
		tableName: 'room',
		timestamps: false
	});

	Room.associate = (models) => {
		Room.hasMany(models.Reservation, { foreignKey: 'room_id' });
		Room.hasMany(models.PriceHistory, { foreignKey: 'room_id' });
		Room.hasMany(models.Equipment, { foreignKey: 'room_id' });
	};

	return Room;
};