exports.successResponse = (res, data, message = 'Success') => {
  return res.status(200).json({
    success: true,
    data,
    message
  });
};

exports.errorResponse = (res, statusCode, message, errorCode = 'ERROR') => {
  return res.status(statusCode).json({
    success: false,
    message,
    errorCode
  });
};
