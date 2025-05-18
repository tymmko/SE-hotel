const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.BIGINT, // Changed from INTEGER to BIGINT to match Guest id type
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true, // Guests might not have a username
    },
    email: {
      type: DataTypes.STRING,
      unique: true, // Keep unique if desired, or handle potential guest email conflicts
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true, // Guests will not have a password initially
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'guest', // Default role is guest
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: true, // Assuming guests provide this, but core users might not
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: true, // Assuming guests provide this, but core users might not
    },
    phone_number: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // updated_at is handled by timestamps: true
  }, {
    timestamps: true, // Enables createdAt and updatedAt
    underscored: true,
    tableName: 'users', // Explicitly set table name, was 'user' in Guest.js, usually plural 'users'
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password') && user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Reservation, { foreignKey: 'user_id' }); // Changed from guest_id
  };

  // Instance method to compare password for login
  User.prototype.isValidPassword = async function(password) {
    if (!this.password) return false; // No password set (e.g., for a guest user)
    return await bcrypt.compare(password, this.password);
  };

  return User;
};