<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth.store";

// Восстанавливаем состояние из localStorage при загрузке
const authStore = useAuthStore();
authStore.restoreAuth();
</script>

<style>


</style>