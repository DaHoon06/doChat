import { Module } from 'vuex';
import { ins as axios } from '@/utils/axios';

const UserStore: Module<any, any> = {
  namespaced: true,
  state: {
    isLogin: false,
    nickName: '',
    token: '',
  },
  getters: {
    isLogin: state => state.isLogin,
    token: state => state.token,
    nickName: store => store.nickName,
  },
  mutations: {
    login(state, payload) {
      const { nickName, token } = payload;
      state.isLogin = true;
      state.token = token;
      state.nickName = nickName;
    },
    logout(state){
      state.isLogin = false;
      state.token = '';
      state.nickName = '';
    },
  },
  actions: {
    async login(context, sendData) {
      try {
        const { data } = await axios.post('/user/auth', sendData);
        context.commit('login', data);
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async verify(context, payload) {
      try {
        const { token } = payload;
        const { data, status } = await axios.post(`/user/auth/${token}`);
        if (status === 201) return true
      } catch (e) {
        return false;
      }
    }

  },
}

export default UserStore;
