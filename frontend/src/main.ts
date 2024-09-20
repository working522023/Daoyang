import { createApp } from 'vue';
import { createPinia } from 'pinia';
import axios from 'axios';
import App from './App.vue';
import { router } from './router';
import './style.css';

// Configure Axios
axios.defaults.baseURL = 'http://localhost:5000/api/v1/';
axios.defaults.withCredentials = true;

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
