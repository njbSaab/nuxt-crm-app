<template>
    <aside class="sidebar bg-sidebar flex flex-col">
      <div class="logo flex justify-center relative">
        <svg
          class=""
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M56.4706 67.2269H93.7815C94.9722 67.227 96.1117 66.8086 97.1429 66.2185C98.174 65.6284 99.2368 64.8876 99.8319 63.8655C100.427 62.8434 100.841 61.6839 100.84 60.5039C100.84 59.3238 100.428 58.1647 99.8319 57.1431L74.6218 13.7815C74.0268 12.7597 73.2998 12.0186 72.2689 11.4286C71.238 10.8386 69.7618 10.4202 68.5714 10.4202C67.381 10.4202 66.241 10.8386 65.2101 11.4286C64.1792 12.0186 63.4522 12.7597 62.8571 13.7815L56.4706 24.8739L43.6975 3.36055C43.1019 2.33877 42.3757 1.26216 41.3445 0.672269C40.3134 0.0823822 39.1738 0 37.9832 0C36.7926 0 35.653 0.0823822 34.6218 0.672269C33.5907 1.26216 32.5283 2.33877 31.9328 3.36055L0.672269 57.1431C0.0762955 58.1647 0.000518695 59.3238 6.41992e-07 60.5039C-0.000517411 61.6839 0.0771927 62.8433 0.672269 63.8654C1.26735 64.8875 2.33024 65.6284 3.36134 66.2185C4.39245 66.8086 5.53202 67.227 6.72269 67.2269H30.2521C39.5753 67.2269 46.3614 63.0446 51.0924 55.126L62.521 35.2941L68.5714 24.8739L87.0588 56.4706H62.521L56.4706 67.2269ZM29.916 56.4706H13.4454L37.9832 14.1176L50.4202 35.2941L42.1819 49.6554C39.0401 54.7932 35.458 56.4706 29.916 56.4706Z"
            fill="#00DC82"
          ></path>
        </svg>
  
        <svg
          class="exit-img w-10 h-10 p-[5px] rounded-full absolute left-0 top-0 cursor-pointer transition-all hover:scale-110 hover:bg-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          @click="handleLogout"
        >
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path
              stroke-dasharray="48"
              stroke-dashoffset="48"
              d="M16 5v-1c0 -0.55 -0.45 -1 -1 -1h-9c-0.55 0 -1 0.45 -1 1v16c0 0.55 0.45 1 1 1h9c0.55 0 1 -0.45 1 -1v-1"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.6s"
                values="48;0"
              />
            </path>
            <path
              stroke-dasharray="12"
              stroke-dashoffset="12"
              d="M10 12h11"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="0.7s"
                dur="0.2s"
                values="12;0"
              />
            </path>
            <path
              stroke-dasharray="6"
              stroke-dashoffset="6"
              d="M21 12l-3.5 -3.5M21 12l-3.5 3.5"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="0.9s"
                dur="0.2s"
                values="6;0"
              />
            </path>
          </g>
        </svg>
      </div>
      <Menu />
    </aside>
</template>
  
<script setup>
  import Menu from "./Menu.vue";
  import { useAuthStore } from "@/stores/auth.store"; // Ваш Pinia store для авторизации
  import { useRouter } from "vue-router";
  
  const authStore = useAuthStore();
  const router = useRouter();
  
  // Метод для выхода
  const handleLogout = () => {
    authStore.logout();
    router.push("/login"); // Перенаправление на страницу входа
  };
  
  console.log("Sidebar component loaded");
</script>
  
  <style scoped>
  .sidebar {
    padding: 20px;
    height: 100%;
  }
  
  .logo .exit-img:hover {
    color: #00dc82 !important;
  }
  
  </style>