<template>
    <form @submit.prevent="onSubmit(schedule)">

        <div class="form-group row">
            <label for="hour" class="col-md-4 col-form-label text-md-right">
                Turno
            </label>
            <div class="col-md-6">
                <input id="hour" type="time" class="form-control" :class="{'is-invalid' : errors.hasOwnProperty('hour')}" v-model="schedule.hour" required>
                <span class="invalid-feedback" role="alert" v-if="errors.hasOwnProperty('hour')">
                    <strong>
                        {{ errors.hour[0] }}
                    </strong>
                </span>
            </div>
        </div>

        <div class="form-group row">
            <label for="status" class="col-md-4 col-form-label text-md-right">
                Activo
            </label>
            <div class="col-md-6">
                <input id="status" type="checkbox" v-model="schedule.status" :class="{'is-invalid' : errors.hasOwnProperty('status')}">
                <span class="invalid-feedback" role="alert" v-if="errors.hasOwnProperty('status')">
                    <strong>
                        {{ errors.status[0] }}
                    </strong>
                </span>
            </div>
        </div>

        <div class="form-group row mb-0">
            <div class="col-md-8 offset-md-4">
                <button type="submit" class="btn btn-primary">
                    Guardar
                </button>
            </div>
        </div>
    </form>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
export default {
    props : ['schedule','onSubmit'],
    mounted() {
        this.schedule.user_id = this.user.id;
    },
    computed:{
        ...mapState('schedules',['errors']),
        ...mapGetters({
            'user': 'auth/user'
        })
    }
}
</script>
