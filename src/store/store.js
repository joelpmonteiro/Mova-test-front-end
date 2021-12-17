import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    filtringCountries: [],
    allCountries: [],
    language: [],
  },
  actions: {},
  mutations: {
    mutAllCountries(state, { payload }) {
      state.allCountries = payload;
    },
    mutFiltringCountries(state, { payload }) {
      state.filtringCountries = payload;
    },
    mutFiltringLanguage(state, { payload }) {
      state.language = payload;
    },
  },
  getters: {
    // gettersFiltringCountriesById: (state) => (id) =>
    //   state.filtringCountries.find((item) => item.name === id.name),
    gettersAllCountries: (state) => state.allCountries,
    gettersFiltringCountriesById: (state) => (name) =>
      state.filtringCountries.find((item) => item.name === name),
    gettersAllCountriesBordersByAlphaCode: (state) => (abbr) =>
      state.allCountries.filter((item) => item.alpha3Code === abbr),

    // gettersFiltringLanguagesByNativeName: (state)=> (native)=> state.language.find(item=> item)
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});

export default store;
