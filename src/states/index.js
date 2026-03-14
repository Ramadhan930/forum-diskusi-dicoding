import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './authUser/slice';
import isPreloadReducer from './isPreload/slice';
import threadsReducer from './threads/slice';
import usersReducer from './users/slice';
import threadDetailReducer from './threadDetail/slice';
import leaderboardsReducer from './leaderboards/slice';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    threads: threadsReducer,
    users: usersReducer,
    threadDetail: threadDetailReducer,
    loadingBar: loadingBarReducer,
    leaderboards: leaderboardsReducer,
  },
});

export default store;