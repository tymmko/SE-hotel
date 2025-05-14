// src/models/Bill.js
module.exports = (sequelize, DataTypes) => {
		const Bill = sequelize.define('Bill', {
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				autoIncrement: true
			},
			total_amount: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				validate: {
					min: 0
				}
			},
			status: {
				type: DataTypes.STRING(50),
				allowNull: false,
				validate: {
					isIn: [['paid', 'unpaid']]
				}
			},
			stay_id: {
				type: DataTypes.BIGINT,
				allowNull: false
			}
		}, {
			tableName: 'bill',
			timestamps: false
		});
	
		Bill.associate = (models) => {
			Bill.belongsTo(models.Stay, { foreignKey: 'stay_id' });
		};
	
		return Bill;
	};