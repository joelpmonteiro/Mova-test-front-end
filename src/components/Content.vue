<template>
  <v-container class="my-5">
    <v-layout row>
      <v-flex xs12 md6 lg12 xl12>
        <div
          v-if="contentType == 1"
          class="d-flex flex-row flex-xs-row flex-md-row flex-wrap justify-space-around justify-sm-space-around justify-md-space-around justify-xs-space-around pa-5"
        >
          <router-link
            :to="`/search/${value.name}`"
            v-for="(value, index) in cities"
            :key="index"
            ><v-img
              :lazy-src="value.flags.png"
              max-height="180"
              max-width="316"
              :src="value.flags.svg"
              class="responsiveImg"
            ></v-img>
          </router-link>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Content",
  props: {
    cities: {
      type: [Array, Object],
      required: true,
    },
    contentType: {
      //type 1 list content
      //type 2 search Item
      type: [Number, String],
      required: true,
    },
  },
  data: () => ({}),
  computed: {
    ...mapGetters(["gettersAllCountries"]),
    getCountries() {
      return this.gettersAllCountries;
    },
  },
};
</script>
<style lang="scss" scoped>
.v-application a {
  margin: 15px 3px 10px 2px;
}
@media (max-width: 500px) {
  .flex-xs-row {
    flex-direction: column !important;
    margin: auto 6em;
  }
  .responsiveImg {
    margin: 10px auto;
  }
}
</style>
