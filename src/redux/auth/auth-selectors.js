export const getIsAuthenticated = (state) => state.auth.isAuthenticated;

export const getUserEmail = (state) => state.auth.email;
export const getUserUid = (state) => state.auth.uid;
export const getUserName = (state) => state.auth.displayName;
export const getUserPhoto = (state) => state.auth.photoURL;
export const favoriteShows = (state) => state.auth.favoriteShows;
export const favoriteShowsId = (state) => state.auth.favoriteShowsId;
export const getUsersFriends = (state) => state.auth.friends;

export const isLoading = (state) => state.auth.isLoading;
export const error = (state) => state.auth.error;
