<template>
    <div v-if="visible" class="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, defineProps } from 'vue';
  
  const props = defineProps({
    message: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  });
  
  const visible = ref(props.visible);
  
  watch(() => props.visible, (newVal) => {
    if (newVal) {
      setTimeout(() => visible.value = false, 3000);
    }
  });
  </script>
  
  <style scoped>
  /* No additional styles needed as Tailwind CSS handles the styling */
  </style>
  