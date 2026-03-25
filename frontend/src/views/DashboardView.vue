<template>
  <div>
    <h2 class="text-3xl font-extrabold text-gray-800 mb-6">Store Analytics</h2>
    <div v-if="loading" class="text-center py-10 text-gray-500 font-bold text-xl animate-pulse">Loading metrics...</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:scale-105 transition-transform">
        <div class="flex items-center justify-between">
          <h3 class="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Revenue</h3>
          <span class="text-blue-500 bg-blue-100 p-2 rounded-full">💰</span>
        </div>
        <p class="text-4xl font-black text-gray-800 mt-4">${{ metrics.totalRevenue?.toFixed(2) }}</p>
      </div>
      <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:scale-105 transition-transform">
        <div class="flex items-center justify-between">
          <h3 class="text-gray-500 text-sm font-semibold uppercase tracking-wider">Completed Orders</h3>
          <span class="text-green-500 bg-green-100 p-2 rounded-full">📦</span>
        </div>
        <p class="text-4xl font-black text-gray-800 mt-4">{{ metrics.totalPaidOrders }}</p>
      </div>
      <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:scale-105 transition-transform">
        <div class="flex items-center justify-between">
          <h3 class="text-gray-500 text-sm font-semibold uppercase tracking-wider">Active Products</h3>
          <span class="text-purple-500 bg-purple-100 p-2 rounded-full">🏷️</span>
        </div>
        <p class="text-4xl font-black text-gray-800 mt-4">{{ metrics.activeProductsCount }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ReportService } from '../services/api.service'

const metrics = ref({})
const loading = ref(true)

const loadMetrics = async () => {
  try {
    const res = await ReportService.getMetrics()
    if (res.success) {
      metrics.value = res.data
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadMetrics()
})
</script>
