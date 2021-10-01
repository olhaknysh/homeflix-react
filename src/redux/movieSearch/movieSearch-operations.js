import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import searchActions from './movieSearch-actions';

export const search = (word) => async (dispatch) => {
  dispatch(searchActions.movieSearchRequest());
  try {
    const { data } = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${word}`
    );

    if (data.length === 0) {
      toast.configure();
      toast.info('Nothing was found on your request ');
    }
    const result = data.map((item) => item.show);
    dispatch(searchActions.movieSearchSuccess(result));
  } catch (error) {
    toast.configure();
    toast.error(error.message);
    dispatch(searchActions.movieSearchError(error.message));
  }
};
