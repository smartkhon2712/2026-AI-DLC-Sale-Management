<template>
  <div class="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden font-sans">
    <!-- Animated background blobs -->
    <div class="absolute top-[10%] left-[20%] w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
    <div class="absolute top-[20%] right-[20%] w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
    <div class="absolute bottom-[15%] left-[30%] w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

    <div class="relative w-full max-w-lg px-10 py-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl z-10">
      <div class="mb-10 text-center">
        <h2 class="text-4xl font-extrabold text-white tracking-tight drop-shadow-md">Welcome Back</h2>
        <p class="mt-3 text-sm text-gray-300">Sign in to access your dashboard</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6 text-white">
        <!-- Error Message -->
        <div v-if="error" class="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm font-medium flex items-center transition-all duration-300" data-testid="login-error-msg">
          <svg class="w-5 h-5 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ error }}
        </div>

        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-200 px-1">Username</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-purple-400 text-gray-400">
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
            <input type="text" v-model="username" data-testid="login-username-input" required 
                   class="block w-full pl-11 pr-4 py-3.5 border border-white/10 bg-black/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-black/50 transition-all duration-300 ease-in-out shadow-inner" 
                   placeholder="Enter your username">
          </div>
        </div>

        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-200 px-1">Password</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-purple-400 text-gray-400">
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <input type="password" v-model="password" data-testid="login-password-input" required 
                   class="block w-full pl-11 pr-4 py-3.5 border border-white/10 bg-black/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-black/50 transition-all duration-300 ease-in-out shadow-inner" 
                   placeholder="Enter your password">
          </div>
        </div>

        <div class="flex items-center justify-between mt-6 px-1">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 bg-gray-800 border-gray-600 text-purple-600 focus:ring-purple-500 focus:ring-offset-gray-900 rounded cursor-pointer">
            <label for="remember-me" class="ml-2 block text-sm text-gray-300 cursor-pointer select-none">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-pink-400 hover:text-pink-300 transition-colors duration-200">
              Forgot password?
            </a>
          </div>
        </div>

        <button type="submit" data-testid="login-submit-button" :disabled="loading"
                class="group relative w-full flex justify-center py-4 px-4 mt-8 border border-transparent rounded-xl text-md font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_4px_20px_rgba(168,85,247,0.4)] hover:shadow-[0_8px_30px_rgba(168,85,247,0.6)]">
          <span class="absolute left-0 inset-y-0 flex items-center pl-4">
            <svg v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="h-5 w-5 group-hover:text-purple-200 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </span>
          <span class="tracking-wide">{{ loading ? 'Authenticating...' : 'Sign In' }}</span>
        </button>
      </form>
      
      <div class="mt-8 text-center text-sm text-gray-400 relative z-10">
        Don't have an account? 
        <a href="#" class="font-medium text-pink-400 hover:text-pink-300 transition-colors ml-1 border-b-2 border-transparent hover:border-pink-300">Sign up here</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth.store'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  try {
    await authStore.login(username.value, password.value)
    router.push('/')
  } catch (err) {
    error.value = err.message || 'Login failed. Please check your credentials.'
  } finally {
    loading.value = false
  }
}
</script>

<style>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.animate-blob {
  animation: blob 8s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
