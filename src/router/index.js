import { routes as routesAuth } from "@/features/auth";
import { routes as routesMain } from "@/features/main";

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [...routesMain, ...routesAuth];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.name !== "auth" && !token) next({ name: "auth" });
  else next();
});

export default router;
