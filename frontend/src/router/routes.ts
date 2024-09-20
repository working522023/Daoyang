import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import Signup from '../pages/Signup.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
import MainLayout from '../layouts/MainLayout.vue';
import AuthLayout from '../layouts/AuthLayout.vue';
import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import { useAuthStore } from '../stores';
import UserList from '../features/auth/views/UserList.vue';
import UserSetting from '../features/auth/views/UserSetting.vue';
import UserDashboard from '../features/auth/views/UserDashboard.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'Home', component: Home },
      { path: 'about', name: 'About', component: About }
    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'login', name: 'Login', component: Login },
      { path: 'signup', name: 'Signup', component: Signup },
      { path: 'dashboard', name: 'UerDashboard', component: UserDashboard, meta: { requiresAuth: true } },
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: 'dashboard', name: 'UerDashboard', component: UserDashboard, meta: { requiresAuth: true } },
      { path: 'users', name: 'UserList', component: UserList, meta: { requiresAuth: true } },
      { path: 'settings', name: 'UserSetting', component: UserSetting, meta: { requiresAuth: true } },
    ]
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to handle authentication
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Ensure token is loaded from localStorage
  authStore.loadTokenFromLocalStorage();

  // Redirect to login if authentication is required and user is not authenticated
  if (to.meta.requiresAuth && !authStore.isAuthenticated()) {
    next({ name: 'Login' });
  } else {
    next();
  }
});
