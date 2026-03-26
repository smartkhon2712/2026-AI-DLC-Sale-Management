<template>
  <div class="h-full flex flex-col p-4 md:p-8 relative">
    <div class="flex justify-between items-end mb-8 shrink-0 animate-[fadeIn_0.5s_ease-out]">
      <div>
        <h2 class="text-4xl font-black text-black tracking-tight">Orders History</h2>
        <p class="text-gray-500 mt-2 text-sm font-bold tracking-widest uppercase">Manage Customer Orders</p>
      </div>
      <button @click="loadOrders" class="px-5 py-2.5 bg-black hover:bg-gray-800 rounded-xl transition-all shadow-lg text-sm font-bold text-white flex items-center gap-2 hover:scale-105 active:scale-95">
        <span class="text-lg">🔄</span> Refresh
      </button>
    </div>

    <!-- Data Table -->
    <div class="flex-1 bg-white rounded-[2rem] border border-gray-100 overflow-hidden flex flex-col shadow-sm animate-[fadeIn_0.6s_ease-out]">
      <div class="overflow-x-auto flex-1 custom-scrollbar relative">
        <table class="min-w-full divide-y divide-gray-100 whitespace-nowrap">
          <thead class="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th class="px-8 py-5 text-left text-xs font-black text-gray-500 uppercase tracking-widest">Order ID</th>
              <th class="px-8 py-5 text-left text-xs font-black text-gray-500 uppercase tracking-widest">Date</th>
              <th class="px-8 py-5 text-left text-xs font-black text-gray-500 uppercase tracking-widest">Customer Info</th>
              <th class="px-8 py-5 text-left text-xs font-black text-gray-500 uppercase tracking-widest">Total Amount</th>
              <th class="px-8 py-5 text-left text-xs font-black text-gray-500 uppercase tracking-widest">Status</th>
              <th v-if="isAdmin" class="px-8 py-5 text-right text-xs font-black text-gray-500 uppercase tracking-widest">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="order in orders" :key="order.id" class="hover:bg-primary-light/30 transition-colors group">
              <td class="px-8 py-6 text-sm font-black text-black">ORD-{{ String(order.id).padStart(5, '0') }}</td>
              <td class="px-8 py-6 text-sm font-bold text-gray-500">{{ new Date(order.createdAt).toLocaleString() }}</td>
              <td class="px-8 py-6 text-sm font-black text-black">
                <div class="flex flex-col">
                  <span>{{ order.customer?.name || 'Walk-in Customer' }}</span>
                  <span class="text-[0.65rem] text-primary mt-1 uppercase tracking-widest">{{ order.customer?.phone || '' }}</span>
                </div>
              </td>
              <td class="px-8 py-6 text-base font-black text-black">${{ formatCurrency(order.totalAmount) }}</td>
              <td class="px-8 py-6 text-sm">
                <span class="px-3 py-1.5 inline-flex text-[0.65rem] uppercase tracking-widest font-black rounded-full" :class="{
                  'bg-yellow-100 text-yellow-600': order.status === 'PENDING',
                  'bg-primary-light text-primary': order.status === 'PAID',
                  'bg-red-50 text-red-500': order.status === 'CANCELLED'
                }">
                  {{ order.status }}
                </span>
              </td>
              <td class="px-8 py-6 text-right text-sm" v-if="isAdmin">
                <div class="flex items-center justify-end gap-2" v-if="order.status === 'PENDING'">
                  <button @click="updateStatus(order.id, 'PAID')" class="bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition shadow-sm">Mark PAID</button>
                  <button @click="updateStatus(order.id, 'CANCELLED')" class="bg-gray-100 hover:bg-red-500 hover:text-white text-gray-500 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition">Cancel</button>
                </div>
                <span v-else class="text-[0.65rem] uppercase tracking-widest font-black text-gray-400">Locked</span>
              </td>
            </tr>
            <tr v-if="orders.length === 0">
              <td colspan="6" class="px-8 py-24 text-center">
                <div class="flex flex-col items-center justify-center text-gray-400">
                  <span class="text-5xl mb-4 opacity-50 block">📭</span>
                  <p class="font-black tracking-widest uppercase text-sm">No Orders Found</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { OrderService } from '../services/api.service'
import { useAuthStore } from '../store/auth.store'
import { formatCurrency } from '../utils/formatters'
const orders = ref([])
const authStore = useAuthStore()
const isAdmin = computed(() => authStore.role === 'ADMIN')
const loadOrders = async () => {
  try {
    const res = await OrderService.getOrders()
    if(res.success) {
      orders.value = res.data
    }
  } catch(e) {
    console.error(e)
  }
}
const updateStatus = async (id, status) => {
  try {
    const res = await OrderService.updateStatus(id, status)
    if(res.success) {
      loadOrders() 
    }
  } catch(e) {
    alert(e.response?.data?.message || e.message)
  }
}
onMounted(() => {
  loadOrders()
})
</script>
