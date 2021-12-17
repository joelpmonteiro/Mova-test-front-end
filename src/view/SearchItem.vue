<template>
  <v-app>
    <HeaderComponent />

    <v-main>
      <ContentSearchComponent
        :citie="getSelectCountries"
        :borders="historyBordersList"
      />
    </v-main>
    <v-footer class="Blank_Footer">
      <v-container>
        <v-layout row>
          <v-flex xs12 md12 lg12 xl12>
            <v-pagination
              v-model="page"
              :length="pages"
              class="my-5"
              @input="updatePage"
            ></v-pagination>
          </v-flex>
        </v-layout>
      </v-container>
    </v-footer>
  </v-app>
</template>
<script>
import HeaderComponent from "@/components/Header.vue";
import ContentSearchComponent from "@/components/ContentSearch.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    HeaderComponent,
    ContentSearchComponent,
  },
  data: () => ({
    page: 1,
    perPage: 12,
    listCount: 0,
    historyBordersList: [],
    borders: [],
    citiesBorder: [],
    componentKey: 0,
  }),
  computed: {
    ...mapGetters([
      "gettersFiltringCountriesById",
      "gettersAllCountriesBordersByAlphaCode",
    ]),
    getSelectCountries() {
      return this.gettersFiltringCountriesById(this.$route.params.name);
    },
    getAllCountries() {
      this.borders.forEach((item) => {
        this.citiesBorder.push(
          ...this.gettersAllCountriesBordersByAlphaCode(item)
        );
      });
      return this.citiesBorder;
    },
    pages() {
      if (this.perPage == null || this.listCount == null) return 0;
      return Math.ceil(this.listCount / this.perPage);
    },
  },
  methods: {
    initPage: function () {
      this.listCount = this.citiesBorder.length;
      if (this.listCount < this.perPage) {
        this.historyBordersList = this.citiesBorder;
      } else {
        this.historyBordersList = this.citiesBorder.slice(0, this.perPage);
      }
    },
    updatePage: function (pageIndex) {
      let start = (pageIndex - 1) * this.perPage;
      let end = pageIndex * this.perPage;
      this.historyBordersList = this.citiesBorder.slice(start, end);

      this.page = pageIndex;
    },
  },
  mounted() {
    try {
      Object.values(this.getSelectCountries.borders).forEach((item) => {
        this.borders.push(item);
      });
      //Inicializa a computed dos citiesBorder
      this.getAllCountries;
      this.initPage();
      this.updatePage(this.page);
    } catch (error) {
      console.log(error);
    }

    //Instacia Mounted
  },
  created() {},
};
</script>
