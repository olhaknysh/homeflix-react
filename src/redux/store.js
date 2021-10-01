import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { todayShowsReducer } from './todayShows';
import userReducer from './auth/auth-reducers';
import updatedShowsReducer from './showUpdates/showUpdates-reducers';
import movieSearchReducer from './movieSearch/movieSearch-reducers';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];

const userConfig = {
  key: 'uid',
  storage,
  whitelist: ['uid'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(userConfig, userReducer),
    todayShows: todayShowsReducer,
    updatedShows: updatedShowsReducer,
    movieSearch: movieSearchReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
