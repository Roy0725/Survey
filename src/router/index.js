import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      path: "/Confirm",
      name: "Confirm",
      component: () => import("../views/Front/Confirm.vue"),
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
      path: "/ManageCreate",
      name: "ManageCreate",
      component: () => import("../views/Back/ManageCreate.vue"),
    },
  ]
})

export default router
