export function movies(state,{data,links,meta}){
    state.movies = data;
    state.pagination = {...links,...meta}
}

export function movie(state, {data}) {
    state.movie = data;
}

export function errors(state,{data}) {
    state.errors = data.errors;
}
