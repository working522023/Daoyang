<template>
    <div
      class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 transform transition-transform duration-300 ease-in-out scale-95 opacity-0 animate-show"
      >
        <h2 id="modal-title" class="text-2xl font-semibold mb-4 text-gray-800">Confirm Delete</h2>
        <p class="mb-4 text-gray-700">Are you sure you want to delete this user? This action cannot be undone.</p>
        <div class="flex justify-end space-x-4">
          <button
            @click="$emit('confirm')"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-colors duration-150 ease-in-out"
          >
            Yes, Delete
          </button>
          <button
            @click="$emit('cancel')"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition-colors duration-150 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, onUnmounted } from 'vue';
  
  const closeModalOnEsc = (event) => {
    if (event.key === 'Escape') {
      emit('cancel');
    }
  };
  
  onMounted(() => {
    document.addEventListener('keydown', closeModalOnEsc);
  });
  
  onUnmounted(() => {
    document.removeEventListener('keydown', closeModalOnEsc);
  });
  </script>
  
  <style scoped>
  /* Animation for modal */
  @keyframes show {
    0% {
      opacity: 0;
      transform: scale(0.9);
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
  