<template>
  <div class="main-layout">
    <!-- Header with navigation -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
        <!-- Logo or Brand Name -->
        <div class="text-xl font-semibold text-gray-800">co.</div>

        <!-- Navigation Links -->
        <div class="space-x-6">
          <router-link
            to="/"
            class="text-gray-700 hover:text-blue-600 transition duration-300"
          >
            Home
          </router-link>
          <router-link
            to="/about"
            class="text-gray-700 hover:text-blue-600 transition duration-300"
          >
            About
          </router-link>
          <router-link
            to="/auth/login"
            class="text-gray-700 hover:text-blue-600 transition duration-300"
          >
            Login
          </router-link>
          <router-link
            to="/auth/signup"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Signup
          </router-link>
        </div>
      </nav>
    </header>

    <!-- Main content area -->
    <main class="flex-grow container mx-auto px-6 py-10">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-100 py-6 mt-10 text-center">
      <p class="text-gray-600 text-sm">© 2024 My Application. All rights reserved.</p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";

defineComponent({
  name: "MainLayout",
});
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1;
  max-width: 1200px;
  margin: 0 auto;
}

footer {
  margin-top: auto;
}
</style>
