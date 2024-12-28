<template>
  <div class="home">
    <div class="hero-section">
      <h1>Welcome to Sunyata Product Management</h1>
      <p>Manage your products efficiently and securely</p>
      <div class="cta-buttons">
        <template v-if="authStore.isLoggedIn">
          <router-link to="/products" class="cta-button">View Products</router-link>
          <button @click="handleCreateUpdateProduct" class="cta-button secondary">
            Create/Update Product
          </button>
        </template>
        <template v-else>
          <router-link to="/login" class="cta-button">Login</router-link>
          <router-link to="/register" class="cta-button secondary">Register</router-link>
        </template>
      </div>
    </div>

    <div class="features-section">
      <h2>Features</h2>
      <div class="features-grid">
        <div class="feature-card">
          <h3>Product Management</h3>
          <p>Easily manage your product inventory</p>
        </div>
        <div class="feature-card">
          <h3>User Roles</h3>
          <p>Secure access control with admin and user roles</p>
        </div>
        <div class="feature-card">
          <h3>Category Organization</h3>
          <p>Organize products by categories and brands</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleCreateUpdateProduct = () => {
  if (authStore.isAdmin) {
    router.push('/products/new')
  } else {
    router.push('/products')
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
}

.hero-section {
  text-align: center;
  padding: 4rem 2rem;
  background-color: #2a2a2a; /* Dark gray background for hero section */
  border-radius: 8px;
  margin-bottom: 2rem;
}

.hero-section h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero-section p {
  font-size: 1.2rem;
  color: #b0bec5; /* Light blue-gray text */
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.cta-button:first-child {
  background-color: #4caf50; /* Keep the green color */
}

.cta-button.secondary {
  background-color: #3f51b5; /* Apply the primary button color */
}

.features-section {
  padding: 2rem 0;
}

.features-section h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 1rem;
}

.feature-card {
  padding: 1.5rem;
  border: 1px solid #424242; /* Dark gray border */
  border-radius: 8px;
  text-align: center;
  background-color: #2a2a2a; /* Dark card background */
}

.feature-card h3 {
  margin-bottom: 1rem;
  color: #e0e0e0;
}

.feature-card p {
  color: #b0bec5;
}
</style>
