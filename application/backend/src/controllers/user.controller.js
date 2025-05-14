// src/controllers/user.controller.js
class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async register(req, res, next) {
    try {
      // This can handle both full user registration and admin-defined users
      const { username, email, password, first_name, last_name, phone_number, role } = req.body;
      const user = await this.userService.register({ username, email, password, first_name, last_name, phone_number, role });
      res.status(201).json({ success: true, user });
    } catch (error) {
      // Basic error handling, can be enhanced with a global error handler
      if (error.message.includes('required') || error.message.includes('exists') || error.message.includes('Invalid email')) {
        res.status(400).json({ success: false, error: error.message });
      } else {
        next(error); // Pass to global error handler
      }
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const result = await this.userService.login({ username, password });
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      if (error.message.includes('required') || error.message.includes('Invalid username or password')) {
        res.status(400).json({ success: false, error: error.message });
      } else {
        next(error);
      }
    }
  }

  async getAllUsers(req, res, next) {
    try {
      // Add query parameter handling for filtering, e.g., by role
      const queryOptions = {};
      if (req.query.role) {
        queryOptions.where = { role: req.query.role };
      }
      const users = await this.userService.getAllUsers(queryOptions);
      res.status(200).json({
        success: true,
        count: users.length,
        users
      });
    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      const user = await this.userService.getUserById(req.params.id);
      res.status(200).json({
        success: true,
        user
      });
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  async createUserAsGuest(req, res, next) { // Specifically for creating guest-like users
    try {
      const { first_name, last_name, email, phone_number } = req.body;
      const guestUser = await this.userService.createUserAsGuest({ first_name, last_name, email, phone_number });
      res.status(201).json({
        success: true,
        user: guestUser
      });
    } catch (error) {
      if (error.message.includes('required') || error.message.includes('Invalid email') || error.message.includes('exists')) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      // Exclude role from direct update by users unless specific logic allows it
      // Password changes should ideally go through a separate, more secure endpoint.
      const { role, password, ...updateData } = req.body;

      // If an admin is updating, they might be allowed to change the role.
      // This requires checking req.user.role (from authMiddleware)
      let finalUpdateData = { ...updateData };
      if (req.user && req.user.role === 'admin' && role !== undefined) {
          finalUpdateData.role = role;
      }
      // Handle password update separately or ensure service layer manages hashing if password field is present
      if (password) {
          finalUpdateData.password = password; // Service's updateUser should handle hashing via model hook
      }


      const user = await this.userService.updateUser(req.params.id, finalUpdateData);
      res.status(200).json({
        success: true,
        user
      });
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      if (error.message.includes('Invalid email') || error.message.includes('Username cannot be changed')) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }
}

module.exports = UserController;