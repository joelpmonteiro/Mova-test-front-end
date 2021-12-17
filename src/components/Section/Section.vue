<template>
  <v-container class="my-5">
    <v-layout
      class="flex-sm-column flex-xs-column d-flex flex-row flex-xs-row flex-md-row justify-space-around justify-sm-space-around justify-md-space-around justify-xs-space-around pa-5"
    >
      <div>
        <label>Filtrar Por</label>
        <v-select
          v-model="select"
          :items="items"
          item-text="arg"
          item-value="abbr"
          label="Escolha uma opção"
          return-object
          single-line
          @change="chooseCategorySelect"
        ></v-select>
      </div>
      <div v-if="select.arg !== '' && select.abbr !== ''">
        <label>{{ select.arg }}</label>
        <v-select
          v-model="select_type"
          :items="
            items_type[0][
              select.arg === 'País'
                ? 'pais'
                : select.arg === 'Codigo de ligação'
                ? 'Codigo'
                : select.arg === 'Lingua'
                ? 'Lingua'
                : select.arg
            ]
          "
          :item-text="
            select.arg === 'País'
              ? 'code'
              : select.arg === 'Lingua'
              ? 'iso639_1'
              : ''
          "
          :label="`Escolha um(a) ${select.arg}`"
        ></v-select>
      </div>
      <div class="d-flex btn-row-reverse my-8 pa-2">
        <v-btn
          color="color_Accent"
          class="flex-row btn-flex-reverse"
          raised
          @click.prevent="getTypeCountries"
          >Pesquisar</v-btn
        >
      </div>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "../../services/axios";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      //fazer array de array para parametrizar o select
      //Africa, Americas, Asia, Europe, Oceania.
      listCountries: [],
      select_type: [],
      select: { arg: "", abbr: "" },
      items_type: [
        {
          Região: ["Africa", "Americas", "Asia", "Europa", "Oceania"],
          Capital: [],
          Lingua: [],
          pais: [],
          Codigo: [],
        },
      ],
      items: [
        { arg: "Região", abbr: "rg" },
        { arg: "Capital", abbr: "cap" },
        { arg: "Lingua", abbr: "ling" },
        { arg: "País", abbr: "país" },
        { arg: "Codigo de ligação", abbr: "DDD" },
      ],
    };
  },
  methods: {
    ...mapMutations(["mutAllCountries"]),
    getTypeCountries() {
      let url = "";
      this.select.arg === "Região"
        ? (url = "region")
        : this.select.arg === "Capital"
        ? (url = "capital")
        : this.select.arg === "Lingua"
        ? (url = "lang")
        : this.select.arg === "País"
        ? (url = "alpha")
        : this.select.arg === "Codigo de ligação"
        ? (url = "callingcode")
        : (url = "OtherLink");
      this.$emit("send-data-for-request-countries", {
        select_one: this.select.arg,
        select_two: this.select_type,
        url: url,
      });
    },
    chooseCategorySelect() {
      if (this.select.arg === "Lingua") {
        const t = this.listCountries.map((item) => item.languages);
        const x = Object.values(t);
        x.map((item) => {
          return item.length == 1
            ? item
            : item.map((item2) => {
                return item2;
              });
        });
      } else if (this.select.arg === "País") {
        const countries = this.listCountries.map((item) => {
          return { code: item.alpha3Code, countries: item.name };
        });
        this.$set(this.items_type[0], "pais", countries);
      }
    },
  },
  async mounted() {
    try {
      const allDados = await axios.getAllDados();
      if (allDados.status === 200) {
        this.listCountries = allDados.data;
      }

      this.mutAllCountries({ payload: this.listCountries });
      //Reduz o array pois existe possiveis campos undefindo
      const reducersValueUndefined = allDados.data.filter(
        (item) => item.capital !== undefined
      );
      //envia somente a capital para a variavel
      const capital = reducersValueUndefined.map((item) => item.capital);
      let reducersValueCodeUndefined = [];
      let reducersValueLang = [];
      Object.values(allDados.data).forEach((item) => {
        Object.values(item.languages).forEach((value) => {
          reducersValueLang.push(value);
        });
      });

      Object.values(allDados.data).forEach((item) => {
        Object.values(item.callingCodes).forEach((value, index) => {
          reducersValueCodeUndefined.push(
            Object.values(item.callingCodes)[index]
          );
        });
      });
      this.$set(this.items_type[0], "Codigo", reducersValueCodeUndefined);
      this.$set(this.items_type[0], "Capital", capital);
      this.$set(this.items_type[0], "Lingua", reducersValueLang);

      //console.log(lang);
    } catch (error) {
      this.$swal(
        "Atenção",
        "Erro no processo de busca, atualize a pagina e tente novamente!",
        "warning"
      ).then(() => {
        this.$router.go(-1);
      });
    }
  },
  created() {
    if (this.$route.params.region !== undefined) {
      this.searchForReagion = this.$route.params;
      console.log(this.searchForReagion);
      this.$set(this.select, `arg`, "Região");
      this.$set(this.select, `abbr`, "rg");
      this.select_type = this.searchForReagion.region;
    }
  },
};
</script>
<style lang="scss">
div.widthSection {
  display: flex;
  margin: 2em auto;
}
@media (max-width: 600px) {
  .v-application .flex-xs-column {
    flex-direction: column !important;
  }
  .v-application .flex-row {
    margin: auto 10px;
  }

  .v-application .d-flex.btn-row-reverse {
    flex-direction: row-reverse !important;
  }
}

@media (max-width: 975px) {
  .v-application .flex-xs-column {
    flex-direction: column !important;
  }
  .v-application .flex-row {
    margin: auto 10px;
  }

  .v-application .d-flex.btn-row-reverse {
    flex-direction: row-reverse !important;
  }
  .col-sm-2 {
    flex: 0 0 16.6666666667%;
    max-width: 16.6666666667%;
  }
  .col-sm-3 {
    flex: 0 0 25%;
    max-width: 25%;
  }
}

.color_Accent {
  background-color: #6d2080 !important;
  border-color: #6d2080 !important;
  border-radius: 10px;
  span {
    color: #fff !important;
    font-size: 0.9em !important;
    font-weight: bold;
  }
}
</style>
