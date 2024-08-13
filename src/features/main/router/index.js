import MainView from "../views/MainView.vue";
const routes = [
  {
    path: "/",
    name: "main",
    component: MainView,
    meta: { requiresAuth: true },
  },
];
export { routes };
