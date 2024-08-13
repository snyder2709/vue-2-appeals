/* eslint-disable no-debugger */
import axios from "@/api/axios";
import router from "@/router";
import { login } from "../api";

export default {
  namespaced: true,
  state: {
    token: null,
    employeeId: null,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_EMPLOYEE_ID(state, id) {
      state.employeeId = id;
    },
  },
  actions: {
    async loginAuth({ commit }, { username, password }) {
      await login({ username, password }).then((response) => {
        commit("SET_TOKEN", response.data.key);
        commit("SET_EMPLOYEE_ID", response.data.employee_id);
        localStorage.setItem("token", response.data.key);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Token ${response.data.key}`;
        setTimeout(() => {
          router.push({ name: "main" });
        }, 500);
      });
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
};
