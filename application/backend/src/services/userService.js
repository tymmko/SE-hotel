/**
 * Service for managing user-related business logic
 * Handles user registration and authentication
 */
class UserService {
  /**
   * @param {UserRepository} userRepository - Repository for user data
   */
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Register a new user with 'admin' role
   * @param {Object} userData - User data
   * @param {string} userData.username - Username
   * @param {string} userData.email - Email address
   * @param {string} userData.password - Password
   * @param {string} [userData.first_name] - First name
   * @param {string} [userData.last_name] - Last name
   * @param {string} [userData.phone_number] - Phone number
   * @returns {Promise<Object>} Created user
   * @throws {Error} If required fields are missing or user already exists
   */
  async register({ username, email, password, first_name, last_name, phone_number }) {
    if (!username || !email || !password) {
      throw new Error('Username, email, and password are required');
    }

    const existingUserByEmail = await this.userRepository.findUserByEmail(email);
    if (existingUserByEmail) {
      throw new Error('User already exists (email conflict)');
    }
    const existingUserByUsername = await this.userRepository.findUserByUsername(username);
    if (existingUserByUsername) {
      throw new Error('User already exists (username conflict)');
    }

    const user = await this.userRepository.createUser({
      username,
      email,
      password,
      first_name,
      last_name,
      phone_number,
      role: 'admin'
    });

    return user;
  }

  /**
   * Log in a user and generate a JWT
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.username - Username
   * @param {string} credentials.password - Password
   * @returns {Promise<Object>} Object containing JWT and user details
   * @throws {Error} If credentials are invalid or configuration is incorrect
   */
  async login({ username, password }) {
    // Use findUserByUsername from unified repo, requesting password for comparison
    const user = await this.userRepository.findUserByUsername(username);
    
    if (!user) {
      throw new Error('Invalid username or password');
    }
    if (!user.password) {
      throw new Error('Invalid username or password (account not configured for password login).');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables!");
      throw new Error('Authentication system configuration error.');
    }

    const tokenPayload = { id: user.id, username: user.username, email: user.email, role: user.role };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { token, user: tokenPayload };
  }
}

module.exports = UserService;