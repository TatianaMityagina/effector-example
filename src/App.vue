<template>
  <main>
    <header class="header">
      <img src="/logo.svg" alt="logo" class="header-logo" />
      <h2>My Favorite Movies</h2>
    </header>
    <div class="tabs">
      <button
          :class="['btn', { btn_green: activeTab === 1 }]"
          @click="setActiveTabEvent(1)"
      >
        Favorite
      </button>
      <button
          :class="['btn', { btn_green: activeTab === 2 }]"
          @click="setActiveTabEvent(2)"
      >
        Search
      </button>
    </div>
    <div class="movies" v-if="activeTab === 1">
      <div v-if="watchedMovies.length">
        <h3>Watched Movies (count: {{ watchedMovies.length }})</h3>
        <Movie
            v-for="movie of watchedMovies"
            :key="movie.id"
            :movie="movie" />
      </div>
      <h3>All Movies (count: {{ movies.length }} )</h3>
      <Movie
          v-for="movie of movies"
          :key="movie.id"
          :movie="movie" />
    </div>
    <div class="search" v-else>
      <Search />
    </div>
  </main>
</template>

<script setup>
import { computed } from "vue";
import Movie from "./components/Movie.vue";
import Search from "./components/Search.vue";

import { useStore } from 'effector-vue/composition'
import { $movies, $activeTab, setActiveTabEvent } from "./store/movie.js";

const movies = useStore($movies)
const activeTab = useStore($activeTab)

const watchedMovies = computed(() =>
    movies?.value.filter((el) => el.isWatched)
);
</script>

<style lang="css">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.header-logo {
  max-width: 50px;
  margin-right: 10px;
}
.btn {
  border: none;
  width: 100px;
  height: 40px;
  font-size: 14px;
  margin: 0 10px;
  border-radius: 10px;
  cursor: pointer;
  background: #efefef;
}
.btn:hover {
  opacity: 0.7;
}
.btn_green {
  background: #37df5c;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
</style>
