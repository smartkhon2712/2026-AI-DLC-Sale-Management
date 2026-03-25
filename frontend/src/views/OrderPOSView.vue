<template>
  <div class="flex h-full gap-6">
    <!-- Products Left -->
    <div class="w-2/3 bg-white rounded-lg shadow flex flex-col p-4">
      <div class="mb-4">
        <input type="text" v-model="keyword" @input="search" placeholder="Search product SKU or Names..." class="w-full border p-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none" data-testid="pos-search-input">
      </div>
      <div class="grid grid-cols-3 gap-4 overflow-y-auto pr-2">
        <div v-for="product in products" :key="product.id" class="border p-4 rounded-lg flex flex-col justify-between hover:shadow-lg transition">
          <div>
            <h3 class="font-bold text-gray-800 text-lg">{{ product.name }}</h3>
            <p class="text-sm text-gray-500 uppercase">#{{ product.sku }}</p>
            <p class="text-sm mt-2" :class="product.stock > 0 ? 'text-green-600' : 'text-red-500'">Stock: {{ product.stock }}</p>
          </div>
          <div class="mt-4 flex justify-between items-center">
            <span class="font-bold text-blue-800 h-full flex items-center text-xl">${{ product.price }}</span>
            <button @click="addToCart(product)" data-testid="pos-add-item-btn" class="bg-gray-800 text-white px-4 py-2 rounded-md font-medium hover:bg-black transition disabled:opacity-50" :disabled="product.stock <= 0">Add</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart Right -->
    <div class="w-1/3 bg-white rounded-lg shadow flex flex-col">
      <div class="p-4 bg-gray-900 text-white font-bold rounded-t-lg flex justify-between">
        <span>Current Cart</span>
        <span>{{ cart.length }} items</span>
      </div>
      <div class="p-4 overflow-y-auto flex-1">
        <div v-for="item in cart" :key="item.productId" class="flex flex-col justify-between mb-4 pb-4 border-b border-gray-100 relative group">
          <p class="font-bold text-gray-800">{{ item.name }}</p>
          <div class="flex justify-between items-center mt-2">
            <p class="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">${{ item.price }} x {{ item.quantity }}</p>
            <button @click="removeItem(item.productId)" class="text-red-500 hover:text-red-700 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">Delete</button>
          </div>
        </div>
        <div v-if="cart.length === 0" class="flex flex-col items-center justify-center text-gray-400 py-12">
          <!-- icon placeholder -->
          <span class="text-xl">Cart is empty</span>
        </div>
      </div>
      
      <!-- Checkout Panel -->
      <div class="p-5 bg-gray-50 rounded-b-lg border-t-2 border-gray-100">
        <div class="flex justify-between items-center font-bold text-2xl mb-6">
          <span class="text-gray-700">Total:</span>
          <span class="text-blue-700">${{ total.toFixed(2) }}</span>
        </div>
        <label class="text-xs font-semibold text-gray-600 mb-1 block">Customer Data (Optional)</label>
        <input type="text" v-model="customerPhone" placeholder="Enter phone number" class="w-full border border-gray-300 p-2 rounded mb-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" data-testid="pos-customer-phone">
        <input type="text" v-model="customerName" placeholder="Enter full name" class="w-full border border-gray-300 p-2 rounded mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none" data-testid="pos-customer-name">
        <button @click="checkout" data-testid="pos-checkout-btn" class="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-700 shadow-md transition disabled:bg-gray-300 disabled:shadow-none" :disabled="cart.length === 0 || loading">
          {{ loading ? 'Processing...' : 'Charge / Checkout' }}
        </button>
        <p v-if="msg" class="text-center mt-3 text-sm font-medium" :class="{'text-green-600': success, 'text-red-600': !success}">{{ msg }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useOrderStore } from '../store/order.store'
import { useProductStore } from '../store/product.store'

const orderStore = useOrderStore()
const productStore = useProductStore()

const keyword = ref('')
const customerPhone = ref('')
const customerName = ref('')
const msg = ref('')
const success = ref(true)
const loading = ref(false)

const products = computed(() => productStore.products)
const cart = computed(() => orderStore.cart)
const total = computed(() => orderStore.totalInfo)

const search = () => productStore.loadProducts(keyword.value)
const addToCart = (p) => orderStore.addItem(p, 1)
const removeItem = (id) => orderStore.removeItem(id)

const checkout = async () => {
  loading.value = true
  msg.value = ''
  try {
    await orderStore.checkout(customerPhone.value, customerName.value)
    success.value = true
    msg.value = 'Order successfully created and charged!'
    customerPhone.value = ''
    customerName.value = ''
    productStore.loadProducts() // refresh stock data dynamically
  } catch (e) {
    success.value = false
    msg.value = e.message || 'Checkout failed'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  productStore.loadProducts()
})
</script>
