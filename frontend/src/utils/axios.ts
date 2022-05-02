import axios from 'axios';
import store from '@/store';

const instance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 12000
})

instance.interceptors.request.use(config => {
  if (store) {
    const token = store.getters['login/token'];
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config
})

instance.interceptors.response.use(response => {


  return response
}, error => {
  const { response } = error;
  return response;
})

export default instance;
