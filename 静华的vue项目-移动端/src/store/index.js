import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: localStorage["user"]?JSON.parse(localStorage["user"]): null,
        token:localStorage["tk"],
        listUser:localStorage["user"]?JSON.parse(localStorage["user"]): null
    },
    getters:{
        getUserInfo:state=>{
            return state.user;
        }
    },
    mutations: {
        clear(state){
            state.token = null;
            state.user = null;
            localStorage.clear();
        },
        setToken(state,token){
            state.token = token;
            localStorage.setItem('tk',token);
        },
        setUserInfo(state,data){
            state.user = data;
            localStorage.setItem("user",JSON.stringify(state.user));
        },
        setListUser(state,data){
            state.user = data;
            if(state.user && state.user.token){
                state.token = state.user.token;
                localStorage.setItem('tk',state.token);
            }
            localStorage.setItem("user",JSON.stringify(state.user));
        }
    }
  })