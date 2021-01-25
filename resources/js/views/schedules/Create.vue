<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        Crear turno
                    </div>

                    <div class="card-body">
                        <form-component
                            :schedule="schedule"
                            :on-submit="onSubmit"
                        >
                        </form-component>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import formComponent from './_form'
import {mapActions,mapGetters,mapState} from 'vuex'
export default {
    components : {
        formComponent
    },
    data(){
        return{
            schedule : {}
        }
    },
    methods:{
        ...mapActions('schedules',['store','get']),
        async onSubmit(){
            await this.store(this.schedule)
            if(this.created){
                await this.get();
                this.$router.push('/schedules')
            }
        }
    },
    computed:{
        ...mapGetters({
            'user' : 'auth/user',
            '_movie' : 'movies/movie',
            'movies' : 'movies/movies',
        }),
        ...mapState(['created'])
    }
}
</script>
