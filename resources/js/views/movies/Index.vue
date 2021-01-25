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
                            <th scope="col">Turnos</th>
                            <th scope="col">Fecha de publicación</th>
                            <th scope="col">Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="movie in movies">
                            <th scope="row">{{ movie.id }}</th>
                            <td>{{ movie.attributes.name }}</td>
                            <td>
                                <ul>
                                    <li v-for="schedule in movie.relationships.schedules">
                                        {{ schedule.attributes.hour }}
                                    </li>
                                </ul>
                            </td>
                            <td>{{ movie.attributes.created_at }}</td>
                            <td>{{ movie.attributes.status }}</td>
                            <td v-if="movie.attributes.status === 'Activo'">
                                <router-link class="btn btn-sm btn-info text-white" :to="`/movies/edit/${movie.id}`">
                                    <i class="fa fa-edit"></i>
                                </router-link>
                                <a class="btn btn-sm btn-secondary text-white" @click="addSchedule(movie)">
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

        <!--Modal for select schedules-->
        <div class="modal fade" id="addSchedules" tabindex="-1" aria-labelledby="addSchedules" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addSchedulesLabel">Seleccionar turnos</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-4" v-for="schedule in schedules">
                                <div class="form-check">
                                    <input class="form-check-input" :class="{'is-invalid' : errors.hasOwnProperty('schedules_ids')}" type="checkbox" v-model="movie_schedules.schedules_ids" :value="schedule.id" :disabled="schedule.attributes.status !== 'Activo'">
                                    <label class="form-check-label">
                                        {{ schedule.attributes.hour }}
                                    </label>
                                    <span class="invalid-feedback" role="alert" v-if="errors.hasOwnProperty('schedules_ids')">
                                        <strong>
                                            Debes seleccionar un turno
                                        </strong>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" @click="update">
                            Guardar Cambios
                        </button>
                    </div>
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
        data(){
            return {
                movie : {},
                movie_schedules : {
                    schedules_ids : [],
                    _method : 'put'
                }
            }
        },
        mounted() {
            console.log(this.movies)
        },
        methods:{
            ...mapActions({
                'get' : 'movies/get',
                '_destroy' : 'movies/destroy',
                'attachSchedules' : 'movies/update'
            }),
            async fetchItems(url){
                this.get(url)
            },
            async destroy({id}){
                let confirmar = confirm('¿Estas seguro de eliminar?')
                if(confirmar){
                    await this._destroy(id)
                    if(this.deleted){
                        this.movies.map((movie,index)=>{
                            if(movie.id === id){
                                movie.attributes.status = 'Cancelado';
                            }
                        })
                    }
                }
            },
            addSchedule(movie){
                Object.assign(this.$data, this.$options.data())
                this.movie = movie
                this.filtered();
                $('#addSchedules').modal('toggle')
            },
            async update(){
                let formData = new FormData();
                formData.append('schedules_ids',this.movie_schedules.schedules_ids)
                formData.append('_method','put')
                await this.attachSchedules({form : formData, id : this.movie.id})
                if(this.updated){
                    await this.get();
                    $('#addSchedules').modal('toggle')
                    Object.assign(this.$data, this.$options.data())
                }
            },
            filtered(){
                this.schedules.map((schedule,index)=>{
                    this.movie.relationships.schedules.map((s,index)=>{
                        if(schedule.id === s.id){
                            this.movie_schedules.schedules_ids.push(schedule.id)
                        }
                    })
                })
            }
        },
        computed:{
            ...mapGetters({
                'movies' : 'movies/movies',
                'schedules' : 'schedules/schedules',
                'pagination' : 'movies/pagination',
            }),
            ...mapState(['deleted']),
            ...mapState('movies',['errors']),
            ...mapState(['updated'])
        }
    }
</script>
