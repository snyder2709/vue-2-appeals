/* eslint-disable no-debugger */
export default {
  namespaced: true,
  state: {
    notifications: [],
    state_notification: false,
    notificationTimeouts: {},
  },
  mutations: {
    ADD_NOTIFICATION(state, notification) {
      state.notifications.push(notification);
    },
    TOGGLE_STATE_NOTIFICATION(state, value) {
      state.state_notification = value;
    },
    REMOVE_NOTIFICATION(state, id) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== id
      );
      clearTimeout(state.notificationTimeouts[id]);
      delete state.notificationTimeouts[id];
    },
  },
  actions: {
    toggleStateNotification({ commit }, value) {
      // debugger;
      setTimeout(() => commit("TOGGLE_STATE_NOTIFICATION", value), 100);
    },
    addNotification({ state, commit, dispatch }, { notification, duration }) {
      const id = Date.now();
      commit("ADD_NOTIFICATION", { ...notification, id });
      dispatch("toggleStateNotification", true);

      const timeoutId = setTimeout(() => {
        commit("REMOVE_NOTIFICATION", id);
        if (state.notifications.length === 0) {
          dispatch("toggleStateNotification", false);
        }
      }, duration);

      state.notificationTimeouts[id] = timeoutId;
    },
    removeNotification({ state, commit, dispatch }, id) {
      commit("REMOVE_NOTIFICATION", id);
      if (state.notifications.length === 0) {
        dispatch("toggleStateNotification", false);
      }
    },
  },
  getters: {
    notifications: (state) => state.notifications,
    state_notification: (state) => state.state_notification,
  },
};
