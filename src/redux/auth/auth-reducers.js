import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import authActions from './auth-actions';

const email = createReducer('', {
  [authActions.getCurrentUserSuccess]: (_, { payload }) => payload.mail,
  [authActions.registerSuccess]: (_, { payload }) => payload.mail,
  [authActions.loginSuccess]: (_, { payload }) => payload.mail,
  [authActions.logoutSuccess]: () => '',
});

const uid = createReducer('', {
  [authActions.getCurrentUserSuccess]: (_, { payload }) => payload.uid,
  [authActions.registerSuccess]: (_, { payload }) => payload.uid,
  [authActions.loginSuccess]: (_, { payload }) => payload.uid,
  [authActions.logoutSuccess]: () => '',
});

const displayName = createReducer('', {
  [authActions.getCurrentUserSuccess]: (_, { payload }) => payload.displayName,
  [authActions.registerSuccess]: (_, { payload }) => payload.displayName,
  [authActions.loginSuccess]: (_, { payload }) => payload.displayName,
  [authActions.logoutSuccess]: () => '',
});

const photoURL = createReducer('', {
  [authActions.getCurrentUserSuccess]: (_, { payload }) => payload.photoURL,
  [authActions.registerSuccess]: (_, { payload }) => payload.photoURL,
  [authActions.loginSuccess]: (_, { payload }) => payload.photoURL,
  [authActions.logoutSuccess]: () => '',
});

const setError = (_, { payload }) => payload;

const error = createReducer(null, {
  [authActions.registerError]: setError,
  [authActions.loginError]: setError,
  [authActions.logoutError]: setError,
  [authActions.getCurrentUserError]: setError,
  [authActions.favoriteShowsError]: setError,
  [authActions.favoriteShowsIdError]: setError,
  [authActions.favoriteShowsIdDeleteError]: setError,
  [authActions.addFriendError]: setError,
  [authActions.deleteFriendError]: setError,
  [authActions.registerSuccess]: () => null,
  [authActions.loginSuccess]: () => null,
  [authActions.logoutSuccess]: () => null,
  [authActions.favoriteShowsSuccess]: () => null,
  [authActions.favoriteShowsIdDeleteSuccess]: () => null,
  [authActions.favoriteShowsIdSuccess]: () => null,
  [authActions.addFriendSuccess]: () => null,
  [authActions.deleteFriendSuccess]: () => null,
});

const isAuthenticated = createReducer(false, {
  [authActions.registerSuccess]: () => true,
  [authActions.loginSuccess]: () => true,
  [authActions.getCurrentUserSuccess]: () => true,
  [authActions.registerError]: () => false,
  [authActions.loginError]: () => false,
  [authActions.getCurrentUserError]: () => false,
  [authActions.logoutSuccess]: () => false,
});

const isLoading = createReducer(false, {
  [authActions.getCurrentUserRequest]: () => true,
  [authActions.loginRequest]: () => true,
  [authActions.logoutRequest]: () => true,
  [authActions.registerRequest]: () => true,
  [authActions.favoriteShowsRequest]: () => true,
  [authActions.getCurrentUserSuccess]: () => false,
  [authActions.getCurrentUserError]: () => false,
  [authActions.loginSuccess]: () => false,
  [authActions.loginError]: () => false,
  [authActions.logoutSuccess]: () => false,
  [authActions.logoutError]: () => false,
  [authActions.registerSuccess]: () => false,
  [authActions.registerError]: () => false,
  [authActions.favoriteShowsSuccess]: () => false,
  [authActions.favoriteShowsError]: () => false,
});

const favoriteShows = createReducer([], {
  [authActions.favoriteShowsSuccess]: (_, { payload }) => payload,
  [authActions.favoriteShowsError]: () => [],
});

const favoriteShowsId = createReducer([], {
  [authActions.favoriteShowsIdSuccess]: (state, { payload }) => [
    ...state,
    payload,
  ],
  [authActions.favoriteShowsIdDeleteSuccess]: (state, { payload }) =>
    state.filter((item) => item !== payload),
  [authActions.getCurrentUserSuccess]: (_, { payload }) => payload.favorites,
  [authActions.loginSuccess]: (_, { payload }) => payload.favorites,
  [authActions.registerSuccess]: (_, { payload }) => payload.favorites,
});

const friends = createReducer([], {
  [authActions.getCurrentUserSuccess]: (_, { payload }) => payload.friends,
  [authActions.addFriendSuccess]: (state, { payload }) => [...state, payload],
  [authActions.loginSuccess]: (_, { payload }) => payload.friends,
  [authActions.registerSuccess]: (_, { payload }) => payload.favorites,
  [authActions.deleteFriendSuccess]: (state, { payload }) =>
    state.filter((item) => item.uid !== payload),
});

export default combineReducers({
  email,
  error,
  isAuthenticated,
  isLoading,
  uid,
  displayName,
  photoURL,
  favoriteShows,
  favoriteShowsId,
  friends,
});
