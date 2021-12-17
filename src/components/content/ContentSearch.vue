<template>
  <v-container class="grey lighten-5">
    <v-row class="mb-6" no-gutters>
      <v-col>
        <v-card class="pa-2">
          <v-img
            :lazy-src="citie.flags.png"
            :src="citie.flags.svg"
            class="responsiveImg"
          ></v-img>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-2">
          <div class="my-2">Nome:{{ citie.name }}</div>
          <div class="my-2">Capital: {{ citie.capital }}</div>
          <div class="my-2">
            Região:
            <a @click.prevent="clickRegion(citie)">{{ citie.region }}</a>
          </div>
          <div class="my-2">Sub-Região: {{ citie.subregion }}</div>
          <div class="my-2">População: {{ citie.population }}</div>
          <div class="my-2">
            Linguas:
            <span v-for="(value, index) in citie.languages" :key="index"
              >{{
                citie.languages.length > 0
                  ? `${
                      citie.languages.length > 1
                        ? value.nativeName + " | "
                        : value.nativeName
                    } `
                  : ` | ${value.nativeName}`
              }}
            </span>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="pa-2">
          <div>Países Vizinhos</div>
        </v-card>
        <div class="col-sm-3 col-xs-12 col-md-6 col-lg-12 col-xl-12 pa-2">
          <div
            class="d-flex flex-row flex-xs-row flex-md-row flex-wrap justify-space-around justify-sm-space-around justify-md-space-around justify-xs-space-around"
          >
            <router-link
              :to="`/search/${value.name}`"
              v-for="(value, index) in borders"
              :key="index"
            >
              <v-img
                :lazy-src="value.flags.png"
                max-height="150"
                max-width="200"
                :src="value.flags.svg"
                class="responsiveSmallMobile"
              ></v-img>
            </router-link>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "ContentSearch",
  props: {
    citie: {
      type: [Array, Object],
      required: true,
    },
    borders: {
      type: Array,
      required: true,
    },
  },
  data: () => ({}),
  methods: {
    clickRegion(variable) {
      console.log(variable);
      this.$router.push({ name: "home", params: { region: variable.region } });
    },
  },
};
</script>
<style lang="scss" scoped>
.v-sheet.v-card {
  box-shadow: none !important;
}
.v-application .grey {
  background-color: #fff !important;
  border-color: #fff !important;
}

.responsiveImg {
  max-width: 316px;
  max-height: 180px;
}

@media (max-width: 960px) {
  .responsiveImg {
    max-width: 430px !important;
    max-height: 190px !important;
  }
  .col-sm-2 {
    flex: 0 0 16.6666666667%;
    max-width: 16.6666666667%;
  }
  .col-sm-3 {
    flex: 0 0 80% !important;
    max-width: 80% !important;
  }
  .responsiveSmallMobile {
    margin: 5px auto 10px auto;
  }
}
</style>
