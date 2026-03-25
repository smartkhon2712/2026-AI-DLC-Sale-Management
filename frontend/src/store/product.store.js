import { defineStore } from 'pinia'
import { ProductService } from '../services/api.service'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: []
  }),
  actions: {
    async loadProducts(keyword = '') {
      const res = await ProductService.getProducts(keyword)
      if (res.success) {
        this.products = res.data
      }
    }
  }
})
