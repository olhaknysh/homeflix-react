import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import searchActions from './movieSearch-actions';

const moviesSearch = createReducer([], {
  [searchActions.movieSearchSuccess]: (_, { payload }) => payload,
});

const setError = (_, { payload }) => payload;
const error = createReducer(null, {
  [searchActions.movieSearchError]: setError,
  [searchActions.movieSearchSuccess]: () => null,
});

const isLoading = createReducer(false, {
  [searchActions.movieSearchRequest]: () => true,
  [searchActions.movieSearchSuccess]: () => false,
  [searchActions.movieSearchError]: () => false,
});

export default combineReducers({ moviesSearch, error, isLoading });
