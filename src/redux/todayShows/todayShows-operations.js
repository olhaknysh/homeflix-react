import axios from 'axios';
import { todaysShowsActions } from './index';

const fetchTodaysShows = (country, date) => async (dispatch) => {
  dispatch(todaysShowsActions.fetchTodaysShowsRequest());

  try {
    const { data } = await axios.get(
      `https://api.tvmaze.com/schedule?country=${country}&date=${date}`
    );

    dispatch(todaysShowsActions.fetchTodaysShowsSuccess(data));
  } catch (error) {
    dispatch(todaysShowsActions.fetchTodaysShowsFailure(error.message));
  }
};

export default {
  fetchTodaysShows,
};
