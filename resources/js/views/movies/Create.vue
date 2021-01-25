<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        Crear pelicula
                    </div>

                    <div class="card-body">
                        <form-component
                            :movie="movie"
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
                movie : {}
            }
        },
        methods:{
            ...mapActions('movies',['store','get']),
            async onSubmit(){
                let formData = new FormData();
                for(let i in this.movie){
                    formData.append(i,this.movie[i])
                }
                formData.append('user_id',this.user.id)
                await this.store(formData)
                if(this.created){
                    await this.get();
                    this.$router.push('/movies')
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
