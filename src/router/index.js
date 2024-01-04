import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import Question from '@/views/Front/Question.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "/Survey",
      name: "Survey",
      component: () => import("../views/Front/Survey.vue"),
    },
    {
      path: "/Statistics",
      name: "Statistics",
      component: () => import("../views/Front/Statistics.vue"),
    },
    {
      path: "/Question",
      name: "Question",
      component: () => import("../views/Front/Question.vue"),
    },
    {
      path: "/Manage",
      name: "Manage",
      component: () => import("../views/Back/Manage.vue"),
    },
    {
      path: "/ManageConfirm",
      name: "ManageConfirm",
      component: () => import("../views/Back/ManageConfirm.vue"),
    },
    {
      path: "/ManageCreate/",
      name: "ManageCreate",
      component: () => import("../views/Back/ManageCreate.vue"),
    },
    {
      path: "/Responsive/:quizNum",
      name: "Responsive",
      component: () => import('../views/Back/Responsive.vue'), // 確保你的 Response 組件存在
      props: true, // 啟用 props，將路由參數作為組件的屬性傳遞
    },
  ]
})

export default router
