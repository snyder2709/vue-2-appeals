<template>
  <div class="observer__notification">
    <v-alert
      v-for="(notification, index) in notifications"
      :key="index"
      :type="notification.type"
      :value="state_notification"
      border="top"
      dismissible
      elevation="2"
      @input="removeNotification(notification.id)"
      transition="slide-x-reverse-transition"
    >
      {{ notification.message }}
    </v-alert>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ObserveNotification",
  computed: {
    ...mapState("notification", {
      notifications: (state) => {
        return state.notifications;
      },
      state_notification: (state) => {
        return state.state_notification;
      },
    }),
  },
  methods: {
    ...mapActions("notification", [
      "addNotification",
      "removeNotification",
      "toggleStateNotification",
    ]),
  },
};
</script>

<style lang="scss" scoped>
.observer__notification {
  max-width: 320px;
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
