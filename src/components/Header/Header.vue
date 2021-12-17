<template>
  <v-app-bar app color="#FFFFFF" dark>
    <v-img
      :lazy-src="require('../../assets/logo_principal.png')"
      max-height="61.66"
      max-width="92"
      :src="require('../../assets/logo_principal.png')"
      class="responsiveImg"
    ></v-img>

    <v-spacer></v-spacer>

    <v-btn
      color="isTransparent "
      @click.prevent="voltarPagina"
      class="colorTxt responsiveBtn"
      raised
    >
      <v-img
        :lazy-src="require('../../assets/keyboard_return.png')"
        max-height="12"
        max-width="19"
        :src="require('../../assets/keyboard_return.png')"
        class="responsiveImg"
      ></v-img>
      Voltar
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  methods: {
    voltarPagina() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.isTransparent {
  background-color: #fff !important;
  border: 1px solid #6d2080 !important;
  box-sizing: border-box !important;
  span {
    color: #6d2080 !important;
  }
}

button.colorTxt {
  color: #6d2080 !important;
}
@media (max-width: 600px) {
  .responsiveBtn {
    border: none !important;
    box-shadow: none !important;
    background-color: unset !important;
    margin-left: 20rem;
  }
  button.colorTxt {
    color: #fff !important;
  }
}
</style>
