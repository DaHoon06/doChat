import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import UserStore from "@/store/UserStore";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: [
        'UserStore'
      ],
    })
  ],
  modules: {
    userStore: UserStore
  }
});
export default store;
