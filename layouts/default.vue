<template>
    <div class="layout">
      <div class="sidebar">
        <Sidebar />
      </div>
      <main class="main-content ">
        <div class="wrapper">
            <slot />
        </div>
        <div class="loader relative w-full h-full">

        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import Sidebar from '@/components/layouts/Sidebar.vue'

  console.log("Default layout loaded");
  </script>
  
  <style scoped>
  .layout {
    display: grid;
    grid-template-columns: 1fr 2fr; /* Боковая панель занимает 1/4 ширины */
    min-height: 100vh;
  }
  .main-content {
    padding: 20px;
  }
  </style>