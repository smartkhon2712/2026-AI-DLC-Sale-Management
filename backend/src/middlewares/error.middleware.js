const { errorResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error(err);
  return errorResponse(res, 500, err.message || 'Internal Server Error', 'INTERNAL_SERVER_ERROR');
};

module.exports = errorHandler;
