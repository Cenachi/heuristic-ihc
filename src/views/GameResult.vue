<script setup lang="ts">
import { useGameStore } from '../stores/points'


const store = useGameStore(); //Game Data

</script>

<template>
  <main>

    <div class="flex flex-col items-center justify-center h-screen gap-8">
        <h1 class="font-bold text-xl mb-8">Resultado</h1>
        <p class="mb-28">Points: {{ store.finalScore }}</p> 

        <RouterLink to="/" class="font-bold flex my-2 border p-4 rounded">Jogar Novamente</RouterLink>
    </div>

  </main>
</template>
