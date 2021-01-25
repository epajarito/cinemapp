<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        Editar pelicula
                    </div>

                    <div class="card-body">
                        <form-component
                            :movie="form"
                            :on-submit="onUpdate"
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
                form : {}
            }
        },
        async mounted() {
            await this.show(this.$route.params.movie);
            this.form = {
                ...this.movie,
                ...this.movie.attributes,
                _method : 'put'
            }
        },
        methods:{
            ...mapActions({
                'show' : 'movies/show',
                'update' : 'movies/update',
                'get' : 'movies/get'
            }),
            async onUpdate(){
                let formData = new FormData();
                for(let i in this.form){
                    formData.append(i,this.form[i])
                }
                await this.update({form: formData, id: this.form.id})
                if(this.updated){
                    await this.get();
                    this.$router.push('/movies')
                }
            }
        },
        computed:{
            ...mapGetters('movies',['movie']),
            ...mapState(['updated'])
        }
    }
</script>
