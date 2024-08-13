<template>
  <div class="auth-page">
    <v-container class="auth-container">
      <v-card
        min-width="380px"
        max-width="340px"
        class="auth-card rounded-md pt-16 pl-8 pr-8"
        elevation="12"
      >
        <v-card-title
          outlined
          elevation="12"
          class="green darken-2 title-absolute white--text rounded-lg justify-center pa-6"
        >
          Авторизация
        </v-card-title>

        <v-form v-model="valid" align="center" ref="form">
          <v-text-field
            v-model="login"
            :rules="loginRules"
            label="Логин"
            required
            prepend-inner-icon="mdi-account-box-outline"
            class="py-2"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Пароль"
            required
            class="py-2"
            prepend-inner-icon="mdi-lock"
          ></v-text-field>
          <div class="mt-6">
            <v-btn
              :disabled="!valid"
              class="px-12 green darken-2"
              x-large
              color="success"
              @click="submit"
            >
              Войти
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "AuthView",
  components: {},
  data: () => ({
    valid: false,
    login: "",
    password: "",
    passwordRules: [(v) => !!v || "обязательное поле"],
    loginRules: [(v) => !!v || "обязательное поле"],
  }),
  computed: {
    ...mapState("auth", ["token"]),
  },
  methods: {
    ...mapActions("auth", ["loginAuth"]),
    ...mapActions("notification", ["addNotification"]),
    submit() {
      this.$refs.form.validate();
      if (this.valid) {
        this.loginAuth({
          username: this.login,
          password: this.password,
        });
      }
    },
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.addNotification({
        notification: {
          type: "success",
          message: "С возвращением!",
        },
        duration: 3000,
      });
      this.$router.push({ name: "main" });
    }
  },
};
</script>

<style lang="scss" scoped>
.auth-page {
  background-image: url("@/assets/background/bg_entry.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.title-absolute {
  position: absolute;
  width: 90%;
  top: -15%;
  right: 0;
  left: 0;
  margin: auto;
}
.auth-container {
  max-width: 600px;
  display: flex;
  justify-content: center;
}

.auth-card {
  padding: 20px;
}
</style>
