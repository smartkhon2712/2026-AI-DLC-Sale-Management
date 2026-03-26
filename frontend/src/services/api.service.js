import apiClient from './axios'

export const AuthService = {
  login: (username, password) => apiClient.post('/auth/login', { username, password })
}

export const ProductService = {
  getProducts: (keyword = '') => apiClient.get(`/products?keyword=${keyword}`),
  getCategories: () => apiClient.get('/categories'),
  createCategory: (data) => apiClient.post('/categories', data),
  createProduct: (data) => apiClient.post('/products', data)
}

export const OrderService = {
  submitOrder: (orderData) => apiClient.post('/orders', orderData),
  getOrders: () => apiClient.get('/orders'),
  updateStatus: (id, status) => apiClient.patch(`/orders/${id}/status`, { status })
}

export const ReportService = {
  getMetrics: () => apiClient.get('/reports/metrics')
}
