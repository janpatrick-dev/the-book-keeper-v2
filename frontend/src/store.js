import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './reducers/bookReducer';

export const store = configureStore({
  reducer: {
    books: bookReducer
  }
});