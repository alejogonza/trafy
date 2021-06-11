import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from "vuex-persistedstate";
import userData from "./userData";

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  plugins: [createPersistedState()],
  modules: {
    userData
  }
});