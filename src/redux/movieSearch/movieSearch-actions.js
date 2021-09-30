import { createAction } from '@reduxjs/toolkit';

const movieSearchRequest = createAction('movieSearch/movieSearchRequest');
const movieSearchSuccess = createAction('movieSearch/movieSearchSuccess');
const movieSearchError = createAction('movieSearch/movieSearchError');

export default {
  movieSearchRequest,
  movieSearchSuccess,
  movieSearchError,
};
