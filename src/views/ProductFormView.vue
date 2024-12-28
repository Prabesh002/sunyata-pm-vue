<template>
  <div class="form-container">
    <h1>{{ isEditing ? 'Edit Product' : 'Create Product' }}</h1>

    <form @submit.prevent="handleSubmit" class="product-form">
      <div class="form-group">
        <label for="name">Product Name</label>
        <input id="name" v-model="formData.name" type="text" required />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="formData.description" required></textarea>
      </div>

      <div class="form-group">
        <label for="price">Price</label>
        <input
          id="price"
          v-model.number="formData.price"
          type="number"
          step="0.01"
          min="0"
          required
        />
      </div>

      <div class="form-group">
        <label for="category">Category</label>
        <select id="category" v-model="formData.categoryId" required>
          <option value="1">Electronics</option>
          <option value="2">Clothing</option>
          <option value="3">Books</option>
          <option value="4">Home</option>
          <option value="5">Sports</option>
        </select>
      </div>

      <div class="form-group">
        <label for="brand">Brand</label>
        <select id="brand" v-model="formData.brandId" required>
          <option value="1">Apple</option>
          <option value="2">Samsung</option>
          <option value="3">Nike</option>
          <option value="4">Adidas</option>
          <option value="5">Sony</option>
        </select>
      </div>

      <div class="form-group">
        <label for="sku">SKU</label>
        <input id="sku" v-model="formData.sku" type="text" required />
      </div>

      <div class="form-group">
        <label for="stockQuantity">Stock Quantity</label>
        <input
          id="stockQuantity"
          v-model.number="formData.stockQuantity"
          type="number"
          min="0"
          required
        />
      </div>

      <div class="form-actions">
        <button type="submit" class="submit-button">
          {{ isEditing ? 'Update' : 'Create' }} Product
        </button>
        <button type="button" @click="router.push('/products')" class="cancel-button">
          Cancel
        </button>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { productService } from '../services/product.service'
import type { Product } from '../types/product'

const route = useRoute()
const router = useRouter()
const error = ref('')

const isEditing = computed(() => route.params.id !== undefined)

const formData = ref<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>({
  name: '',
  description: '',
  price: 0,
  categoryId: 1,
  brandId: 1,
  manufacturerId: 1, // Default value since we're not handling manufacturers
  sku: '',
  stockQuantity: 0,
})

onMounted(async () => {
  if (isEditing.value) {
    try {
      const productId = Number(route.params.id)
      const product = await productService.getProduct(productId)
      // Remove id, createdAt, and updatedAt from the product data
      const { id, createdAt, updatedAt, ...productData } = product
      formData.value = productData
    } catch (err) {
      error.value = 'Error loading product'
      console.error('Error loading product:', err)
    }
  }
})

const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      await productService.updateProduct(Number(route.params.id), formData.value)
    } else {
      await productService.createProduct(formData.value)
    }
    router.push('/products')
  } catch (err) {
    error.value = `Error ${isEditing.value ? 'updating' : 'creating'} product`
    console.error('Error submitting form:', err)
  }
}
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #1e1e1e;
}

.product-form {
  background-color: #2a2a2a;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #424242;
  border-radius: 8px;
  background-color: #2a2a2a;
  color: #e0e0e0;
}

textarea {
  height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.submit-button,
.cancel-button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  flex: 1;
  transition: background-color 0.3s;
}

.cancel-button {
  background-color: #f44336;
  color: white;
}

.error-message {
  color: #f44336;
  margin-top: 10px;
}
</style>
