<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">
        Welcome, {{ authStore.user?.id }}
      </h2>
      <button
        @click="handleLogout"
        class="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../../stores';

export default defineComponent({
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
      authStore.logout();
      router.push('/auth/login');
    };

    return {
      authStore,
      handleLogout,
    };
  },
});
</script>

<style scoped>
/* Tailwind CSS handles most styling, no custom styles are needed */
</style>
