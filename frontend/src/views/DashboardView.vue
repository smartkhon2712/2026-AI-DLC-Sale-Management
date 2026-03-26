<template>
  <div class="p-6 md:p-8">
    <div class="flex justify-between items-end mb-10">
      <div>
        <h2 class="text-4xl font-black text-black tracking-tight">Overview Dashboard</h2>
        <p class="text-gray-500 mt-2 text-sm font-bold tracking-widest uppercase">Business Live Analytics</p>
      </div>
      <button @click="loadMetrics" class="px-5 py-2.5 bg-black hover:bg-gray-800 rounded-xl transition-all shadow-lg text-sm font-bold text-white flex items-center gap-2 hover:scale-105 active:scale-95">
        <span class="text-lg">🔄</span> Sync Nodes
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-40">
       <div class="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
    </div>
    
    <div v-else class="space-y-8 animate-[fadeIn_0.5s_ease-out]">
      <!-- Top Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] relative overflow-hidden group hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.15)] transition-shadow">
          <div class="absolute -top-10 -right-10 w-32 h-32 bg-primary-light rounded-full group-hover:scale-110 transition-transform"></div>
          <p class="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Total Settled Revenue</p>
          <div class="flex items-end gap-3 relative z-10">
            <span class="text-5xl font-black text-black tracking-tighter">${{ formatCurrency(metrics.totalRevenue) }}</span>
          </div>
        </div>

        <div class="bg-black p-8 rounded-[2rem] shadow-sm relative overflow-hidden group hover:shadow-lg transition-shadow">
          <div class="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full group-hover:scale-110 transition-transform"></div>
          <p class="text-primary text-xs font-bold uppercase tracking-widest mb-4">Completed Lifecycles</p>
          <div class="flex items-end gap-3 relative z-10">
            <span class="text-5xl font-black text-white tracking-tighter">{{ formatNumber(metrics.totalPaidOrders) }}</span>
            <span class="text-gray-400 text-sm font-bold mb-1 tracking-widest uppercase">Orders</span>
          </div>
        </div>

        <div class="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] relative overflow-hidden group hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.15)] transition-shadow">
          <div class="absolute -top-10 -right-10 w-32 h-32 bg-primary-light rounded-full group-hover:scale-110 transition-transform"></div>
          <p class="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Live Inventory</p>
          <div class="flex items-end gap-3 relative z-10">
            <span class="text-5xl font-black text-black tracking-tighter">{{ formatNumber(metrics.activeProductsCount) }}</span>
            <span class="text-gray-400 text-sm font-bold mb-1 tracking-widest uppercase">SKUs</span>
          </div>
        </div>
      </div>

      <!-- Chart Region -->
      <div class="bg-white border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] rounded-[2rem] p-8 h-[28rem] relative flex flex-col">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-black text-black tracking-wide">Volume Trajectory</h3>
          <span class="px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-bold">Past 7 Days Simulation</span>
        </div>
        <div class="flex-1 relative w-full h-full">
          <canvas id="dashboardChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { ReportService } from '../services/api.service'
import Chart from 'chart.js/auto'
import { formatCurrency, formatNumber } from '../utils/formatters'

const metrics = ref({})
const loading = ref(true)
let chartInstance = null

const renderChart = () => {
  const ctx = document.getElementById('dashboardChart')
  if (!ctx) return
  if(chartInstance) chartInstance.destroy()

  const revenue = metrics.value.totalRevenue || 5000
  const baselines = [revenue*0.2, revenue*0.1, revenue*0.25, revenue*0.15, revenue*0.1, revenue*0.35, revenue]
  
  const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(72, 185, 215, 0.4)');
  gradient.addColorStop(1, 'rgba(72, 185, 215, 0.0)');

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Gross Volume',
        data: baselines,
        borderColor: '#48b9d7',
        backgroundColor: gradient,
        borderWidth: 4,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#48b9d7',
        pointBorderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#000000',
          titleFont: { family: 'Outfit', size: 13, weight: 'bold' },
          bodyFont: { family: 'Outfit', size: 14, weight: '900' },
          padding: 12,
          cornerRadius: 8,
          displayColors: false,
        }
      },
      scales: {
        y: { 
          beginAtZero: true,
          border: { display: false },
          ticks: { color: '#9ca3af', font: { family: 'Outfit', size: 12, weight: '600' }, padding: 15 },
          grid: { color: '#f3f4f6' } 
        },
        x: { 
          border: { display: false },
          ticks: { color: '#9ca3af', font: { family: 'Outfit', size: 12, weight: '600' }, padding: 15 }, 
          grid: { display: false } 
        }
      }
    }
  })
}

const loadMetrics = async () => {
  loading.value = true
  try {
    const res = await ReportService.getMetrics()
    if (res.success) {
      metrics.value = res.data
      await nextTick()
      renderChart()
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
<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
