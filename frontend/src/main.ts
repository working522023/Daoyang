import axios from 'axios';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './style.css';
import { router } from './router';
import { useAuthStore } from './stores';

axios.defaults.baseURL = 'http://localhost:5000/api/v1/';

axios.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.isAuthenticated && authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
}, (error) => Promise.reject(error));

const app = createApp(App);
app.use(router);
app.use(createPinia());

const authStore = useAuthStore();
authStore.loadTokenFromCookies();  // Load the token from cookies when the app starts

app.mount('#app');
