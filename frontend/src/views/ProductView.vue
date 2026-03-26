<template>
  <div class="h-full flex flex-col p-6 md:p-8 relative">
    <div class="flex justify-between items-end mb-8 shrink-0">
      <div>
        <h2 class="text-4xl font-black text-black tracking-tight">Inventory</h2>
        <p class="text-gray-500 mt-2 text-sm font-bold tracking-widest uppercase">Stock Management & Catalog</p>
      </div>
      <div v-if="isAdmin" class="flex gap-4">
        <button @click="showCategoryModal = true" class="px-5 py-2.5 bg-black hover:bg-gray-800 rounded-xl transition-all shadow-lg text-sm font-bold text-white flex items-center gap-2 hover:scale-105 active:scale-95">
          <span class="text-lg">📁</span> New Category
        </button>
        <button @click="showProductModal = true" class="px-5 py-2.5 bg-primary hover:bg-primary-hover rounded-xl transition-all shadow-lg shadow-primary/30 text-sm font-bold text-white flex items-center gap-2 hover:scale-105 active:scale-95">
          <span class="text-lg">➕</span> Add Product
        </button>
      </div>
    </div>

    <!-- Data Table -->
    <div class="flex-1 bg-white rounded-[2rem] border border-gray-100 overflow-hidden flex flex-col shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)]">
      <div class="overflow-x-auto flex-1 custom-scrollbar relative">
        <table class="min-w-full divide-y divide-gray-100 whitespace-nowrap">
          <thead class="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th class="px-8 py-5 text-left text-xs font-black text-gray-500 uppercase tracking-widest">SKU</th>
              <th class="px-8 py-5 text-left text-xs font-black text-gray-500 uppercase tracking-widest">Item Name</th>
              <th class="px-8 py-5 text-left text-xs font-black text-gray-500 uppercase tracking-widest">Category</th>
              <th class="px-8 py-5 text-left text-xs font-black text-gray-500 uppercase tracking-widest">Sale Price</th>
              <th class="px-8 py-5 text-left text-xs font-black text-gray-500 uppercase tracking-widest">Units Left</th>
              <th class="px-8 py-5 text-right text-xs font-black text-gray-500 uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="product in products" :key="product.id" class="hover:bg-primary-light/30 transition-colors group">
              <td class="px-8 py-6 text-sm font-black text-black">#{{ product.sku }}</td>
              <td class="px-8 py-6 text-sm font-bold text-gray-700 group-hover:text-primary transition-colors">{{ product.name }}</td>
              <td class="px-8 py-6 text-sm font-bold text-gray-500">
                <span class="bg-gray-100 rounded-lg px-3 py-1">{{ product.category?.name || 'Uncategorized' }}</span>
              </td>
              <td class="px-8 py-6 text-base font-black text-black">${{ formatCurrency(product.price) }}</td>
              <td class="px-8 py-6 text-sm">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full" :class="product.stock > 10 ? 'bg-primary' : 'bg-red-500 animate-pulse'"></div>
                  <span class="font-bold text-black">{{ formatNumber(product.stock) }}</span>
                </div>
              </td>
              <td class="px-8 py-6 text-right text-sm">
                <span class="px-3 py-1.5 inline-flex text-[0.65rem] uppercase tracking-widest font-black rounded-full" :class="product.status === 'ACTIVE' ? 'bg-primary-light text-primary' : 'bg-red-50 text-red-500'">
                  {{ product.status }}
                </span>
              </td>
            </tr>
            <tr v-if="products.length === 0">
              <td colspan="6" class="px-8 py-24 text-center">
                <div class="flex flex-col items-center justify-center text-gray-400">
                  <span class="text-4xl mb-4 opacity-50">📂</span>
                  <p class="font-black tracking-widest uppercase text-sm">No Products</p>
                  <p class="text-xs mt-2 font-bold">Add products to populate inventory.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modals -->
    <!-- Category Modal -->
    <div v-if="showCategoryModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div class="bg-white w-full max-w-md p-10 rounded-[2rem] shadow-2xl relative">
        <button @click="showCategoryModal = false" class="absolute top-6 right-6 text-gray-400 hover:text-black font-bold transition-colors">✖</button>
        <h3 class="text-3xl font-black text-black mb-8 tracking-tight">New Category</h3>
        <form @submit.prevent="submitCategory" class="space-y-5">
          <div><label class="block text-xs uppercase font-black text-gray-500 mb-2">Category Name</label>
          <input v-model="catForm.name" required class="glass-input w-full bg-gray-50" placeholder="e.g. Electronics"></div>
          <div><label class="block text-xs uppercase font-black text-gray-500 mb-2">Description</label>
          <input v-model="catForm.description" class="glass-input w-full bg-gray-50" placeholder="Optional detail"></div>
          <button type="submit" class="w-full py-4 mt-6 rounded-xl font-black bg-primary hover:bg-primary-hover text-white transition-colors shadow-lg shadow-primary/30 uppercase tracking-widest">Save Category</button>
        </form>
      </div>
    </div>

    <!-- Product Modal -->
    <div v-if="showProductModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div class="bg-white w-full max-w-xl p-10 rounded-[2rem] shadow-2xl relative">
        <button @click="showProductModal = false" class="absolute top-6 right-6 text-gray-400 hover:text-black font-bold transition-colors">✖</button>
        <h3 class="text-3xl font-black text-black mb-8 tracking-tight">Add Product</h3>
        <form @submit.prevent="submitProduct" class="grid grid-cols-2 gap-5">
          <div class="col-span-2"><label class="block text-xs uppercase font-black text-gray-500 mb-2">Product Name</label>
          <input v-model="prodForm.name" required class="glass-input w-full bg-gray-50" placeholder="e.g. Smartphone"></div>
          
          <div><label class="block text-xs uppercase font-black text-gray-500 mb-2">Unique SKU</label>
          <input v-model="prodForm.sku" required class="glass-input w-full bg-gray-50" placeholder="e.g. PROD-01"></div>
          
          <div><label class="block text-xs uppercase font-black text-gray-500 mb-2">Category</label>
          <select v-model="prodForm.categoryId" required class="glass-input w-full bg-gray-50">
            <option value="" disabled>Select...</option>
            <option v-for="c in categories" :key="c.id" :value="c.id">{{c.name}}</option>
          </select></div>

          <div><label class="block text-xs uppercase font-black text-gray-500 mb-2">Sale Price ($)</label>
          <input type="number" step="0.01" v-model="prodForm.price" required class="glass-input w-full bg-gray-50" placeholder="0.00"></div>

          <div><label class="block text-xs uppercase font-black text-gray-500 mb-2">Cost Price ($)</label>
          <input type="number" step="0.01" v-model="prodForm.cost" required class="glass-input w-full bg-gray-50" placeholder="0.00"></div>

          <div class="col-span-2"><label class="block text-xs uppercase font-black text-gray-500 mb-2">Initial Quantity</label>
          <input type="number" v-model="prodForm.stock" required class="glass-input w-full bg-gray-50" placeholder="Amount"></div>

          <button type="submit" class="col-span-2 py-4 mt-6 rounded-xl font-black bg-primary hover:bg-primary-hover text-white transition-all shadow-lg shadow-primary/30 uppercase tracking-widest">Save Product</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useProductStore } from '../store/product.store'
