<!-- src/components/NavBar.vue -->
<template>
  <nav class="navbar">
    <div class="nav-brand">
      <router-link to="/" class="brand-link">Sunyata PM</router-link>
    </div>
    <div class="nav-links">
      <template v-if="authStore.isLoggedIn">
        <router-link to="/products" class="nav-link">Products</router-link>
        <a @click="handleLogout" class="nav-link logout">Logout</a>
      </template>
      <template v-else>
        <router-link to="/login" class="nav-link">Login</router-link>
        <router-link to="/register" class="nav-link">Register</router-link>
      </template>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  background-color: #333;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  font-size: 1.5rem;
}

.brand-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #555;
}

.logout {
  cursor: pointer;
}
</style>
