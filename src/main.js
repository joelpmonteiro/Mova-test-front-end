import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import routes from "./router/router";
import store from "./store/store";

let router = new VueRouter({
  routes, // short for routes: routes
});

Vue.config.productionTip = false;
Vue.use(VueRouter);

new Vue({
  vuetify,
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
