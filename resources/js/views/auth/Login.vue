<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        Iniciar sesión
                    </div>

                    <div class="card-body">
                        <form @submit.prevent="onSubmit" >

                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">
                                    Correo electrónico
                                </label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" v-model="form.email" required autofocus>
                                    <span class="invalid-feedback" role="alert">
                                        <strong>error</strong>
                                    </span>

                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">
                                    Contraseña
                                </label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" v-model="form.password" required>
                                    <span class="invalid-feedback" role="alert">
                                        <strong>error</strong>
                                    </span>

                                </div>
                            </div>
                            <div class="form-group row" v-if="error_message">
                                <div class="col-12 text-center">
                                    <p class="text-danger">
                                        {{error_message}}
                                    </p>
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Iniciar sesión
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions,mapState} from 'vuex'
    export default {
        data(){
            return{
                form : {
                    email : '',
                    password : ''
                }
            }
        },
        methods:{
            ...mapActions('auth',['login','logout']),
            ...mapActions('schedule',['get']),
            async onSubmit(){
                await this.login(this.form)

            }
        },
        computed:{
            ...mapState('auth',['error_message'])
        }
    }
</script>
