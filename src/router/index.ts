//index

import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/views/ProductsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/products/new',
      name: 'product-new',
      component: () => import('@/views/ProductFormView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/products/:id/edit',
      name: 'product-edit',
      component: () => import('@/views/ProductFormView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    }
  ]
});

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Redirect to home if logged in user tries to access login/register
  if ((to.name === 'login' || to.name === 'register') && authStore.isLoggedIn) {
    next('/');
    return;
  }

  // Check for protected routes
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/login');
    return;
  }

  // Check for admin-only routes
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next('/products');
    return;
  }

  next();
});

export default router;