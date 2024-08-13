<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="success"
          class="green darken-2"
          v-bind="attrs"
          v-on="on"
          @click="openDialog()"
        >
          +Добавить
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{
            editMode ? "Заявка номер" : "Создание заявки"
          }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-autocomplete
                  v-model="modelSearchPremises"
                  :items="getPremisesGetter"
                  :loading="isLoadingPremises"
                  item-text="label"
                  item-value="value"
                  hide-no-data
                  label="Дом"
                  placeholder="Дом"
                  return-object
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-autocomplete
                  v-model="modelSearchApartament"
                  :items="getApartamentGetter"
                  :loading="isLoadingApartament"
                  hide-no-data
                  :disabled="getApartamentGetter.length === 0"
                  hide-selected
                  item-text="label"
                  item-value="value"
                  label="Квартира"
                  placeholder="Квартира"
                  return-object
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="form.due_date_date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Дата"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Отмена
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="
                        () => {
                          $refs.menu.save(date);
                          menu = false;
                        }
                      "
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-menu
                  :close-on-content-click="false"
                  ref="menu_timer"
                  :return-value.sync="form.due_date_time"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="time"
                      label="Время"
                      prepend-icon="mdi-timer-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker v-model="time" format="24hr"
                    ><v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu_timer = false">
                      Отмена
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="
                        () => {
                          $refs.menu_timer.save(date);
                          menu = false;
                        }
                      "
                    >
                      OK
                    </v-btn></v-time-picker
                  >
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-model="form.applicant.last_name"
                  label="Фамилия"
                  :rules="requiredRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-model="form.applicant.first_name"
                  label="Имя"
                  :rules="requiredRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-model="form.applicant.patronymic_name"
                  label="Отчество"
                  :rules="requiredRules"
                ></v-text-field
              ></v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-model="form.applicant.phone"
                  label="Телефон"
                  v-maska="'+# (###) ### ##-##'"
                  :rules="requiredRules"
                ></v-text-field
              ></v-col>
              <v-col cols="12">
                <v-textarea
                  name="input-7-1"
                  v-model="form.description"
                  label="Описание заявки"
                  value=""
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" class="green darken-2" @click="closeDialog">
            Отменить
          </v-btn>
          <v-btn color="success" class="green darken-2" @click="save">
            {{ editMode ? "Сохранить" : "Создать" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import saveDataByKey from "@/shared/utils/saveDataByKey";
import { vMaska } from "maska/vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  directives: { maska: vMaska },
  data() {
    return {
      menu: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      time: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(11, 5),
      params: {
        premise_id: "",
      },
      requiredRules: [(v) => !!v || "обязательное поле"],
      dialog: false,
      editMode: false,
      modelSearchPremises: { label: "", value: "" },
      modelSearchApartament: { label: "", value: "" },
      form: {
        premise_id: "",
        apartment_id: "",
        applicant: {
          first_name: "",
          last_name: "",
          patronymic_name: "",
          username: "",
        },
        description: "",
        due_date_time: "",
        due_date_date: "",
        due_date: "",
      },
    };
  },
  watch: {
    modelSearchPremises: {
      handler: function (newValue, oldValue) {
        if (newValue && newValue.value !== oldValue.value) {
          this.params.premise_id = newValue.value;
          this.getApartament(this.params);
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState("address", [
      "isLoadingPremises",
      "isLoadingApartament",
      "premises",
      "apartament",
    ]),
    ...mapActions("address", ["getPremises", "getApartament"]),
    ...mapGetters("address", ["getPremisesGetter", "getApartamentGetter"]),
  },
  methods: {
    async openDialog(item = null) {
      if (item) {
        this.editMode = true;
        let formKeys = Object.keys(this.form);
        this.form = await saveDataByKey(
          [
            ...formKeys,
            "status",
            "id",
            "created_at",
            "number",
            "premise.id",
            "apartment.id",
            "apartment",
            "premise",
          ],
          item,
          "."
        ).then((item) => {
          item.appeal_id = item.id;

          this.modelSearchApartament = {
            label: item.apartment?.label || "",
            value: item.apartment?.id || "",
          };
          this.modelSearchPremises = {
            label: item.premise?.address || "",
            value: item.premise?.id || "",
          };
          [
            "due_date_date",
            "due_date_time",
            "id",
            "premise",
            "apartment",
          ].forEach((key) => delete item[key]);
          return item;
        });
      } else {
        this.editMode = false;
        this.form = {
          premise_id: this.modelSearchPremises["value"],
          apartment_id: this.modelSearchApartament["value"],
          applicant: {
            first_name: "",
            last_name: "",
            patronymic_name: "",
            username: "",
          },
          description: "",
          due_date_time: this.time,
          due_date_date: this.date,
          due_date: "",
        };
      }
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;

      this.form = {
        premise_id: "",
        apartment_id: "",
        applicant: {
          first_name: "",
          last_name: "",
          patronymic_name: "",
          username: "",
        },
        description: "",
        due_date: "",
      };

      this.date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10);
      this.time = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(11, 5);
    },
    save() {
      if (this.editMode) {
        this.form.premise_id = this.modelSearchPremises["value"];
        this.form.apartment_id = this.modelSearchApartament["value"];
        this.$emit("update-item", this.form);
      } else {
        this.form.status_id = 1;
        this.form.premise_id = this.modelSearchPremises["value"];
        this.form.apartment_id = this.modelSearchApartament["value"];
        this.form.due_date =
          this.form.due_date_date + " " + this.form.due_date_time;
        ["due_date_date", "due_date_time", "id"].forEach(
          (key) => delete this.form[key]
        );
        this.$emit("add-item", this.form);
      }
      this.closeDialog();
    },
  },
  mounted() {
    this.getPremises();
  },
};
</script>
