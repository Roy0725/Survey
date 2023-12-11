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
      path: "/Inside",
      name: "Inside",
      component: () => import("../views/Front/Inside.vue"),
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
      path: "/ManageInside",
      name: "ManageInside",
      component: () => import("../views/Back/ManageInside.vue"),
    },
  ]
})

export default router
