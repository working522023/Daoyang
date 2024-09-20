<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="bg-white rounded-lg shadow-lg max-w-md w-full p-6 transform transition-transform duration-300 ease-in-out scale-95 opacity-0 animate-show"
    >
      <h2 id="modal-title" class="text-2xl font-semibold mb-4 text-gray-800">
        Update User
      </h2>

      <form @submit.prevent="updateUser" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            v-model="userData.name"
            type="text"
            id="name"
            required
            class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 ease-in-out"
          />
        </div>

        <div>
          <label for="address" class="block text-sm font-medium text-gray-700"
            >Address</label
          >
          <input
            v-model="userData.address"
            type="text"
            id="address"
            required
            class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 ease-in-out"
          />
        </div>

        <div class="flex justify-end space-x-4">
          <button
            type="submit"
            class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-150 ease-in-out"
          >
            Update
          </button>
          <button
            type="button"
            @click="$emit('close')"
            class="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-colors duration-150 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useUserStore } from "../stores";

// Props
const props = defineProps({
  user: Object,
});

const userStore = useUserStore();
const userData = ref({
  name: "",
  address: "",
});

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      userData.value = { ...newUser };
    }
  },
  { immediate: true }
);

// Update user handler
const updateUser = async () => {
  if (!userData.value.name || !userData.value.address) {
    alert("All fields are required!");
    return;
  }

  try {
    await userStore.updateUser(props.user.id, userData.value);
    const updatedUser = { ...userData.value, id: props.user.id };
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    $emit("updated");
    $emit("close");
  } catch (error) {
    console.error("Error updating user:", error);
  }
};
</script>

<style scoped>
@keyframes show {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-show {
  animation: show 0.3s forwards;
}
</style>
