<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
    <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-4">
      <h2 class="text-2xl font-semibold mb-6 text-gray-900">Create New User</h2>

      <form @submit.prevent="createUser" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="userData.name"
            type="text"
            id="name"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="userData.email"
            type="email"
            id="email"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="userData.password"
            type="password"
            id="password"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            placeholder="Enter your password"
          />
        </div>

        <div>
          <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
          <input
            v-model="userData.address"
            type="text"
            id="address"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            placeholder="Enter your address"
          />
        </div>

        <div class="flex justify-end space-x-4">
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
          >
            Create
          </button>
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useUserStore } from '../stores';

const userStore = useUserStore();
const userData = ref({
  name: '',
  email: '',
  password: '',
  address: '',
});

const emit = defineEmits(['created', 'close', 'showSnackbar']);

const createUser = async () => {
  try {
    await userStore.createUser(userData.value);
    emit('created');
    emit('close');
    emit('showSnackbar', { message: 'User created successfully!', type: 'success' });
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error creating user.';
    emit('showSnackbar', { message: errorMessage, type: 'error' });
  }
};
</script>

<style scoped>
/* No additional styles needed as Tailwind CSS handles the styling */
</style>
