import Vue from 'vue'
import router from "../../router";
export async function get({commit},url = '/schedules') {
    try{
        commit('setLoading',true,{root : true})
        let {data} = await Vue.axios({
            method : 'GET',
            url
        });
        commit('schedules',data)
    }catch (error) {
        if(error.response){
            commit('validateErrorResponse',error,{root : true})
        }
    }finally {
        commit('setLoading',false,{root : true})
    }
}


export async function show({commit},id) {
    try{
        commit('setLoading',true,{root : true})
        let {data} = await Vue.axios({
            method : 'get',
            url : `/schedules/${id}`
        })
        commit('schedule',data)
    }catch (error) {
        if(error.response){
            commit('validateErrorResponse',error,{root : true})
        }
    }finally {
        commit('setLoading',false,{root : true})
    }
}

export async function store({commit},form) {
    try{
        commit('setLoading',true,{root : true})
        commit('errors', {data : {errors : {}}})
        await Vue.axios({
            method : 'post',
            data : form,
            url : '/schedules',
        });
        commit('setCreated',true,{root:true})
    }catch (error) {
        if(error.response){
            commit('validateErrorResponse',error,{root : true})
            if(error.response.status == 422) {
                if (error.response.hasOwnProperty("data")) {
                    commit('errors', {data: error.response.data})
                }
            }
        }
    }finally {
        commit('setLoading',false,{root : true})
    }
}

export async function update({commit}, {form,id}) {
    try{
        commit('setLoading',true,{root : true})
        commit('errors', {data : {errors : {}}})
        await Vue.axios({
            method : 'post',
            url : `/schedules/${id}`,
            data : form
        })
        commit('setUpdated',true,{root : true})
    }catch(error){
        if(error.response){
            commit('validateErrorResponse', error, {root: true})
            if(error.response.status == 422){
                if(error.response.hasOwnProperty("data")){
                    commit('errors', {data : error.response.data})
                }
            }
        }
    }finally {
        commit('setLoading',false,{root : true})
    }
}

export async function destroy({commit},id) {
    try {
        commit('setLoading',true,{root : true})
        await Vue.axios({
            method : 'delete',
            url : `/schedules/${id}`
        })
        commit('setDeleted',true,{root:true})
    }catch(error){
        if(error.response){
            commit('validateErrorResponse',error,{root : true})
        }
    }finally {
        commit('setLoading',false,{root : true})
    }
}
