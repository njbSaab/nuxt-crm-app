<template>
  <div>
    <div v-if="!store.isAuth">
      <Login />
    </div>
    <div class="wrapper" v-else>
      <div class="bread-crumbs relative flex justify-between mx-[40px] w-[90%]">
        <h1>
          <span class="color-accent">CRM:</span>
          <span>{{ title }}</span>
        </h1>
        <span>
          Welcome back
          <span class="font-bold color-accent">{{ store.user.name }}</span>
        </span>

      </div>

      <div v-if="isLoading">
        <span class="color-accent mt-[100px] flex justify-center text-6xl">Loading...</span>
      </div>

      <div v-else-if="data && data.length">
        <div class="card-list gap-4 w-full overflow-auto">
          <div v-for="(column, index) in data" :key="index" class="card-column relative">

            <div class="card-column-header rounded-xl mb-6 px-4 py-2 bg-gradient-accent">
              <h2 class="text-2xl text-center">{{ column.name }}</h2>
            </div>
            <div class="card-column-items">
              <div v-for="card in column.items" :key="card.id" class="card-item">
                <Card class="card-draggable mx-auto w-[250px] relative" draggable="true">
                  <CardHeader class="card-title" role="button">{{ card.name }}</CardHeader>
                  <CardTitle class="card-description">{{ card.companyName }}</CardTitle>
                  <CardDescription class="card-status color-accent">{{ card.status }}</CardDescription>
                  <CardFooter class="card-date text-gray-400">{{ card.$createdAt.slice(0, 10) }}</CardFooter>
                </Card>
                <CreateDeal class="add-todos cursor-pointer active:scale-100 transition-all hover:scale-110 nj-text-shadow" />
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="flex items-center justify-center" v-else>
        <span class="text-red-500 pt-4 w-full text-center text-2xl">Oops... No data available.</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import Login from '@/pages/login.vue'
import Card from '@/components/ui/card/Card.vue'
import { useAuthStore } from '@/stores/auth.store'
import {useKanbanQuery} from '@/components/kanban/useKanbanQuery'
import CreateDeal from '~/components/ui/createDeal.vue';

const title = ref('Home Page');

// Подключение состояния авторизации
const store = useAuthStore();

// Подключение ref для хранения состояния авторизации
const dragCardRef = ref(null);
const sourceColumnRef = ref(null);

const { data, isLoading, refetch } = useKanbanQuery()


</script>

<style lang="scss" scoped>
.card-list {
  display: grid;
  grid-template-columns: repeat(5, minmax(280px, 1fr)); 
  padding: 30px 20px;
  gap: 30px;
  
  ::-webkit-scrollbar-thumb {
  background: #00DC82; /* Цвет ползунка */
  border-radius: 10px; /* Скругление */
  border: 3px solid #f0f0f0; /* Отступ от трека */
}

/* Ползунок при наведении */
::-webkit-scrollbar-thumb:hover {
  background: #00b971; /* Более насыщенный цвет при наведении */
}

/* Ползунок при активном взаимодействии (нажатии) */
::-webkit-scrollbar-thumb:active {
  background: #008a5a; /* Темный цвет при активном взаимодействии */
}
.add-todos {
  position: absolute;
  top: 0%;
  left: 0%;
}

}
</style>