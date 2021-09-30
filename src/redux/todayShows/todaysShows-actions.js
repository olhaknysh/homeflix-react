import { createAction } from '@reduxjs/toolkit';

const fetchTodaysShowsRequest = createAction(
  'todayShows/fetchTodaysShowsRequest'
);

const fetchTodaysShowsSuccess = createAction(
  'todayShows/fetchTodaysShowsSuccess'
);

const fetchTodaysShowsFailure = createAction(
  'todayShows/fetchTodaysShowsFailure'
);

export default {
  fetchTodaysShowsRequest,
  fetchTodaysShowsSuccess,
  fetchTodaysShowsFailure,
};
