// src/services/product.service.ts
import { BaseApiService } from '@/core/services/baseApi.service';
import type { Product } from '@/enums/product';

export class ProductService extends BaseApiService {
    private endpoint = 'products';

    async getProducts() {
        const response = await this.get<Product[]>(this.endpoint);
        return response.data;
    }

    async getProduct(id: number) {
        const response = await this.getById<Product>(this.endpoint, id);
        return response.data;
    }

    async createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
        const response = await this.post<Product>(this.endpoint, product);
        return response.data;
    }

    async updateProduct(id: number, product: Omit<Product, 'createdAt' | 'updatedAt'>) {
        const response = await this.put<Product>(this.endpoint, id, product);
        return response.data;
    }

    async deleteProduct(id: number) {
        await this.delete(this.endpoint, id);
    }
}

export const productService = new ProductService();