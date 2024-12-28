<template>
    <div :class="{ 'nj-grid': authStore.isAuth }">
      <div v-if="authStore.isAuth" class="sidebar">
        <Sidebar />
      </div>
      <main class="main-content">
        <div class="wrapper">
          <slot />
        </div>
      </main>
    </div>
</template>
  
<script setup>
  import Sidebar from '@/components/layouts/Sidebar.vue';
  import { useAuthStore } from '@/stores/auth.store';
  
  const authStore = useAuthStore();
</script>
<style scoped>
  .nj-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    min-height: 100vh;
  }
  .main-content {
    padding: 20px;
  }
</style>