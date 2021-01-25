<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 my-3" v-for="movie in movies">
                <div class="card">
                    <img :src="movie.attributes.image" class="card-img-top" alt=""/>
                    <div class="card-body">
                        <p class="card-text">
                            {{ movie.attributes.name }}
                        </p>
                        <p class="mb-0">
                            {{ movie.attributes.created_at }}
                        </p>
                        <small class="card-link text-muted" style="color: black !important;" v-for="schedule in movie.relationships.schedules">
                            Horario {{ schedule.attributes.hour }}
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
    export default {
        async mounted() {
            await this.getSchedules()
            await this.getMovies()
        },
        methods:{
            ...mapActions({
                'getSchedules' : 'schedules/get',
                'getMovies' : 'movies/get'
            })
        },
        computed:{
            ...mapGetters({
                'movies' : 'movies/movies',
                'schedules' : 'schedules/schedules'
            })
        }
    }
</script>
