const updatedShows = (state) => state.updatedShows.updatedShows;
const pagesCount = (state) => state.updatedShows.pagesCount;
const updatedLoading = (state) => state.updatedShows.isLoading;
const updatedError = (state) => state.updatedShows.error;

export default {
  updatedShows,
  pagesCount,
  updatedLoading,
  updatedError,
};
