import axios from 'axios';
import { todaysShowsActions } from './index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fetchTodaysShows = (country, date) => async (dispatch) => {
  dispatch(todaysShowsActions.fetchTodaysShowsRequest());

  try {
    const { data } = await axios.get(
      `https://api.tvmaze.com/schedule?country=${country}&date=${date}`
    );

    dispatch(todaysShowsActions.fetchTodaysShowsSuccess(data));
  } catch (error) {
    toast.configure();
    toast.error(error.message);
    dispatch(todaysShowsActions.fetchTodaysShowsFailure(error.message));
  }
};

export default {
  fetchTodaysShows,
};
