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

    async downloadProductsPdf(): Promise<void> {
        try {
            const response = await this.api.get('products/export-pdf', {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Products_Report_${new Date().toISOString().split('T')[0]}.pdf`);


            document.body.appendChild(link);

            link.click();

            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading PDF:', error);
            throw error;
        }
    }
}

export const productService = new ProductService();