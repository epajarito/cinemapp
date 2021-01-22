import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
Vue.use(Router);

import Home from './views/Home.vue'
import Login from './views/auth/Login.vue'
import Movies from './views/movies/Index.vue'
let router = new Router({
    mode : 'history',
    routes : [
        {
            path : '/login',
            name : 'login',
            component: Login
        },
        {
            path : '/',
            name : 'home',
            component : Home,
            meta : {requiresAuth : true}
        },
        {
            path : '/movies',
            name : 'movies',
            component: Movies,
            meta: {requiresAuth : true}
        }
    ],
    scrollBehavior(to,from,savedPosition){
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})

router.beforeEach((to,from,next)=>{
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isLogged = store.state.auth.is_logged;
    if(!requiresAuth && isLogged && (to.path === '/login' || to.path === '/register')){
        next('/')
    }
    if(requiresAuth && !isLogged){
        next('/login');
    }else{
        next()
    }
})

export default router;
