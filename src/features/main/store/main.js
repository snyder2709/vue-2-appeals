import saveDataByKey from "@/shared/utils/saveDataByKey";
import { getAppealsList, pathAddAppeal, postAddAppeal } from "../api";

/* eslint-disable no-debugger */
const dataSchema = {
  count: 0,
  pages: 0,
  page_size: 0,
  page: 0,
  page_next: 0,
  page_previous: 0,
  results: [],
};
export default {
  namespaced: true,
  state: {
    headers: [
      { text: "№", value: "number", align: "start" },
      { text: "Создана", value: "created_at", align: "start" },
      { text: "Адрес", value: "apartment" },
      { text: "Заявитель", value: "applicant", width: "200px" },
      { text: "Описание", value: "description", width: "200px" },
      { text: "Срок", value: "due_date" },
      { text: "Статус", value: "status" },
    ],
    data: dataSchema,
    isLoad: false,
  },
  mutations: {
    SET_DATA(state, data) {
      state.data = { ...data };
    },
    SET_LOAD(state, value) {
      state.isLoad = value;
    },
  },
  actions: {
    changeLoad({ commit }, value) {
      commit("SET_LOAD", value);
    },
    async getApeals({ commit, state, dispatch }, params) {
      dispatch("changeLoad", true);
      await getAppealsList(params).then(async (response) => {
        let keysListData = Object.keys(state.data);
        if (keysListData.length === 0) {
          keysListData = Object.keys(dataSchema);
        }
        const newData = await saveDataByKey(keysListData, response.data);
        commit("SET_DATA", newData);
        dispatch("changeLoad", false);
      });
    },
    // eslint-disable-next-line no-unused-vars
    async addAppeal({ state }, data) {
      await postAddAppeal(data);
    },
    // eslint-disable-next-line no-unused-vars
    async updateAppeal({ commit, state }, data) {
      await pathAddAppeal(data);
    },
  },
  getters: {
    getHeaders(state) {
      return state.headers;
    },
    getData(state) {
      return state.data;
    },
    getLoad(state) {
      return state.isLoad;
    },
  },
};
