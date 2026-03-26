<template>
  <div class="h-screen flex items-center justify-center bg-gray-50 p-4 font-['Outfit']">
    <div class="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl p-10 relative overflow-hidden border border-gray-100">
      
      <div class="text-center mb-10 relative z-10">
        <div class="w-20 h-20 bg-black rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl rotate-12 hover:rotate-0 transition-transform duration-500">
          <span class="text-4xl font-black text-primary -rotate-12 hover:rotate-0 transition-transform duration-500">N</span>
        </div>
        <h2 class="text-3xl font-black text-black tracking-tight">Access Terminal</h2>
        <p class="text-gray-500 text-sm mt-2 font-medium tracking-wide">Nexus Point of Sale Identity</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6 relative z-10">
        <div>
          <label class="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2 ml-1">Username</label>
          <input type="text" v-model="username" data-testid="login-username-input" required class="glass-input w-full bg-gray-50" placeholder="admin / staff">
        </div>
        <div>
          <label class="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2 ml-1">Password</label>
          <input type="password" v-model="password" data-testid="login-password-input" required class="glass-input w-full bg-gray-50" placeholder="••••••••">
        </div>
        
        <div v-if="error" class="bg-red-50 text-red-500 text-sm p-3 rounded-xl text-center font-bold" data-testid="login-error-msg">
          {{ error }}
        </div>
        
        <button type="submit" data-testid="login-submit-button" class="mt-4 w-full flex justify-center items-center py-4 px-4 rounded-2xl shadow-lg shadow-primary/30 text-sm font-bold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 uppercase tracking-widest" :disabled="loading">
          <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? 'Authenticating...' : 'Secure Login' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth.store'

const authStore = useAuthStore()
const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  try {
    await authStore.login(username.value, password.value)
  } catch (err) {
    error.value = err.message || 'Login failed - Access Denied'
  } finally {
    loading.value = false
  }
}
</script>
