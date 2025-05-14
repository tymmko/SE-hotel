class UserController {
    constructor(userService) {
      this.userService = userService;
    }
  
    async register(req, res) {
      try {
        const { username, email, password } = req.body;
        const user = await this.userService.register({ username, email, password });
        res.status(201).json(user);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  
    async login(req, res) {
      try {
        const { username, password } = req.body;
        const result = await this.userService.login({ username, password });
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  }
  
  module.exports = UserController;