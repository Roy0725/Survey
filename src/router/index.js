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
      path: "/Respon",
      name: "Respon",
      component: () => import("../views/Front/Respon.vue"),
    },
    {
      path: "/Question",
      name: "Question",
      component: () => import("../views/Front/Question.vue"),
    },
    // {
    //   path: "/edit-survey/:questionId",
    //   name: "edit-survey",
    //   component: Question,
    //   props:true,
    // },
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
    // {
    //   path: "/ManageCreate/:id",
    //   name: "ManageCreate/:id",
    //   component: () => import("../views/Back/ManageCreate.vue"),
    //   props:true
    // },
  ]
})

export default router
