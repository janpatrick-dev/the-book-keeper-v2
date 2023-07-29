import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './reducers/bookReducer';
import filterReducer from './reducers/filterReducer';

export const store = configureStore({
  reducer: {
    books: bookReducer,
    filter: filterReducer
  }
});