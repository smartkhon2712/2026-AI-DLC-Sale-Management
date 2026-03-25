<template>
  <div>
    <h2 class="text-3xl font-extrabold text-gray-800 mb-6">Product Catalog</h2>
    <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">SKU</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Name</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Category</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Price</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Stock</th>
            <th class="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="product in products" :key="product.id" class="hover:bg-blue-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{{ product.sku }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">{{ product.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ product.category?.name || 'N/A' }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-blue-700">${{ product.price }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <span class="font-bold" :class="product.stock > 10 ? 'text-green-600' : 'text-red-500'">{{ product.stock }}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
              <span class="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full" :class="product.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                {{ product.status }}
              </span>
            </td>
          </tr>
          <tr v-if="products.length === 0">
            <td colspan="6" class="px-6 py-12 text-center text-lg text-gray-400 font-medium italic">Empty Product Catalog.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useProductStore } from '../store/product.store'

const productStore = useProductStore()
const products = computed(() => productStore.products)

onMounted(() => {
  productStore.loadProducts()
})
</script>
