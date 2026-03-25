import { defineStore } from 'pinia'
import { AuthService } from '../services/api.service'
import router from '../router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
    user: localStorage.getItem('user') || null
  }),
  actions: {
    async login(username, password) {
      const res = await AuthService.login(username, password)
      if (res.success) {
        this.token = res.data.token
        this.role = res.data.role
        this.user = res.data.username
        localStorage.setItem('token', this.token)
        localStorage.setItem('role', this.role)
        localStorage.setItem('user', this.user)
        
        if (this.role === 'ADMIN') router.push('/')
        else router.push('/pos')
      } else {
        throw new Error(res.message)
      }
    },
    logout() {
      this.token = null
      this.role = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('user')
      router.push('/login')
    }
  }
})
