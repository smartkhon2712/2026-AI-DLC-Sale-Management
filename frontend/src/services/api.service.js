import apiClient from './axios'

export const AuthService = {
  login: (username, password) => apiClient.post('/auth/login', { username, password })
}

export const ProductService = {
  getProducts: (keyword = '') => apiClient.get(`/products?keyword=${keyword}`),
  getCategories: () => apiClient.get('/categories')
}

export const OrderService = {
  submitOrder: (orderData) => apiClient.post('/orders', orderData)
}

export const ReportService = {
  getMetrics: () => apiClient.get('/reports/metrics')
}
