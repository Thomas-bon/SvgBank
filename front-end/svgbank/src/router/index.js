import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import CategoriesView from '@/views/Categories.vue'
import Result from '@/views/Result.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/category/:slug',
      name: 'category',
      component: CategoriesView,
      props: true
    },
    {
      path: '/search/:query',
      name: 'Result',
      component: Result,
      props: true
    }
  ],
})

export default router