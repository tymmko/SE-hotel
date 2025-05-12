const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register({ username, email, password }) {
    if (!username || !email || !password) {
      throw new Error('Username, email, and password are required');
    }

    const existingUser = await this.userRepository.findUserByEmail(email) || 
                        await this.userRepository.findUserByUsername(username);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = await this.userRepository.createUser({ username, email, password });
    return { id: user.id, username: user.username, email: user.email, role: user.role };
  }

  async login({ username, password }) {
    const user = await this.userRepository.findUserByUsername(username);
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return { token, user: { id: user.id, username: user.username, email: user.email, role: user.role } };
  }
}

module.exports = UserService;