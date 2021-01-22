export function setUser(state,{me,access_token,expires_in}) {
    state.user = me;
    state.is_logged = !! me;
    state.error = false;
    state.error_message = '';
    state.access_token = `Bearer ${access_token}`;
    state.expires_in = expires_in;
}

export function logout(state) {
    window.localStorage.clear();
    state.user = null;
    state.is_logged = false;
    state.access_token = '';
}

export function authError(state,error) {
    state.error = true;
    state.error_message = error;
    state.user = null;
    state.is_logged = false;
}

export function reset(state){
    state.error = false;
    state.error_message = '';
}

export function checkSession(state){
    console.log("checking session...")
    if(state.user) {
        let now = (new Date).getTime();
        let expires_at = state.hasOwnProperty("expires_in") ? state.expires_in * 1000 : 0
        if (expires_at <= now) {
            this.commit('resetStore',false,{root : true});
        }
    }else{
        this.commit('setLoading',false,{root : true});
    }
}
