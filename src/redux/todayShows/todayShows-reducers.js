import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { todaysShowsActions } from './index';

const todaysShows = createReducer([], {
  [todaysShowsActions.fetchTodaysShowsSuccess]: (_, { payload }) => payload,
});

const loading = createReducer(false, {
  [todaysShowsActions.fetchTodaysShowsRequest]: () => true,
  [todaysShowsActions.fetchTodaysShowsSuccess]: () => false,
  [todaysShowsActions.fetchTodaysShowsFailure]: () => false,
});

const error = createReducer('', {
  [todaysShowsActions.fetchTodaysShowsFailure]: (_, { payload }) => payload,
  [todaysShowsActions.fetchTodaysShowsSuccess]: () => '',
});

export default combineReducers({
  todaysShows,
  loading,
  error,
});
