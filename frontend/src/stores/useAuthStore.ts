import { defineStore } from 'pinia';
import axios from 'axios';
import { AuthState } from '../features';

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    token: null as string | null,
    error: null as string | null,
  }),
  
  actions: {
    loadTokenFromCookies() {
      const token = this.getTokenFromCookies();
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    },
    getTokenFromCookies(): string | null {
      const cookies = document.cookie.split(';').map(cookie => cookie.trim());
      const tokenCookie = cookies.find(cookie => cookie.startsWith('auth_token='));
      if (tokenCookie) {
        return tokenCookie.split('=')[1];
      }
      return null;
    },
    async login(email: string, password: string) {
      try {
        const response = await axios.post('/users/login', { email, password }, { withCredentials: true });
        const token = response.data.token;

        document.cookie = `auth_token=${token}; path=/;`;
        this.token = token;
        this.isAuthenticated = true;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Login failed';
        this.isAuthenticated = false;
      }
    },
    async signup(name: string, email: string, password: string, address: string) {
      try {
        await axios.post('/users/signup', { name, email, password, address });
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Signup failed';
      }
    },
    logout() {
      this.token = null;
      this.isAuthenticated = false;
      document.cookie = 'auth_token=; Max-Age=0';
      delete axios.defaults.headers.common['Authorization'];
      axios.post('/users/logout', {}, { withCredentials: true });
    }
  },
});
