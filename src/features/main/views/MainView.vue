<template>
  <div class="grey lighten-5 main">
    <v-container class="grey lighten-5 mb-6">
      <v-row no-gutters class="mt-6">
        <v-col cols="12">
          <h1 class="text-h4 grey--text">Список заявок</h1>
        </v-col>
      </v-row>
      <v-main class="mt-16">
        <form-add-order
          ref="formAddOrder"
          class="mb-6 mr-4"
          :current-item="selectedItem"
          @add-item="handleAddItem"
          @update-item="handleUpdateItem"
        />
        <table-order
          :load="isLoad"
          :total_count="getData.count"
          :total_pages="getData.pages"
          :headers="headers"
          :items="data?.results"
          :params="params"
          @update:search="onUpdateSearch"
          @update:search_premise="onUpdateSearchPremise"
          @update:page="onUpdatePage"
          @update:itemsPerPage="onUpdateItemsPerPage"
          @row-click="onRowClick"
        />
      </v-main>
    </v-container>
  </div>
</template>

<script>
import debounce from "@/shared/utils/debounce";
import { mapActions, mapGetters, mapState } from "vuex";
import FormAddOrder from "../components/FormAddOrder.vue";
import TableOrder from "../components/TableOrder.vue";

export default {
  name: "MainView",
  components: { TableOrder, FormAddOrder },
  data: () => ({
    params: {
      search: "",
      page: 1,
      page_size: 10,
      premise_id: null,
    },
    selectedItem: null,
  }),
  computed: {
    ...mapState("main", ["headers", "isLoad", "data"]),
    ...mapGetters("main", ["getData", "getLoad"]),
  },
  methods: {
    ...mapActions("main", [
      "getApeals",
      "updateAppeal",
      "addAppeal",
      "changeLoad",
    ]),

    onRowClick(item) {
      this.selectedItem = item;
      this.$refs.formAddOrder.openDialog(item);
    },

    onUpdateSearch: debounce(function (value) {
      this.params.search = value;
      this.getApeals(this.params);
    }, 2000),
    onUpdateSearchPremise: debounce(function (select_value) {
      this.params.premise_id = select_value?.value || null;
      this.getApeals(this.params);
    }, 500),

    onUpdatePage(value) {
      this.params.page = value;
      this.getApeals(this.params);
    },

    onUpdateItemsPerPage(value) {
      this.params.page_size = value;
      this.getApeals(this.params);
    },

    async handleAddItem(item) {
      await this.addAppeal(item);
      await this.getApeals(this.params);
      this.selectedItem = null;
    },

    async handleUpdateItem(item) {
      await this.updateAppeal(item);
      this.getApeals(this.params);
      this.selectedItem = null;
    },
  },
  mounted() {
    this.getApeals(this.params);
  },
};
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
  width: 100vw;
}
</style>
