<template>
  <div class="register-container">
    <form @submit.prevent="handleRegister" class="register-form">
      <h2>Register</h2>
      <div class="form-group">
        <input v-model="username" type="text" placeholder="Username" required />
      </div>
      <div class="form-group">
        <input v-model="password" type="password" placeholder="Password" required />
      </div>
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      <button type="submit">Register</button>
      <div class="login-link">
        Already have an account?
        <router-link to="/login">Login here</router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const error = ref('')

const handleRegister = async () => {
  try {
    await authStore.register(username.value, password.value)
    router.push('/login')
  } catch (err) {
    error.value = 'Username already exists'
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1e1e1e;
}

.register-form {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #424242;
  border-radius: 8px;
  background-color: #2a2a2a;
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #424242;
  border-radius: 8px;
  background-color: #2a2a2a;
  color: #e0e0e0;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #283593;
}

.error-message {
  color: #f44336;
  margin-bottom: 10px;
}

.login-link {
  margin-top: 15px;
  text-align: center;
}

.login-link a {
  color: #64b5f6;
  text-decoration: none;
}
</style>
