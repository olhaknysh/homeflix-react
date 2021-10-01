const movies = (state) => state.movieSearch.moviesSearch;
const error = (state) => state.movieSearch.error;
const loading = (state) => state.movieSearch.isLoading;

export default {
  movies,
  error,
  loading,
};
