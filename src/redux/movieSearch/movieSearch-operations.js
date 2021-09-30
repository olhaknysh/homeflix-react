import axios from 'axios';
import searchActions from './movieSearch-actions';

export const search = (word) => async (dispatch) => {
  dispatch(searchActions.movieSearchRequest());
  try {
    const { data } = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${word}`
    );
    const result = data.map((item) => item.show);
    dispatch(searchActions.movieSearchSuccess(result));
  } catch (error) {
    dispatch(searchActions.movieSearchError(error.message));
  }
};
