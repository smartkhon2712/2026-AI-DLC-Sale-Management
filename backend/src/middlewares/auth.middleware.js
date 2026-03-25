const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/response');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return errorResponse(res, 401, 'Unauthorized: No Token Provided', 'UNAUTHORIZED');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return errorResponse(res, 403, 'Forbidden: Invalid Token', 'FORBIDDEN');
    req.user = user;
    next();
  });
};

const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    return errorResponse(res, 403, 'Forbidden: Require Admin Role', 'FORBIDDEN_ROLE');
  }
};

module.exports = { authenticateToken, requireAdmin };
