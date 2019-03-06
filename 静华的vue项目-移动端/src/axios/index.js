import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import { Toast } from 'mint-ui';


axios.defaults.baseURL = BASEURL
// axios.defaults.withCredentials = true
Vue.prototype.$http = axios

axios.interceptors.response.use(response => {
    if(response.data.code != 200){
        // alert(JSON.stringify(response.data) )
        Toast(response.data.message);
        if(response.data.code==460){
            store.commit('setUserInfo', null);
        }
    }
    return response
}, error => {
    Toast('请求出错：'+ error);
    return Promise.resolve(error.response);
});
axios.interceptors.request.use(config => {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    if (store.state.user) {
    config.headers.token = store.state.user.token;
    // console.log(config.headers)
    }
    return config;
    },
    err => {
    return Promise.reject(err);
    });
export default axios