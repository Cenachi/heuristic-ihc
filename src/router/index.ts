import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/GameView.vue'),
    },

    {
      path: '/result',
      name: 'result',
      component: () => import('../views/GameResult.vue'),
    },

  ],
})

export default router
