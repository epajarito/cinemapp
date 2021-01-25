import Vue from 'vue';
import axios from "axios";
import router from '../../router'

export async function login({commit},form){
    try {
        commit('authError', '')
        commit('setLoading',true,{root : true})
        let {data} = await Vue.axios({
            method : 'post',
            url : '/login',
            data: form
        });
        commit('setUser',data);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
        router.push('/')
    }catch (error){
        if(error.response){
            if(error.response.hasOwnProperty("data")){
                commit('authError', error.response.data.error)
            }
        }else{
            commit('authError', error.message)
        }
    }finally {
        commit('setLoading',false,{root : true})
    }
}

export async function logout({commit}){
    try{
        commit('setLoading',true, {root : true})
        await Vue.axios({
            method : 'post',
            url : '/logout'
        })
        commit('resetStore',false,{root : true})
    }catch(error){
        if(error.response){
            commit('validateErrorResponse',error,{root : true})
        }
    }finally{
        commit('setLoading',false,{root : true})
    }
}
