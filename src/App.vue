<template>
  <v-app>
    <observe-notification />
    <router-view></router-view>
  </v-app>
</template>

<script>
import ObserveNotification from "@/shared/ObserveNotification.vue";
export default {
  name: "App",
  components: { ObserveNotification },
};
</script>
<style lang="scss"></style>
