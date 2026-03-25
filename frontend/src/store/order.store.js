import { defineStore } from 'pinia'
import { OrderService } from '../services/api.service'

export const useOrderStore = defineStore('order', {
  state: () => ({
    cart: []
  }),
  getters: {
    totalInfo: (state) => state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  },
  actions: {
    addItem(product, quantity = 1) {
      const existing = this.cart.find(i => i.productId === product.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        this.cart.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity
        })
      }
    },
    removeItem(productId) {
      this.cart = this.cart.filter(i => i.productId !== productId)
    },
    clearCart() {
      this.cart = []
    },
    async checkout(phone, customerName) {
      const payload = {
        phone,
        customerName,
        items: this.cart.map(i => ({ productId: i.productId, quantity: i.quantity }))
      }
      const res = await OrderService.submitOrder(payload)
      if (res.success) {
        this.clearCart()
        return res.data
      }
      throw new Error(res.message)
    }
  }
})
