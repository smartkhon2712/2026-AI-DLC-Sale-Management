<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <div class="w-64 bg-gray-800 text-white flex flex-col">
      <div class="p-4 text-xl font-bold bg-gray-900 shadow">POS System</div>
      <nav class="flex-1 p-4 space-y-2">
        <router-link v-if="isAdmin" to="/" class="block px-4 py-2 rounded mb-2 hover:bg-gray-700" active-class="bg-blue-600">Dashboard</router-link>
        <router-link to="/pos" class="block px-4 py-2 rounded mb-2 hover:bg-gray-700" active-class="bg-blue-600">POS Order</router-link>
        <router-link to="/products" class="block px-4 py-2 rounded mb-2 hover:bg-gray-700" active-class="bg-blue-600">Products</router-link>
      </nav>
      <div class="p-4">
        <button @click="logout" data-testid="logout-button" class="w-full bg-red-600 hover:bg-red-700 py-2 rounded font-bold">Logout</button>
      </div>
    </div>
    <div class="flex-1 flex flex-col overflow-hidden">
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../store/auth.store'

const authStore = useAuthStore()
const isAdmin = computed(() => authStore.role === 'ADMIN')

const logout = () => {
  authStore.logout()
}
</script>
