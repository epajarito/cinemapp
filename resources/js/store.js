import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist"
import {createStore} from 'vuex-extensions'
import router from './router'
Vue.use(Vuex)

import auth from './modules/auth'
import schedules from './modules/schedules'
import movies from './modules/movies'

const vuexLocal = new VuexPersistence({
    key : process.env.MIX_VUE_APP,
    storage : window.localStorage
})

export default createStore(Vuex.Store,{
    state:{
        loading : false,
        updated : false,
        created : false,
        deleted : false
    },
    mutations : {
        setLoading(state,bool){
            state.loading = bool;
        },
        setUpdated(state,bool){
            state.updated = bool
        },
        setCreated(state,bool){
            state.created = bool
        },
        setDeleted(state,bool){
            state.deleted = bool
        },
        resetStore(){
            this.reset();
            setTimeout(()=>{
                router.push("/login");
                console.log('store reseted...')
            },750)
        }
    },
    actions : {

    },
    modules : {
        auth,
        schedules,
        movies
    },
    plugins: [vuexLocal.plugin]
})
