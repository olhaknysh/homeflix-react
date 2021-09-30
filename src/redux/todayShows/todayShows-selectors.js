const todayShows = (state) => state.todayShows.todaysShows;
const todayShowsLoading = (state) => state.todayShows.loading;
const todayShowsError = (state) => state.todayShows.error;

export default {
  todayShows,
  todayShowsLoading,
  todayShowsError,
};
