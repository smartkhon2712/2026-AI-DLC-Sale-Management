import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth.store'
import MainLayout from '../components/MainLayout.vue'

const routes = [
  { path: '/login', name: 'Login', component: () => import('../views/LoginView.vue') },
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'Dashboard', component: () => import('../views/DashboardView.vue'), meta: { requiresAdmin: true } },
      { path: 'products', name: 'Products', component: () => import('../views/ProductView.vue') },
      { path: 'pos', name: 'POS', component: () => import('../views/OrderPOSView.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.token) {
    next('/login')
  } else if (to.meta.requiresAdmin && authStore.role !== 'ADMIN') {
    next('/pos') // staff redirect
  } else {
    next()
  }
})

export default router
