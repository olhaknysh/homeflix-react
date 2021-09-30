import { createAction } from '@reduxjs/toolkit';

const registerRequest = createAction('auth/registerRequest');
const registerSuccess = createAction('auth/registerSuccess');
const registerError = createAction('auth/registerError');

const loginRequest = createAction('auth/loginRequest');
const loginSuccess = createAction('auth/loginSuccess');
const loginError = createAction('auth/loginError');

const logoutRequest = createAction('auth/logoutRequest');
const logoutSuccess = createAction('auth/logoutSuccess');
const logoutError = createAction('auth/logoutError');

const getCurrentUserRequest = createAction('auth/getCurrentUserRequest');
const getCurrentUserSuccess = createAction('auth/getCurrentUserSuccess');
const getCurrentUserError = createAction('auth/getCurrentUserError');

const favoriteShowsRequest = createAction('auth/favoriteShowsRequest');
const favoriteShowsSuccess = createAction('auth/favoriteShowsSuccess');
const favoriteShowsError = createAction('auth/favoriteShowsError');

const favoriteShowsIdRequest = createAction('auth/favoriteShowsIdRequest');
const favoriteShowsIdSuccess = createAction('auth/favoriteShowsIdSuccess');
const favoriteShowsIdError = createAction('auth/favoriteShowsIdError');

const favoriteShowsIdDeleteRequest = createAction(
  'auth/favoriteShowsIdDeleteRequest'
);
const favoriteShowsIdDeleteSuccess = createAction(
  'auth/favoriteShowsIdDeleteSuccess'
);
const favoriteShowsIdDeleteError = createAction(
  'auth/favoriteShowsIdDeleteError'
);

const addFriendRequest = createAction('auth/addFriendRequest');
const addFriendSuccess = createAction('auth/addFriendSuccess');
const addFriendError = createAction('auth/addFriendError');

const deleteFriendRequest = createAction('auth/deleteFriendRequest');
const deleteFriendSuccess = createAction('auth/deleteFriendSuccess');
const deleteFriendError = createAction('auth/deleteFriendError');

const deleteFromPreferencesRequest = createAction(
  'auth/deleteFromPreferencesRequest'
);
const deleteFromPreferencesSuccess = createAction(
  'auth/deleteFromPreferencesSuccess'
);
const deleteFromPreferencesError = createAction(
  'auth/deleteFromPreferencesError'
);

const addShowToWatchListRequest = createAction(
  'auth/addShowToWatchListRequest'
);
const addShowToWatchListSuccess = createAction(
  'auth/addShowToWatchListSuccess'
);
const addShowToWatchListError = createAction('auth/addShowToWatchListError');

const deleteShowToWatchListRequest = createAction(
  'auth/deleteShowToWatchListRequest'
);
const deleteShowToWatchListSuccess = createAction(
  'auth/deleteShowToWatchListSuccess'
);
const deleteShowToWatchListError = createAction(
  'auth/deleteShowToWatchListError'
);

export default {
  registerRequest,
  registerSuccess,
  registerError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  loginRequest,
  loginSuccess,
  loginError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
  favoriteShowsRequest,
  favoriteShowsSuccess,
  favoriteShowsError,
  favoriteShowsIdRequest,
  favoriteShowsIdSuccess,
  favoriteShowsIdError,
  favoriteShowsIdDeleteRequest,
  favoriteShowsIdDeleteSuccess,
  favoriteShowsIdDeleteError,
  addFriendRequest,
  addFriendSuccess,
  addFriendError,
  deleteFriendRequest,
  deleteFriendSuccess,
  deleteFriendError,
  deleteFromPreferencesRequest,
  deleteFromPreferencesSuccess,
  deleteFromPreferencesError,
  addShowToWatchListRequest,
  addShowToWatchListSuccess,
  addShowToWatchListError,
  deleteShowToWatchListRequest,
  deleteShowToWatchListSuccess,
  deleteShowToWatchListError,
};
