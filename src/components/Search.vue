<template>
  <form @submit.prevent="fetchMoviesFx(searchMovie)">
    <input
        type="text"
        class="search-input"
        placeholder="Input movie"
        v-model="searchMovie" />
  </form>
  <Loader v-if="isLoading"/>
  <div v-else>
    <Movie
        v-for="movie of moviesSearch.results"
        :key="movie.id"
        :movie="movie"
        :is-search="true" />
  </div>
</template>

<script setup>
import Loader from "../components/Loader.vue";
import Movie from "../components/Movie.vue";
import { ref } from "vue";
const searchMovie = ref("");


import {useStore} from "effector-vue/composition";
import { $moviesSearch, fetchMoviesFx } from "../store/serach.js";
const moviesSearch = useStore($moviesSearch)
const isLoading = useStore(fetchMoviesFx.pending);
</script>

<style scoped>
.search-input {
  border: 1px solid #e7e7e7;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  margin-bottom: 20px;
  border-radius: 10px;
}
</style>
