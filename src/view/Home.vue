<template>
  <v-app>
    <div>
      <v-alert shaped outlined type="success">
        I'm a shaped alert with a outline option
      </v-alert>
    </div>
    <HeaderComponent />

    <v-main>
      <SectionComponent
        @send-data-for-request-countries="getCountriesByManyParams"
      />
      <ContentComponent :cities="historyList" :contentType="1" />
    </v-main>
    <v-footer class="Blank_Footer">
      <v-container>
        <v-layout row>
          <v-flex xs12 md12 lg12 xl12>
            <v-pagination
              v-model="page"
              :length="pages"
              class="my-5 secondaryColor"
              @input="updatePage"
              color="#6d2080"
            ></v-pagination>
          </v-flex>
        </v-layout>
      </v-container>
    </v-footer>
  </v-app>
</template>
<script>
import HeaderComponent from "@/components/header/Header.vue";
import SectionComponent from "@/components/section/Section.vue";
import ContentComponent from "@/components/content/Content.vue";
// import FooterComponent from "@/components/FooterPagination.vue";
import axios from "../services/axios.js";
import { mapMutations } from "vuex";
export default {
  name: "home",

  components: {
    HeaderComponent,
    SectionComponent,
    ContentComponent,
    // FooterComponent,
  },

  data: () => ({
    countries: [],
    page: 1,
    perPage: 12,
    listCount: 0,
    historyList: [],
    searchForReagion: "",
  }),
  computed: {
    pages() {
      if (this.perPage == null || this.listCount == null) return 0;
      return Math.ceil(this.listCount / this.perPage);
    },
  },
  methods: {
    ...mapMutations(["mutFiltringCountries", "mutAllCountries"]),
    async getCountriesByManyParams(variable) {
      try {
        if (variable.select_one !== "" || variable.select_two !== "") {
          const countries = await axios.getAllCountriesByParams(
            variable.url,
            variable.select_two
          );
          //           Object.values(allDados.data).forEach((item) => {
          // Object.values(item.callingCodes).forEach((x, index) => {
          // reducersValueCodeUndefined.push( Object.values(item.callingCodes)[index] ); });
          // });

          if (countries.status === 200) {
            if (Array.isArray(countries.data)) {
              this.countries = countries.data;
              this.initPage();
              this.updatePage(this.page);

              this.mutFiltringCountries({ payload: this.countries });
            } else {
              this.countries = [countries.data];
              this.mutFiltringCountries({ payload: this.countries });
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    initPage: function () {
      this.listCount = this.countries.length;

      if (this.listCount < this.perPage) {
        this.historyList = this.countries;
      } else {
        this.historyList = this.countries.slice(0, this.perPage);
      }
    },
    updatePage: function (pageIndex) {
      let start = (pageIndex - 1) * this.perPage;
      let end = pageIndex * this.perPage;
      this.historyList = this.countries.slice(start, end);
      this.page = pageIndex;
    },
  },
};
</script>
<style lang="scss" scoped>
.Blank_Footer {
  background-color: #fff !important;
}
</style>
