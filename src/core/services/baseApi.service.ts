// src/core/services/baseApi.service.ts
import axios, { type AxiosInstance } from 'axios';
import { useAuthStore } from '@/stores/auth';

export class BaseApiService {
    protected api: AxiosInstance;
    protected apiUrl = 'https://localhost:7133/api';

    constructor() {
        this.api = axios.create({
            baseURL: this.apiUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Add request interceptor for authentication
        this.api.interceptors.request.use((config) => {
            const authStore = useAuthStore();
            const token = authStore.token;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        });
    }

    protected get<T>(endpoint: string) {
        return this.api.get<T>(`/${endpoint}`);
    }

    protected getById<T>(endpoint: string, id: number) {
        return this.api.get<T>(`/${endpoint}/${id}`);
    }

    protected post<T>(endpoint: string, data: any) {
        return this.api.post<T>(`/${endpoint}`, data);
    }

    protected put<T>(endpoint: string, id: number, data: any) {
        return this.api.put<T>(`/${endpoint}/${id}`, data);
    }

    protected delete(endpoint: string, id: number) {
        return this.api.delete(`/${endpoint}/${id}`);
    }
}