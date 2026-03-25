const authService = require('../services/auth.service');
const { successResponse } = require('../utils/response');

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    return successResponse(res, result, 'Login successful');
  } catch (error) {
    next(error);
  }
};
