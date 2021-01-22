<template>
    <div>
        <loading :active.sync="loading" />
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm" v-if="is_logged">
            <div class="container">
                <router-link class="navbar-brand" to="/">
                    Cinemapp
                </router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/movies">
                                Peliculas
                            </router-link>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="">
                                Turnos
                            </a>
                        </li>
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->

                        <li class="nav-item dropdown">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{ user.name }}
                            </a>

                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown" @click="logout">
                                <a class="dropdown-item">
                                    Salir
                                </a>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
        <main class="py-4">
            <router-view></router-view>
        </main>
    </div>
</template>
<script>
    import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
    import Loading from 'vue-loading-overlay'
    import 'vue-loading-overlay/dist/vue-loading.css'
    export default {
        components:{
            Loading
        },
        mounted() {
            this.checkSession()
        },
        methods:{
            ...mapActions('auth',['logout']),
            ...mapMutations('auth',['checkSession'])
        },
        computed:{
            ...mapState(['loading']),
            ...mapState('auth',['is_logged','user']),
            ...mapGetters('auth',['user'])
        }
    }
</script>
