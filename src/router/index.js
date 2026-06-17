import { createRouter, createWebHistory } from "vue-router";

import Auth from "../pages/Auth.vue";
import Dashboard from "../pages/Dashboard.vue";

const routes = [
  {
    path: "/",
    redirect: "/auth",
  },

  {
    path: "/auth",
    component: Auth,
  },

  {
    path: "/login",
    redirect: "/auth",
  },

  {
    path: "/dashboard",
    component: Dashboard,
  },

  {
    path: "/:pathMatch(.*)*",
    redirect: "/auth",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;