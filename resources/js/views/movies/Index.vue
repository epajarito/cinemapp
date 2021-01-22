<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header border-0">
                        <h3 class="mb-0 float-left">Peliculas</h3>
                        <div class="w-50 float-right text-right">
                            <router-link class="btn btn-sm btn-primary" to="/movies/create">
                                Nueva Pelicula
                            </router-link>
                        </div>
                    </div>
                </div>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Fecha de publicación</th>
                            <th scope="col">Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="movie in movies">
                            <th scope="row">{{ movie.id }}</th>
                            <td>{{ movie.attributes.name }}</td>
                            <td>{{ movie.attributes.created_at }}</td>
                            <td>{{ movie.attributes.status }}</td>
                            <td v-if="movie.attributes.status === 'Activo'">
                                <a class="btn btn-sm btn-info text-white" href="">
                                    <i class="fa fa-edit"></i>
                                </a>
                                <a class="btn btn-sm btn-secondary text-white" href="">
                                    <i class="fa fa-bars"></i>
                                </a>
                                <a class="btn btn-sm btn-danger text-white" @click="destroy(movie)">
                                    <i class="fa fa-trash"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="card-footer py-4">
                    <pagination-component v-if="pagination" :pagination="pagination" :fetchItems="fetchItems"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters,mapActions,mapState} from 'vuex'
    import PaginationComponent from '../../components/Pagination.vue'
    export default {
        components:{
            PaginationComponent
        },
        mounted() {
            console.log(this.movies)
        },
        methods:{
            ...mapActions({
                'get' : 'movies/get',
                '_destroy' : 'movies/destroy'
            }),
            async fetchItems(url){
                console.log("url...", url)
                this.get(url)
            },
            async destroy({id}){
                let confirmar = confirm('¿Estas seguro de eliminar?')
                console.log(confirmar,id)
                if(confirmar){
                    this._destroy(id)
                    if(this.deleted){
                        this.get()
                    }
                }
            }
        },
        computed:{
            ...mapGetters({
                'movies' : 'movies/movies',
                'schedules' : 'schedules/schedules',
                'pagination' : 'movies/pagination',
            }),
            ...mapState(['deleted'])
        }
    }
</script>
