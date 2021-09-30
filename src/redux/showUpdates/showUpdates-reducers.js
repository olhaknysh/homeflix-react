import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import updateActions from './showUpdates-actions';

const updatedShows = createReducer([], {
  [updateActions.todayUpdatedSuccess]: (_, { payload }) => payload.final,
  [updateActions.weekUpdatedSuccess]: (_, { payload }) => payload.final,
  [updateActions.monthUpdatedSuccess]: (_, { payload }) => payload.final,
});

const pagesCount = createReducer([], {
  [updateActions.todayUpdatedSuccess]: (_, { payload }) => payload.totalPages,
  [updateActions.weekUpdatedSuccess]: (_, { payload }) => payload.totalPages,
  [updateActions.monthUpdatedSuccess]: (_, { payload }) => payload.totalPages,
});

const setError = (_, { payload }) => payload;
const error = createReducer(null, {
  [updateActions.todayUpdatedError]: setError,
  [updateActions.weekUpdatedError]: setError,
  [updateActions.monthUpdatedError]: setError,
  [updateActions.todayUpdatedSuccess]: () => null,
  [updateActions.weekUpdatedSuccess]: () => null,
  [updateActions.monthUpdatedSuccess]: () => null,
});

const isLoading = createReducer(false, {
  [updateActions.todayUpdatedRequest]: () => true,
  [updateActions.weekUpdatedRequest]: () => true,
  [updateActions.monthUpdatedRequest]: () => true,
  [updateActions.todayUpdatedSuccess]: () => false,
  [updateActions.todayUpdatedError]: () => false,
  [updateActions.weekUpdatedSuccess]: () => false,
  [updateActions.weekUpdatedError]: () => false,
  [updateActions.monthUpdatedSuccess]: () => false,
  [updateActions.monthUpdatedError]: () => false,
});

export default combineReducers({
  updatedShows,
  pagesCount,
  error,
  isLoading,
});
