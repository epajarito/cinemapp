export function schedules(state,{data,links,meta}){
    state.schedules = data;
    state.pagination = {...links,...meta}
}

export function schedule(state, {data}) {
    state.schedule = data;
}

export function errors(state,{data}) {
    state.errors = data.errors;
}
