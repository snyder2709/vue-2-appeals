import moment from "moment";
import "moment/locale/ru";
import Vue from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";

moment.locale("ru");
Vue.config.productionTip = true;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
