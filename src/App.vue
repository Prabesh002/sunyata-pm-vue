<template>
  <div class="app">
    <NavBar />
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
  background-color: #1e1e1e;
  color: #e0e0e0;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.cta-button,
.edit-button,
.add-button,
.delete-button,
button {
  background-color: #3f51b5;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  border: none;
  cursor: pointer;
  display: inline-block;
  transition: background-color 0.3s;
}

button:hover,
.cta-button:hover,
.edit-button:hover,
.add-button:hover,
.delete-button:hover {
  background-color: #283593;
}

input,
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #424242;
  border-radius: 4px;
  font-size: 16px;
  background-color: #2a2a2a;
  color: #e0e0e0;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #e0e0e0;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e0e0e0'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
}

.error-message {
  color: #f44336;
  margin-top: 10px;
}

h1,
h2,
h3 {
  color: #e0e0e0;
}
</style>
