<script setup lang="ts">
import { useGameStore, type Problem, type Site } from '../stores/points'
import { ref, watchEffect } from 'vue';

const store = useGameStore(); //Game Data
const open = ref(false);
const time = ref(10);

function openProblem(site: Site) {
  if (site === store.randomSiteName) {
    open.value = !open.value;
  }
}

function answer(heuristic: string) {
  store.answer(heuristic);
  open.value = false;
}

watchEffect(() => {
  if (!store.randomProblem) {
    setTimeout(() => {
      store.selectRandomProblem();
    }, 2000);
  }
})

watchEffect(() => {  
  setInterval(() => {
    if (open) {
      time.value -= 1;
    }
  }, 1000);

})

</script>

<template>
  <div class="flex flex-col p-4 justify-center items-center h-screen">
    <h1 class="font-bold text-xl">Usability Homes</h1>

    <p>Points: {{ store.points }}</p>

    <p>{{ time }}</p>

    <div class="flex gap-4 flex-wrap items-center justify-center">
      <div class="my-2" v-for="site in store.sites" :key="site.name">
        <h2 v-if="open ? store.randomSiteName === site : true" class="font-bold flex my-2 border p-4 rounded"
          @click="openProblem(site)" :class="store.randomSiteName?.name === site.name ? 'text-red-500' : ''">
          {{ site.name }}
        </h2>

        <div class="border p-4 mt-2" v-if="site === store.randomSiteName && store.randomProblem && open">
          <div class="font-bold mb-2">What is the heuristic to this problem?</div>

          <div>{{ store.randomProblem.description }}</div>


          <div class="flex flex-col gap-2 mt-4">
            <button v-for="heuristic in store.heuristics" :key="heuristic"
              class="border p-2 rounded hover:bg-gray-200 cursor-pointer" @click="answer(heuristic)">
              {{ heuristic }}
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped></style>
