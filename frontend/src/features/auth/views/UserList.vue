<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6">User Management</h1>

    <!-- Create User Button -->
    <button
      @click="openCreateModal"
      class="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-150 ease-in-out"
    >
      Create User
    </button>

    <!-- User Table -->
    <div class="overflow-x-auto">
      <table
        class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200"
      >
        <thead>
          <tr class="bg-gray-50">
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 text-sm text-gray-600">{{ user.id }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ user.name }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ user.email }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ user.address }}</td>
            <td class="px-6 py-4 text-sm text-gray-600 flex space-x-2">
              <button
                @click="openUpdateModal(user)"
                class="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
              >
                Update
              </button>
              <button
                @click="confirmDelete(user.id)"
                class="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create User Modal -->
    <CreateUserModal
      v-if="showCreateModal"
      @close="closeCreateModal"
      @created="handleUserCreated"
      @showSnackbar="showSnackbar"
      class="transition-opacity duration-300 ease-in-out"
      aria-labelledby="create-user-modal-title"
      aria-modal="true"
    />

    <!-- Update User Modal -->
    <UpdateUserModal
      v-if="showUpdateModal"
      :user="selectedUser"
      @close="closeUpdateModal"
      @updated="fetchUsers"
      class="transition-opacity duration-300 ease-in-out"
      aria-labelledby="update-user-modal-title"
      aria-modal="true"
    />

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal
      v-if="showDeleteModal"
      @confirm="deleteUser"
      @cancel="closeDeleteModal"
      class="transition-opacity duration-300 ease-in-out"
      aria-labelledby="delete-confirmation-modal-title"
      aria-modal="true"
    />

    <div v-if="userStore.loading" class="text-center text-gray-500">
      Loading...
    </div>

    <!-- Snackbar -->
    <Snackbar :message="snackbarMessage" :visible="snackbarVisible" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores';

// Import modals
import CreateUserModal from '../components/CreateUserModal.vue';
import UpdateUserModal from '../components/UpdateUserModal.vue';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal.vue';
import Snackbar from '../components/Snackbar.vue';

// Pinia store
const userStore = useUserStore();

// State management
const showCreateModal = ref(false);
const showUpdateModal = ref(false);
const showDeleteModal = ref(false);
const selectedUser = ref(null);
const snackbarMessage = ref('');
const snackbarVisible = ref(false);

// Fetch users
const fetchUsers = async () => {
  try {
    await userStore.getAllUsers();
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

onMounted(() => {
  fetchUsers();
});

// Create user modal actions
const openCreateModal = () => {
  showCreateModal.value = true;
};

const closeCreateModal = () => {
  showCreateModal.value = false;
};

// Handle user creation
const handleUserCreated = () => {
  fetchUsers();
};

// Update user modal actions
const openUpdateModal = (user) => {
  selectedUser.value = user;
  showUpdateModal.value = true;
};

const closeUpdateModal = () => {
  selectedUser.value = null;
  showUpdateModal.value = false;
};

// Delete user confirmation modal actions
const confirmDelete = (id) => {
  selectedUser.value = id;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  selectedUser.value = null;
  showDeleteModal.value = false;
};

const deleteUser = async () => {
  if (selectedUser.value) {
    try {
      await userStore.deleteUser(selectedUser.value);
      fetchUsers();
      showSnackbar('User deleted successfully!');
    } catch (error) {
      showSnackbar('Error deleting user.');
    }
    closeDeleteModal();
  }
};

// Show Snackbar
const showSnackbar = (message) => {
    snackbarMessage.value = message;
    snackbarVisible.value = true;
  setTimeout(() => snackbarVisible.value = false, 3000);
};

// Get the users from the store
const users = userStore.users;
</script>

<style scoped>
/* No additional styles needed as Tailwind CSS handles the styling */
</style>
