import auth from "@/features/auth/store/auth";
import address from "@/features/main/store/address";
import main from "@/features/main/store/main";
import notification from "@/shared/store/notification.js";

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    notification,
    auth,
    main,
    address,
  },
});
