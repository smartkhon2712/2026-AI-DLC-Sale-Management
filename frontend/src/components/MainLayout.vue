<template>
  <div class="h-screen flex w-full relative z-10 p-4 font-['Outfit'] bg-gray-50">
    <!-- Sidebar -->
    <div class="w-64 bg-black flex flex-col rounded-[2rem] overflow-hidden mr-6 shadow-xl">
      <div class="p-8 text-center flex flex-col items-center">
        <div class="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
          <span class="text-3xl font-black text-white">S</span>
        </div>
        <h1 class="text-2xl font-black tracking-tight text-white">Smart<span class="text-primary">POS</span></h1>
        <p class="text-[0.65rem] text-primary mt-2 uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full font-bold">{{ authStore.role }}</p>
      </div>

      <nav class="flex-1 p-5 space-y-2 overflow-y-auto">
        <router-link v-if="isAdmin" to="/" active-class="" exact-active-class="bg-primary !text-white shadow-lg shadow-primary/30" class="flex items-center px-4 py-3.5 rounded-xl hover:bg-white/10 transition-all font-bold text-sm text-gray-400 hover:text-white">
          <span class="mr-4 text-lg">📊</span> Dashboard
        </router-link>
        <router-link to="/pos" exact-active-class="bg-primary !text-white shadow-lg shadow-primary/30" class="flex items-center px-4 py-3.5 rounded-xl hover:bg-white/10 transition-all font-bold text-sm text-gray-400 hover:text-white">
          <span class="mr-4 text-lg">🛒</span> POS Sales
        </router-link>
        <router-link to="/products" exact-active-class="bg-primary !text-white shadow-lg shadow-primary/30" class="flex items-center px-4 py-3.5 rounded-xl hover:bg-white/10 transition-all font-bold text-sm text-gray-400 hover:text-white">
          <span class="mr-4 text-lg">📦</span> Inventory
        </router-link>
        <router-link to="/history" exact-active-class="bg-primary !text-white shadow-lg shadow-primary/30" class="flex items-center px-4 py-3.5 rounded-xl hover:bg-white/10 transition-all font-bold text-sm text-gray-400 hover:text-white">
          <span class="mr-4 text-lg">📜</span> Orders History
        </router-link>
      </nav>
      <div class="p-6 bg-white/5 mt-auto">
        <div class="flex items-center space-x-3 mb-5">
          <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-lg font-bold uppercase text-white shadow-md">{{ authStore.user?.charAt(0) || 'U' }}</div>
          <div>
            <p class="font-bold text-sm text-white">{{ authStore.user }}</p>
            <p class="text-[0.65rem] text-primary font-bold">● Online</p>
          </div>
        </div>
        <button @click="logout" data-testid="logout-button" class="w-full bg-white/10 hover:bg-red-500 hover:text-white text-gray-300 py-3 text-sm rounded-xl font-bold transition-all">
          Sign Out
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col h-full rounded-[2rem] overflow-hidden bg-white shadow-xl relative border border-gray-100">
      <main class="flex-1 overflow-x-hidden overflow-y-auto w-full relative z-10 custom-scrollbar p-2">
        <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in">
            <component :is="Component" :key="route.fullPath" />
          </transition>
        </router-view>
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
<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: scale(0.99) translateY(10px); }
</style>
