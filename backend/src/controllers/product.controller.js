const productService = require('../services/product.service');
const { successResponse } = require('../utils/response');

exports.getCategories = async (req, res, next) => {
  try {
    const data = await productService.getCategories();
    return successResponse(res, data);
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const data = await productService.createCategory(req.body);
    return successResponse(res, data, 'Category created');
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    const data = await productService.getProducts(keyword);
    // Security RBAC rule: hide cost value if not admin
    if (req.user && req.user.role !== 'ADMIN') {
      data.forEach(p => delete p.cost);
    }
    return successResponse(res, data);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const data = await productService.createProduct(req.body);
    return successResponse(res, data, 'Product created');
  } catch (error) {
    next(error);
  }
};
