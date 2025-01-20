<script setup lang="ts">
import { useGameStore, type Problem, type Site } from '../stores/points'
import { ref, watchEffect } from 'vue';

const store = useGameStore(); // Game Data
const open = ref(false);
const time = ref(10);
let interval: ReturnType<typeof setInterval>;

function resetTimer() {
  time.value = 10;
  clearInterval(interval);
  startTime();
}

function openProblem(site: Site) {
  if (site === store.randomSiteName) {
    open.value = true;
    resetTimer();
  }
}

function answer(heuristic: string) {
  store.answer(heuristic);
  open.value = false;
  resetTimer();
}

watchEffect(() => {
  if (!store.randomProblem) {
    setTimeout(() => {
      store.selectRandomProblem();
    }, 2000);
  }
});

function startTime() {
  interval = setInterval(() => {
    if (open.value) {
      const currentTime = time.value;
      time.value = currentTime - 1;

      if (time.value === 0) {
        store.answer('');
        open.value = false;
        time.value = 10;
      }
    }
  }, 1000);
  return () => clearInterval(interval);
}

startTime();
</script>

<template>
  <main
    class="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white h-screen flex flex-col items-center justify-center p-8">
    <div class="flex flex-col items-center gap-6 bg-white bg-opacity-10 p-8 rounded-lg shadow-lg w-full max-w-3xl">
      <h1 class="font-extrabold text-3xl md:text-4xl tracking-wider drop-shadow-lg">
        Usability Homes
      </h1>

      <p class="text-lg md:text-xl font-medium drop-shadow-md">
        Pontos: <span class="font-bold text-yellow-300">{{ store.points }}</span>
      </p>

      <p class="text-lg md:text-xl font-medium drop-shadow-md">
        Tempo de Resposta: <span class="font-bold text-red-400">{{ time }}</span> segundos
      </p>

      <div class="flex gap-4 flex-wrap items-center justify-center w-full">
        <!-- Exibe os sites somente se nenhuma pergunta estiver aberta -->
        <template v-if="!open">
          <div class="my-2 bg-white bg-opacity-20 p-4 rounded-lg shadow-lg w-full max-w-sm" v-for="site in store.sites"
            :key="site.name">
            <h2 v-if="open ? store.randomSiteName === site : true"
              class="font-bold text-lg text-center cursor-pointer hover:bg-white hover:bg-opacity-30 transition-colors duration-300 p-2 rounded"
              @click="openProblem(site)" :class="store.randomSiteName?.name === site.name ? 'text-red-500' : ''">
              {{ site.name }}
            </h2>
          </div>
        </template>

        <!-- Exibe a pergunta apenas para o site correspondente -->
        <template v-else>
          <div class="bg-black bg-opacity-20 p-4 mt-2 rounded-lg w-full max-w-sm"
            v-if="store.randomSiteName && store.randomProblem">
            <div class="font-bold mb-2 text-center text-white">
              Qual é a heurística para este problema?
            </div>

            <div class="text-center text-gray-200 mb-4">
              {{ store.randomProblem.description }}
            </div>

            <div class="flex flex-col gap-2">
              <button v-for="heuristic in store.heuristics" :key="heuristic"
                class="border border-gray-200 p-2 rounded bg-gray-200 text-black hover:bg-gray-300 cursor-pointer transition-all duration-300"
                @click="answer(heuristic)">
                {{ heuristic }}
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Adiciona animação de fade-in */
main {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