import { ProductService } from '../services/api.service'
import { useAuthStore } from '../store/auth.store'
import { formatCurrency, formatNumber } from '../utils/formatters'

const productStore = useProductStore()
const products = computed(() => productStore.products)
const authStore = useAuthStore()
const isAdmin = computed(() => authStore.role === 'ADMIN')

const categories = ref([])

const showCategoryModal = ref(false)
const catForm = ref({ name: '', description: '' })

const showProductModal = ref(false)
const prodForm = ref({ sku: '', name: '', price: null, cost: null, stock: null, categoryId: '' })

const loadCategories = async () => {
  try {
    const res = await ProductService.getCategories()
    if(res.success) categories.value = res.data
  } catch(e) { console.error(e) }
}

const submitCategory = async () => {
  try {
    await ProductService.createCategory(catForm.value)
    showCategoryModal.value = false
    catForm.value = { name: '', description: '' }
    loadCategories()
  } catch(e) { alert(e.response?.data?.message || e.message) }
}

const submitProduct = async () => {
  try {
    await ProductService.createProduct({
      ...prodForm.value,
      price: parseFloat(prodForm.value.price),
      cost: parseFloat(prodForm.value.cost),
      stock: parseInt(prodForm.value.stock),
      categoryId: parseInt(prodForm.value.categoryId)
    })
    showProductModal.value = false
    prodForm.value = { sku: '', name: '', price: null, cost: null, stock: null, categoryId: '' }
    productStore.loadProducts()
  } catch(e) { alert(e.response?.data?.message || e.message) }
}

onMounted(() => {
  productStore.loadProducts()
  if(isAdmin.value) loadCategories()
})
</script>
