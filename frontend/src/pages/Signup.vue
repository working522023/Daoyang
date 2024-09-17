<template>
  <div class="flex items-center justify-center min-h-scree">
    <div class="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
      <h1 class="text-2xl font-semibold mb-8 text-center text-gray-800">Create an Account</h1>
      <form @submit.prevent="signup" class="space-y-6">
        <!-- Name -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            v-model="name"
            id="name"
            type="text"
            placeholder="John Doe"
            class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:text-base"
          />
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            v-model="email"
            id="email"
            type="email"
            placeholder="you@example.com"
            class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:text-base"
          />
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="password"
            id="password"
            type="password"
            placeholder="••••••••"
            class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:text-base"
          />
        </div>

        <!-- Address -->
        <div>
          <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
          <input
            v-model="address"
            id="address"
            type="text"
            placeholder="123 Main St, City"
            class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:text-base"
          />
        </div>

        <!-- Signup Button -->
        <button
          type="submit"
          class="w-full py-2 px-6 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Sign Up
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        Already have an account? 
        <router-link to="/auth/login" class="text-blue-500 hover:text-blue-700 transition">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const address = ref('');
    const authStore = useAuthStore();
    const router = useRouter();

    const signup = async () => {
      try {
        await authStore.signup(name.value, email.value, password.value, address.value);
        router.push({ name: 'Login' });
      } catch (error) {
        console.error(error);
      }
    };

    return { name, email, password, address, signup };
  },
};
</script>