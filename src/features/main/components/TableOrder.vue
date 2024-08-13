<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container>
    <v-card class="pa-4 rounded-lg">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="6">
              <v-text-field
                append-icon="mdi-magnify"
                label="Поиск (№ заявки, название)"
                single-line
                hide-details
                class="mb-4"
                @input="onSearchChange"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-autocomplete
                v-model="modelSearchPremises"
                clearable
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
          </v-row>
          <v-data-table
            :loading="$props.load"
            loading-text="Загрузка... Пожалуйста, подождите"
            height="60vh"
            @click:row="onRowClick"
            :headers="headers"
            :items="$props.items"
            :search="computedSearch"
            :page.sync="$props.params.page"
            :items-per-page="modelPage"
            class="elevation-1"
            hide-default-footer
            item-key="id"
          >
            <template v-slot:item.number="{ item }">
              <v-chip color="green" dark>{{ item.number }}</v-chip>
            </template>
            <template v-slot:item.apartment="{ item }">
              {{ item?.premise?.address }}
              {{ item?.apartment?.label }}
            </template>
            <template v-slot:item.created_at="{ item }">
              {{ moment(item.created_at).format("DD.MM.YYYY") }}
            </template>
            <template v-slot:item.due_date="{ item }">
              {{ moment(item.due_date).format("DD.MM.YYYY HH:mm") }}
            </template>
            <template v-slot:item.applicant="{ item }">
              {{ prepareApplicants(item) }}
            </template>
            <template v-slot:item.status="{ item }">
              {{ item.status.name }}
            </template>
          </v-data-table>
          <div
            class="text-center pt-8 d-flex align-center justify-space-between"
          >
            <div class="d-flex align-center">
              {{ paginationText }}

              <v-select
                v-model="modelPage"
                :items="itemsPerPage"
                class="ml-12"
                :full-width="false"
                label="Элементов на странице"
                @change="onItemsPerPageChange"
              ></v-select>
            </div>
            <v-col cols="6">
              <v-container class="max-width">
                <v-pagination
                  v-model="$props.params.page"
                  :length="$props.total_pages"
                  class="ml-4"
                  circle
                  prev-icon="mdi-chevron-left"
                  next-icon="mdi-chevron-right"
                  color="green darken-2"
                  @input="onPageChange"
                ></v-pagination>
              </v-container>
            </v-col>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import moment from "moment";
import { mapGetters, mapState } from "vuex";
export default {
  name: "TableOrder",
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    total_pages: {
      type: Number,
      default: 0,
    },
    total_count: {
      type: Number,
      default: 0,
    },
    items: {
      type: Array,
      default: () => [],
    },
    params: {
      type: Object,
      default: () => {},
    },
    load: {
      type: Boolean,
    },
  },
  data: () => ({
    search: "",
    page: 1,
    modelPage: 10,
    itemsPerPage: [5, 10, 15, 20],
    modelSearchPremises: null,
  }),
  computed: {
    moment() {
      return moment;
    },
    ...mapState("address", ["isLoadingPremises"]),
    ...mapGetters("address", ["getPremisesGetter"]),
    computedSearch() {
      return this.$props.params.search || this.search;
    },
    computedSearchPremises() {
      return this.$props.params.search || this.search;
    },

    paginationText() {
      const start =
        (this.$props.params.page - 1) * this.$props.params.page_size;
      const end = start + this.$props.params.page_size;
      return `${start}-${end} из ${this.$props.total_count} записей`;
    },
  },
  watch: {
    modelSearchPremises: {
      handler: function () {
        this.$emit("update:search_premise", this.modelSearchPremises);
      },
      immediate: true,
    },
  },
  methods: {
    prepareApplicants(item) {
      const applicant = item.applicant;
      const patronymicName = applicant.patronymic_name || "";
      const firstName = applicant.first_name || "";
      const lastName = applicant.last_name || "";

      const firstInitial = firstName.charAt(0).toUpperCase();
      const lastInitial = patronymicName.charAt(0).toUpperCase();

      return `${lastName} ${firstInitial}. ${lastInitial}.`;
    },
    onSearchChange(value) {
      this.$emit("update:search", value);
    },
    onPageChange(value) {
      this.$emit("update:page", value);
    },
    onItemsPerPageChange(value) {
      this.$emit("update:itemsPerPage", value);
    },
    onRowClick(item) {
      this.$emit("row-click", item);
    },
  },
};
</script>
