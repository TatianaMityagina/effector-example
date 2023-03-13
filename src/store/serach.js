import { createStore, createEffect, sample } from 'effector';

const url =
    "https:api.themoviedb.org/3/search/movie?api_key=02708c4929ad93aa5e68f8ee7bfa4445&query=";

const $moviesSearch = createStore([]);
const fetchMoviesFx = createEffect(async (search) => {
    const res = await fetch(`${url}${search}`)
    return res.json()
})

sample({
    clock: fetchMoviesFx.doneData,
    target: $moviesSearch
})



export { $moviesSearch, fetchMoviesFx }

