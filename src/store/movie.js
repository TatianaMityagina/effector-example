import {createStore, createEvent, sample } from 'effector'
import connectLocalStorage from "effector-localstorage";

const moviesLocalStorage = connectLocalStorage("movies")
    .onError((err) => console.log(err))
const $activeTab = createStore(2);

const setActiveTabEvent = createEvent();
const setActiveTab = (_, id) => {
    return id;
};
$activeTab.on(setActiveTabEvent, setActiveTab)

const $movies = createStore(moviesLocalStorage.init([]));
const addToUserMoviesEvent = createEvent();

const addToUserMovies = (oldMovies, newMovie) => {
    return [...oldMovies, {...newMovie, isWatched: false}];
}

$movies.on(addToUserMoviesEvent, addToUserMovies);

sample({
    clock: addToUserMoviesEvent,
    fn: () => 1,
    target: $activeTab
})

const deleteUserMoviesEvent = createEvent()

const deleteUserMovies = (state, id) => {
    return state.filter((todo) => todo.id !== id)
}

$movies.on(deleteUserMoviesEvent, deleteUserMovies)

const toggleWatchedEvent = createEvent();
const toggleWatched = (state, id) => {
    return state.map(item => item.id === id
        ? ({...item, isWatched: !item.isWatched})
        : item)
};

$movies.on(toggleWatchedEvent, toggleWatched);

$movies.watch(moviesLocalStorage)

export { $movies, $activeTab, setActiveTabEvent, addToUserMoviesEvent, deleteUserMoviesEvent, toggleWatchedEvent }

