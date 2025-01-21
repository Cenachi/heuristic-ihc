<script setup lang="ts">
import { ref, onMounted } from "vue";

const stories = ref([
  {
    title: "Seja bem-vindo(a) jogador(a)!",
    description: "Explore as heurísticas de Nielsen e pratique suas habilidades de avaliação de usabilidade. Vamos começar?",
    image: new URL("../assets/person.png", import.meta.url).href,
  },
  {
    title: "Heurísticas de Nielsen",
    description: "Explore as 10 heurísticas de Nielsen presentes em cada um dos 6 sites, clique no site com erro para descobrir o problema.",
    image: new URL("../assets/page1.png", import.meta.url).href,
  },
  {
    title: "Questões dos Problemas", 
    description: "Uma contagem regressiva de 60 segundos será iniciada, responda antes que o tempo termine.",
    image: new URL("../assets/page2.png", import.meta.url).href,
  },

  {
    title: "Pontuação Final",
    description: "Ao final, você receberá um placar com a pontuação total de acertos. E podera reiniciar o jogo, ou assistir o tutorial novamente.",
    image: new URL("../assets/page3.png", import.meta.url).href,
  },
]);

const currentIndex = ref(0);
const isLastStory = ref(false);

// Navegar para o próximo slide
function nextStory() {
  if (currentIndex.value < stories.value.length - 1) {
    currentIndex.value++;
  } else {
    isLastStory.value = true;
  }
}

</script>

<template>
  <main
    class="h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white flex items-center justify-center">
    <div
      class="container max-w-2xl w-full bg-white bg-opacity-10 p-6 rounded-lg shadow-xl flex flex-col items-center text-center">
      <div v-if="!isLastStory" class="flex flex-col items-center gap-4">
        <!-- Imagem do Story -->
        
        <img :src="stories[currentIndex].image" alt="Story Image" class="w-150 h-72" />

        <!-- Título -->
        <h1 class="text-3xl font-bold tracking-wide">
          {{ stories[currentIndex].title }}
        </h1>

        <!-- Descrição -->
        <p class="text-lg text-gray-200">
          {{ stories[currentIndex].description }}
        </p>

        <!-- Botão Próximo -->
        <button @click="nextStory"
          class="mt-4 py-2 px-6 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
          Próximo
        </button>
      </div>

      <div v-else class="text-center flex flex-col items-center gap-6">
        <h1 class="text-3xl font-bold">Parabéns!</h1>
        <p class="text-lg text-gray-200">
          Você completou o Storboard!
          Pronto(a) para começar?
        </p>
        <RouterLink to="/game"
          class="py-2 px-6 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors">
          Iniciar
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Animação de fade-in */
main {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10%);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.container img {
  animation: zoomIn 1s ease-in-out;
}

@keyframes zoomIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
