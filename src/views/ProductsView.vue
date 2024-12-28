<template>
  <div class="products-container">
    <h1>Products View</h1>

    <router-link v-if="authStore.isAdmin" to="/products/new" class="add-button">
      Add New Product
    </router-link>

    <div class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p class="price">${{ product.price }}</p>
        <p>Category: {{ Category[Number(product.categoryId)] }}</p>
        <p>Brand: {{ Brand[Number(product.brandId)] }}</p>
        <p>Stock: {{ product.stockQuantity }}</p>

        <div v-if="authStore.isAdmin" class="admin-actions">
          <router-link :to="`/products/${product.id}/edit`" class="edit-button"> Edit </router-link>
          <button @click="handleDelete(product.id!)" class="delete-button">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { productService } from '@/services/product.service'
import type { Product } from '@/types/product'
import * as BrandEnum from '@/enums/brand.enum'
import * as CategoryEnum from '@/enums/category.enum'

const authStore = useAuthStore()
const products = ref<Product[]>([])
const Brand = BrandEnum.Brand
const Category = CategoryEnum.Category

const loadProducts = async () => {
  try {
    products.value = await productService.getProducts()
  } catch (error) {
    console.error('Error loading products:', error)
  }
}

const handleDelete = async (id: number) => {
  if (!confirm('Are you sure you want to delete this product?')) {
    return
  }

  try {
    await productService.deleteProduct(id)
    await loadProducts()
  } catch (error) {
    console.error('Error deleting product:', error)
  }
}

onMounted(loadProducts)
</script>

<style scoped>
.products-container {
  padding: 20px;
  background-color: #1e1e1e; /* Dark background */
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.product-card {
  border: 1px solid #424242; /* Darker border */
  padding: 15px;
  border-radius: 8px;
  background-color: #2a2a2a; /* Dark background for card */
}

.price {
  font-size: 1.2em;
  font-weight: bold;
  color: #4caf50;
}

.admin-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.add-button,
.edit-button {
  background-color: #3f51b5;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s;
}

.add-button:hover,
.edit-button:hover {
  background-color: #283593;
}

.delete-button {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #d32f2f;
}
.add-button {
  margin-bottom: 20px;
}

h1,
h3,
p {
  color: #e0e0e0;
}
</style>
