<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-800 text-white shadow-md h-full flex flex-col">
      <nav class="flex-1">
        <ul class="space-y-2 p-4">
          <li>
            <router-link
              to="/admin/dashboard"
              class="block px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              active-class="bg-gray-700"
            >
              Dashboard
            </router-link>
          </li>
          <li>
            <router-link
              to="/admin/users"
              class="block px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              active-class="bg-gray-700"
            >
              Users
            </router-link>
          </li>
          <li>
            <router-link
              to="/admin/settings"
              class="block px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              active-class="bg-gray-700"
            >
              Settings
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <header class="bg-white shadow-md border-b border-gray-200 p-4">
        <h1 class="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
      </header>

      <main class="flex-1 p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';

defineComponent({
  name: 'AdminLayout',
});
</script>
