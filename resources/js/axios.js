import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'

const {access_token} = store.state.auth;
if(access_token){
    axios.defaults.headers.common['Authorization'] = access_token;
    axios.defaults.params = {}
    //axios.defaults.params['token'] = access_token.split(' ').pop()
}
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL = process.env.MIX_APP_API_URL;
Vue.use(VueAxios,axios)
