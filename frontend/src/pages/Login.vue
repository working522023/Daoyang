<template>
  <div class="flex items-center justify-center min-h-scree">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-semibold mb-8 text-center text-gray-800">
        Login
      </h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label
            for="email"
            class="block text-gray-700 text-sm font-semibold mb-2"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Email"
            required
            class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:text-base"
          />
        </div>
        <div>
          <label
            for="password"
            class="block text-gray-700 text-sm font-semibold mb-2"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Password"
            required
            class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:text-base"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-6 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Login
        </button>
      </form>
      <p class="mt-6 text-center text-sm text-gray-600">
        Don't have an account?
        <router-link to="/auth/signup" class="text-blue-500 hover:text-blue-700"
          >Sign up</router-link
        >
      </p>
      <p v-if="authStore.error" class="mt-4 text-red-600 text-center">{{ authStore.error }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useAuthStore } from "../stores";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const authStore = useAuthStore();
    const router = useRouter();

    const handleSubmit = async () => {
      try {
        await authStore.login(email.value, password.value);
        if (authStore.token) {
          router.push("/admin/dashboard");
        }
      } catch (error) {
        errorMessage.value = error as string;
      }
    };

    return {
      email,
      password,
      errorMessage,
      authStore,
      handleSubmit,
    };
  },
});
</script>
