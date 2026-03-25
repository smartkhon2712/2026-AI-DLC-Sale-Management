const express = require('express');
const router = express.Router();

const { authenticateToken, requireAdmin } = require('../middlewares/auth.middleware');

const authController = require('../controllers/auth.controller');
const productController = require('../controllers/product.controller');
const orderController = require('../controllers/order.controller');
const reportController = require('../controllers/report.controller');

// Public
router.post('/auth/login', authController.login);

// Protected Routes
router.use(authenticateToken);

// Category routes
router.get('/categories', productController.getCategories);
router.post('/categories', requireAdmin, productController.createCategory);

// Product routes
router.get('/products', productController.getProducts);
router.post('/products', requireAdmin, productController.createProduct);

// Order routes
router.get('/orders', orderController.getOrders);
router.post('/orders', orderController.createOrder);
router.patch('/orders/:id/status', orderController.updateStatus); // e.g. move to PAID

// Report routes (Admin Only)
router.get('/reports/metrics', requireAdmin, reportController.getMetrics);

module.exports = router;
