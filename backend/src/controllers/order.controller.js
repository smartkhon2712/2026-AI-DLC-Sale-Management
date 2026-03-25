const orderService = require('../services/order.service');
const customerService = require('../services/customer.service');
const { successResponse } = require('../utils/response');

exports.createOrder = async (req, res, next) => {
  try {
    const { phone, customerName, email, items } = req.body;
    
    // Tự động phân luồng Customer nếu chưa có
    const customer = await customerService.findOrCreateCustomer({ phone, name: customerName, email });
    
    const order = await orderService.createOrder(customer.id, items);
    return successResponse(res, order, 'Order created successfully');
  } catch (error) {
    next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await orderService.updateOrderStatus(id, status);
    return successResponse(res, result, 'Order status updated successfully');
  } catch (error) {
    next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const result = await orderService.getOrders();
    return successResponse(res, result);
  } catch (error) {
    next(error);
  }
};
