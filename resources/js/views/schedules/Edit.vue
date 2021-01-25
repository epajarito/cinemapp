<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        Editar turno
                    </div>

                    <div class="card-body">
                        <form-component
                            :schedule="form"
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
        await this.show(this.$route.params.schedule);
        this.form = {
            ...this.schedule,
            ...this.schedule.attributes,
            _method : 'put'
        }
    },
    methods:{
        ...mapActions('schedules',['update','get','show']),
        async onUpdate(){
            await this.update({form: this.form, id: this.form.id})
            if(this.updated){
                await this.get();
                this.$router.push('/schedules')
            }
        }
    },
    computed:{
        ...mapGetters({
            'schedule' : 'schedules/schedule',
        }),
        ...mapState(['updated'])
    }
}
</script>
