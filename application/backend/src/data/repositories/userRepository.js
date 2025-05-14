const bcrypt = require('bcrypt');

class UserRepository {
  constructor(models) {
    if (!models.User) {
      throw new Error('User model is not defined in models');
    }
    this.User = models.User;
    if (!this.User.findOne) {
      throw new Error('User model is missing findOne method, possibly due to Sequelize initialization failure');
    }
  }

  async createUser({ username, email, password }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.User.create({
        username,
        email,
        password: hashedPassword,
        role: 'admin',
        created_at: new Date(),
      });
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
      };
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await this.User.findOne({ where: { email } });
      return user || null;
    } catch (error) {
      throw new Error(`Failed to find user by email: ${error.message}`);
    }
  }

  async findUserByUsername(username) {
    try {
      const user = await this.User.findOne({ where: { username } });
      return user || null;
    } catch (error) {
      throw new Error(`Failed to find user by username: ${error.message}`);
    }
  }
}

module.exports = UserRepository;