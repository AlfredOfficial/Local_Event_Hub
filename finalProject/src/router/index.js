import { createRouter, createWebHistory } from 'vue-router'
import EventView from '../views/EventView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: EventView,
    },
  ],
})

export default router
