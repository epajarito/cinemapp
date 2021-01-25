import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
Vue.use(Router);

import Home from './views/Home.vue'
import Login from './views/auth/Login.vue'
import Movies from './views/movies/Index.vue'
import CreateMovie from './views/movies/Create.vue'
import UpdateMovie from './views/movies/Edit.vue'
import Schedules from './views/schedules/Index.vue'
import CreateSchedule from './views/schedules/Create.vue'
import UpdateSchedule from './views/schedules/Edit.vue'
import NotFound from './views/pages/404.vue'

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
        },
        {
            path : '/movies/create',
            name : 'movies.create',
            component: CreateMovie,
            meta: {requiresAuth : true}
        },
        {
            path : '/movies/edit/:movie',
            name : 'movies.edit',
            component: UpdateMovie,
            meta: {requiresAuth : true}
        },
        {
            path : '/schedules',
            name: 'schedules',
            component: Schedules,
            meta: {requiresAuth: true}
        },
        {
            path : '/schedules/create',
            name : 'schedules.create',
            component: CreateSchedule,
            meta : {requiresAuth: true}
        },
        {
            path : '/schedules/edit/:schedule',
            name: 'schedules.edit',
            component: UpdateSchedule,
            meta: {requiresAuth: true}
        },
        {
            path: '/404',
            component: NotFound,
            meta: {requiresAuth: true}
        },
        {
            path: '*',
            redirect: '/404',
            meta: {requiresAuth: true}
        },

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
