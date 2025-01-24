import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../models/users';
import itemsLeftReducer from '../models/items';

const store = configureStore({
  reducer: {
    users: usersReducer,
    itemsLeft: itemsLeftReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
