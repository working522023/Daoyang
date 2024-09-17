<template>
    <div v-if="userId">
      <h1>Welcome to the Dashboard, {{ userId }}</h1>
      <p>User ID: {{ userId }}</p>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, computed } from 'vue';
  import { useAuthStore } from '../stores';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    setup() {
      const authStore = useAuthStore();
      const router = useRouter();
  
      onMounted(async () => {
        await authStore.fetchProfile();
      });
  
      const logout = () => {
        authStore.logout();
        router.push({ name: 'Login' });
      };
  
      return { user: computed(() => authStore.user), userId: computed(() => authStore.userId), logout };
    }
  });
  </script>
  
  <style scoped>
  /* Add Tailwind CSS styling here */
  </style>
  