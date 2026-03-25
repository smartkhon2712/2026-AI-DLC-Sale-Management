const reportService = require('../services/report.service');
const { successResponse } = require('../utils/response');

exports.getMetrics = async (req, res, next) => {
  try {
    const result = await reportService.getDashboardMetrics();
    return successResponse(res, result);
  } catch (error) {
    next(error);
  }
};
