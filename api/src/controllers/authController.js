const authService = require("../services/authService");

// REGISTER
exports.register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    return res.status(201).json({ message: "User registered", user });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.loginUser(email, password);
    return res.json({
      message: "Login successful",
      ...data,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
