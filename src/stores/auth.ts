import { defineStore } from 'pinia';
import axios from 'axios';

interface AuthState {
    token: string | null;
    role: string | null;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        token: localStorage.getItem('YourSecretKeyForJWTAuthenticationForMyReasonGenerate'),
        role: localStorage.getItem('user_role'),
    }),

    getters: {
        isLoggedIn: (state) => !!state.token,
        isAdmin: (state) => state.role === 'Admin',
    },

    actions: {
        async login(username: string, password: string) {
            try {
                const response = await axios.post('https://localhost:7133/api/auth/login', {
                    username,
                    password,
                });

                const { token, role } = response.data;
                this.setToken(token);
                this.setRole(role);
                return response.data;
            } catch (error) {
                throw error;
            }
        },

        async register(username: string, password: string) {
            try {
                return await axios.post('https://localhost:7133/api/auth/register', {
                    username,
                    password,
                });
            } catch (error) {
                throw error;
            }
        },

        logout() {
            localStorage.removeItem('YourSecretKeyForJWTAuthenticationForMyReasonGenerate');
            localStorage.removeItem('user_role');
            this.token = null;
            this.role = null;
        },

        setToken(token: string) {
            this.token = token;
            localStorage.setItem('YourSecretKeyForJWTAuthenticationForMyReasonGenerate', token);
        },

        setRole(role: number) {
            const roleString = role === 1 ? 'Admin' : 'User';
            this.role = roleString;
            localStorage.setItem('user_role', roleString);
        },
    },
});