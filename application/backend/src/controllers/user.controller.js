// src/controllers/user.controller.js
// (Your uploaded version - adapted for clarity on what's passed to service)
class UserController {
  constructor(userService) {
    this.userService = userService; // This will be the refactored UserService
  }

  async register(req, res) { // For POST /register route
    try {
      // The `/register` route in your apiRoutes.js is simple.
      // It calls this controller method, which calls userService.register.
      // userService.register now makes an 'admin' user by default.
      const { username, email, password, first_name, last_name, phone_number } = req.body;
      
      // The role 'admin' is now set by the UserService.register method.
      // UserController just passes the necessary data.
      const user = await this.userService.register({ 
          username, 
          email, 
          password,
          first_name, // Pass these if your client sends them for admin registration
          last_name,
          phone_number
      });
      // Your original controller response: res.status(201).json(user);
      // The refactored userService.register returns the created user object.
      res.status(201).json(user); 
    } catch (error) {
      // Match error messages from the updated UserService
      if (error.message.includes('required') || error.message.includes('already exists')) {
          res.status(400).json({ error: error.message });
      } else {
          // For other errors, you might want a more generic message or let a global error handler deal with it
          console.error("Registration Error:", error); // Log the full error server-side
          res.status(500).json({ error: "An unexpected error occurred during registration." });
      }
    }
  }

  async login(req, res) { // For POST /login route
    try {
      const { username, password } = req.body;
      const result = await this.userService.login({ username, password });
      // Your original controller response: res.status(200).json(result);
      // The refactored userService.login returns { token, user: { id, username, email, role } }
      res.status(200).json(result);
    } catch (error) {
      if (error.message.includes('Invalid username or password') || error.message.includes('required')) {
         res.status(400).json({ error: error.message });
      } else if (error.message.includes('Authentication system configuration error')) {
         console.error("Login Configuration Error:", error);
         res.status(500).json({ error: "Server authentication configuration error." });
      }
      else {
        console.error("Login Error:", error);
        res.status(500).json({ error: "An unexpected error occurred during login." });
      }
    }
  }
}

module.exports = UserController;