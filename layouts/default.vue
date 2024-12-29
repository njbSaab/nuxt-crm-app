<template>
    
    <div class="h-screen w-full overflow-hidden flex items-center bg-reg w-[110%]">
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
  .main-content {
    padding: 20px 0;
    width: 75%;
    height: 100%;
    margin: 0 auto;
  }
</style>