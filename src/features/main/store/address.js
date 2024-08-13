import { getUserApartament, getUserPremises } from "../api";

/* eslint-disable no-debugger */

const selectFn = {
  select: (data) => {
    if (data) {
      return data.map((e) => ({ label: e.short_address, value: e.id }));
    } else {
      return [];
    }
  },
  selectApartament: (data) => {
    if (data) {
      return data.map((e) => ({ label: e.label, value: e.id }));
    } else {
      return [];
    }
  },
  all: (data) => data,
};

export default {
  namespaced: true,
  state: {
    premises: [],
    apartament: [],
  },
  mutations: {
    SET_PREMISES(state, data) {
      state.premises = data;
    },
    SET_APARTAMENT(state, data) {
      state.apartament = data;
    },
  },
  actions: {
    async getPremises({ commit }, { params }) {
      await getUserPremises(params).then((response) => {
        let prepareData = selectFn["select"](response.data.results);
        commit("SET_PREMISES", prepareData);
      });
    },
    async getApartament({ commit }, { params }) {
      await getUserApartament(params).then((response) => {
        let prepareData = selectFn["selectApartament"](response.data.results);

        commit("SET_APARTAMENT", prepareData);
      });
    },
  },
  getters: {
    getPremisesGetter(state) {
      return state.premises;
    },
    getApartamentGetter(state) {
      return state.apartament;
    },
  },
};
