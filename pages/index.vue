<template>
  <div>
    <div v-if="!store.isAuth">
      <Login />
    </div>
    <div v-else>
      <h1>Hello World! This is the Home CRM Page</h1>
    </div>
  </div>
</template>

<script setup>
import Login from '@/pages/login.vue'
import { useAuthStore } from '@/stores/auth.store'

// Подключение состояния авторизации
const store = useAuthStore()
</script>

<style lang="scss" scoped>
</style>