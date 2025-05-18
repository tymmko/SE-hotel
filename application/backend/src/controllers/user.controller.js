/**
 * Controller for managing user-related endpoints
 * Handles HTTP requests for user registration and login
 */
class UserController {
  /**
   * @param {UserService} userService - Service for user operations
   */
  constructor(userService) {
    this.userService = userService;
  }

  /**
   * Register a new user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Promise<void>} Sends a JSON response with the created user
   * @example
   * POST /register
   * {
   *   "username": "johndoe",
   *   "email": "john@example.com",
   *   "password": "secure123",
   *   "first_name": "John",
   *   "last_name": "Doe",
   *   "phone_number": "123-456-7890"
   * }
   */
  async register(req, res) {
    try {
      const { username, email, password, first_name, last_name, phone_number } = req.body;
      const user = await this.userService.register({ 
        username, 
        email, 
        password,
        first_name,
        last_name,
        phone_number
      });
      res.status(201).json(user);
    } catch (error) {
      if (error.message.includes('required') || error.message.includes('already exists')) {
        res.status(400).json({ error: error.message });
      } else {
        console.error("Registration Error:", error);
        res.status(500).json({ error: "An unexpected error occurred during registration." });
      }
    }
  }

  /**
   * Log in a user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Promise<void>} Sends a JSON response with the authentication token and user details
   * @example
   * POST /login
   * {
   *   "username": "johndoe",
   *   "password": "secure123"
   * }
   */
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await this.userService.login({ username, password });
      res.status(200).json(result);
    } catch (error) {
      if (error.message.includes('Invalid username or password') || error.message.includes('required')) {
        res.status(400).json({ error: error.message });
      } else if (error.message.includes('Authentication system configuration error')) {
        console.error("Login Configuration Error:", error);
        res.status(500).json({ error: "Server authentication configuration error." });
      } else {
        console.error("Login Error:", error);
        res.status(500).json({ error: "An unexpected error occurred during login." });
      }
    }
  }
}

module.exports = UserController;