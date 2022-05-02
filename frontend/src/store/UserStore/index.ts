import { Module } from 'vuex';
import axios from '@/utils/axios'

const UserStore: Module<any, any> = {
  namespaced: true,
  state: {
    isLogin: false,
  },
  getters: {
    isLogin: state => state.isLogin,
  },
  mutations: {
    login(state, payload) {
      state.isLogin = true;
      console.log(payload)
    },
    logout(state){
      state.isLogin = false;
    },
  },
  actions: {
    async login(context, sendData) {
      try {
        const { data } = await axios.post('/auth', sendData);

        context.commit('login', {

        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

  },
}

export default UserStore;
