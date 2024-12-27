<script setup lang="ts">
import { menuItems } from '@/components/layouts/menu-data';

</script>

<template>
    <div>
        <NuxtLink class="flex text-white w-full rounded-lg hover:bg-gray-700 p-2 mb-2 hover:shadow-md transition-all"
        v-for="item in menuItems" :key="item.name" :to="item.url">
            <span v-html="item.icon"></span>
            <span class="ml-2">{{ item.name }}</span
        >

        </NuxtLink>
    </div>

</template>


<style scoped>

</style>