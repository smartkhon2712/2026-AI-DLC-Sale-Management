<template>
  <div class="h-full flex gap-6 p-4 md:p-8 animate-[fadeIn_0.5s_ease-out]">
    <!-- Products Left -->
    <div class="w-2/3 bg-white rounded-[2rem] border border-gray-100 flex flex-col p-6 shadow-sm relative overflow-hidden">
      
      <div class="mb-6 relative flex items-center bg-gray-50 rounded-2xl p-2 border border-gray-200 focus-within:border-primary transition-colors">
        <span class="px-4 text-xl opacity-50">🔍</span>
        <input type="text" v-model="keyword" @input="search" placeholder="Search products..." class="w-full bg-transparent text-black placeholder-gray-400 p-2 focus:outline-none font-bold tracking-wide" data-testid="pos-search-input">
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-3 gap-5 overflow-y-auto pr-2 custom-scrollbar pb-4">
        <div v-for="product in products" :key="product.id" class="bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-primary p-5 rounded-2xl flex flex-col justify-between transition-all hover:scale-[1.02] cursor-pointer group" @click="product.stock > 0 ? addToCart(product) : null" :class="{'opacity-60 saturate-50': product.stock <= 0}">
          
          <div>
            <h3 class="font-black text-black text-lg leading-tight group-hover:text-primary transition-colors">{{ product.name }}</h3>
            <p class="text-xs text-gray-400 mt-1 uppercase font-bold tracking-widest">#{{ product.sku }}</p>
          </div>

          <div class="mt-6 flex justify-between items-end">
            <div>
              <p class="text-[0.65rem] uppercase font-black tracking-widest mb-1" :class="product.stock > 0 ? 'text-primary' : 'text-red-500'">{{product.stock > 0 ? 'In Stock' : 'Out of Stock'}}</p>
              <span class="font-black text-black text-2xl tracking-tighter">${{ formatCurrency(product.price) }}</span>
            </div>
            <div v-if="product.stock > 0" class="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
              <span class="text-xl font-black">＋</span>
            </div>
          </div>
        </div>

        <div v-if="products.length === 0" class="col-span-full py-20 text-center">
            <span class="text-4xl opacity-30">📦</span>
            <p class="text-gray-400 font-bold mt-4 uppercase tracking-widest text-sm">No items found.</p>
        </div>
      </div>
    </div>

    <!-- Cart Right -->
    <div class="w-1/3 bg-black rounded-[2rem] flex flex-col shadow-2xl overflow-hidden relative border border-gray-900">
      <div class="p-6 border-b border-white/10 flex justify-between items-center bg-black/60 backdrop-blur-md">
        <h3 class="font-black text-xl text-white tracking-tight">Current Cart</h3>
        <span class="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-primary/30">{{ cart.length }} items</span>
      </div>
      
      <div class="p-6 overflow-y-auto flex-1 custom-scrollbar">
        <transition-group name="list">
          <div v-for="item in cart" :key="item.productId" class="flex flex-col mb-4 p-4 rounded-xl bg-gray-900 border border-gray-800 group hover:bg-gray-800 hover:border-gray-700 transition-colors">
            <div class="flex justify-between items-start mb-2">
              <p class="font-bold text-white text-sm w-3/4 leading-tight">{{ item.name }}</p>
              <button @click="removeItem(item.productId)" class="text-gray-500 hover:text-red-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">Remove</button>
            </div>
            <div class="flex justify-between items-center mt-2">
              <p class="text-xs font-bold text-gray-400 tracking-widest">${{ formatCurrency(item.price) }} <span class="text-gray-600 px-1">×</span> <span class="text-primary">{{ item.quantity }}</span></p>
              <p class="font-black text-primary">${{ formatCurrency(item.price * item.quantity) }}</p>
            </div>
          </div>
        </transition-group>
        <div v-if="cart.length === 0" class="flex flex-col items-center justify-center text-gray-600 py-16 h-full">
          <span class="text-4xl opacity-20 mb-4 text-white">🛒</span>
          <span class="text-xs uppercase tracking-widest font-black text-gray-500">Cart is Empty</span>
        </div>
      </div>
      
      <!-- Checkout Panel -->
      <div class="p-6 bg-gray-900/80 border-t border-gray-800 relative backdrop-blur-lg">
        <div class="flex justify-between items-end mb-6">
          <span class="text-gray-400 font-bold uppercase tracking-widest text-xs mb-1 block">Total Amount</span>
          <span class="text-4xl font-black text-white">${{ formatCurrency(total) }}</span>
        </div>
        
        <div class="space-y-3 mb-6">
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-sm">📱</span>
            <input type="text" v-model="customerPhone" placeholder="Customer Phone" class="w-full bg-black border border-gray-700 p-3 pl-10 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary outline-none text-white placeholder-gray-600" data-testid="pos-customer-phone">
          </div>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-sm">👤</span>
            <input type="text" v-model="customerName" placeholder="Customer Name" class="w-full bg-black border border-gray-700 p-3 pl-10 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary outline-none text-white placeholder-gray-600" data-testid="pos-customer-name">
          </div>
        </div>

        <button @click="checkout" data-testid="pos-checkout-btn" class="w-full bg-primary text-white py-4 rounded-xl font-black text-lg transition-all shadow-lg shadow-primary/30 hover:bg-primary-hover active:scale-95 disabled:opacity-50 disabled:grayscale disabled:scale-100 uppercase tracking-widest" :disabled="cart.length === 0 || loading">
          {{ loading ? 'Processing...' : 'Checkout' }}
        </button>

        <transition name="fade">
          <div v-if="msg" class="absolute bottom-full left-0 right-0 mb-4 mx-6 p-4 rounded-xl border font-black text-center text-sm shadow-2xl tracking-wide uppercase z-20 backdrop-blur-xl" :class="success ? 'bg-primary/20 text-primary border-primary/30' : 'bg-red-500/20 text-red-500 border-red-500/30'">
            {{ msg }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useOrderStore } from '../store/order.store'
import { useProductStore } from '../store/product.store'
import { formatCurrency } from '../utils/formatters'

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

let msgTimeout = null;

const checkout = async () => {
  loading.value = true
  msg.value = ''
  try {
    await orderStore.checkout(customerPhone.value, customerName.value)
    success.value = true
    msg.value = 'Order successfully created!'
    customerPhone.value = ''
    customerName.value = ''
    productStore.loadProducts()
  } catch (e) {
    success.value = false
    msg.value = e.message || 'Checkout failed.'
  } finally {
    loading.value = false
    if(msgTimeout) clearTimeout(msgTimeout);
    msgTimeout = setTimeout(() => { msg.value = '' }, 4000);
  }
}

onMounted(() => {
  productStore.loadProducts()
})
</script>

<style scoped>
.list-enter-active, .list-leave-active { transition: all 0.25s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateX(20px); }
</style>
