<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header border-0">
                        <h3 class="mb-0 float-left">Turnos</h3>
                        <div class="w-50 float-right text-right">
                            <router-link class="btn btn-sm btn-primary" to="/schedules/create">
                                Nuevo Turno
                            </router-link>
                        </div>
                    </div>
                </div>
                <table class="table">
                    <thead class="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Turno</th>
                        <th scope="col">Estado</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="schedule in schedules">
                        <th scope="row">{{ schedule.id }}</th>
                        <td>{{ schedule.attributes.hour }}</td>
                        <td>{{ schedule.attributes.status }}</td>
                        <td v-if="schedule.attributes.status === 'Activo'">
                            <router-link class="btn btn-sm btn-info text-white" :to="`/schedules/edit/${schedule.id}`">
                                <i class="fa fa-edit"></i>
                            </router-link>
                            <a class="btn btn-sm btn-danger text-white" @click="destroy(schedule)">
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
    data(){
        return {
            movie : {},
            movie_schedules : {
                schedules_ids : [],
                _method : 'put'
            }
        }
    },
    methods:{
        ...mapActions({
            'get' : 'schedules/get',
            '_destroy' : 'schedules/destroy'
        }),
        async fetchItems(url){
            this.get(url)
        },
        async destroy({id}){
            let confirmar = confirm('¿Estas seguro de eliminar?')
            if(confirmar){
                await this._destroy(id)
                if(this.deleted){
                    this.schedules.map((schedule,index)=>{
                        if(schedule.id === id){
                            schedule.attributes.status = 'Cancelado';
                        }
                    })
                }
            }
        }
    },
    computed:{
        ...mapGetters({
            'schedules' : 'schedules/schedules',
            'pagination' : 'schedules/pagination',
        }),
        ...mapState(['deleted'])
    }
}
</script>
