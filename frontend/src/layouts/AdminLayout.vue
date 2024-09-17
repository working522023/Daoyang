<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <nav>
        <ul>
          <li><router-link to="/admin/dashboard">Dashboard</router-link></li>
          <li><router-link to="/admin/users">Users</router-link></li>
          <li><router-link to="/admin/settings">Settings</router-link></li>
        </ul>
      </nav>
    </aside>

    <div class="main-content">
      <header>
        <h1>Admin Dashboard</h1>
      </header>

      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";

defineComponent({
  name: "AdminLayout",
});
</script>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #343a40;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100%;
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
}

.sidebar nav ul li {
  margin: 0.5rem 0;
}

.sidebar nav ul li a {
  color: white;
  text-decoration: none;
  display: block;
  padding: 0.5rem;
}

.sidebar nav ul li a:hover {
  background-color: #495057;
  border-radius: 4px;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

header {
  background-color: #f8f9fa;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
}

main {
  flex: 1;
  padding: 1rem;
}
</style>
