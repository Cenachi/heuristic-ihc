<script setup lang="ts">
import { useGameStore } from '../stores/points'

const store = useGameStore(); // Game Data
</script>

<template>
  <main class="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white h-screen flex items-center justify-center">
    <div class="flex flex-col items-center justify-center gap-6 bg-white bg-opacity-10 p-8 rounded-lg shadow-lg">
      <h1 class="font-extrabold text-3xl md:text-4xl tracking-wider mb-4 drop-shadow-lg">
        Resultado Final 🎉
      </h1>

      <p class="text-xl md:text-2xl font-medium mb-12 drop-shadow-md">
        Pontuação: <span class="font-bold text-yellow-300">{{ store.finalScore }}</span>
      </p>

      <RouterLink
        to="/"
        class="font-bold text-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-6 py-3 rounded-full shadow-md hover:shadow-lg text-white"
      >
        Jogar Novamente
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
/* Adicione transições suaves e animações */
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
