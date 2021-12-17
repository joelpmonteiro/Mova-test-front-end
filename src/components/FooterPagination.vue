<template>
  <v-footer class="Blank_Footer">
    <v-container>
      <v-layout row>
        <v-flex xs12 md12 lg12 xl12>
          <v-pagination
            v-model="pageOne"
            :length="lengthPages"
            class="my-5"
            @input="callback()"
          ></v-pagination>
        </v-flex>
      </v-layout>
    </v-container>
  </v-footer>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Footer",
  // :page="page" :lengthPages="pages" :callback="updatePage"

  props: {
    page: {
      type: Number,
      required: true,
    },
    lengthPages: {
      type: [Number, Function],
      required: true,
    },
    callback: {
      type: [Object, Function],
      required: true,
    },
  },
  data: () => ({
    pageOne: 1,
  }),
  computed: {
    ...mapGetters(["gettersAllCountries"]),
    getAllCountries() {
      console.log(
        this.gettersAllCountries.slice(
          (this.page - 1) * this.perPage,
          this.page * this.perPage
        )
      );
      return this.gettersAllCountries.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      );
    },
    getLength() {
      return this.gettersAllCountries.length;
    },
    getLength1() {
      return this.callback;
    },
  },
  methods: {
    clickPagination() {
      this.$emit("send-click-pagination", this.pageOne);
    },
  },
  mounted() {
    console.log(this.pageOne);
  },
};
</script>
<style lang="scss" scoped>
.Blank_Footer {
  background-color: #fff !important;
}
</style>
