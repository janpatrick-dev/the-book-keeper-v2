import { createSlice } from "@reduxjs/toolkit";
import bookService from "../services/books";

const bookSlice = createSlice({
  name: 'books',
  initialState: [],
  reducers: {
    setBooks(state, action) {
      return action.payload;
    },
    appendBook(state, action) {
      state.push(action.payload);
    },
    removeBook(state, action) {
      return state.filter((book) => book.id !== action.payload);
    }
  }
});

export const { setBooks, appendBook, removeBook } = bookSlice.actions;

export const initializeBooks = () => {
  return async (dispatch) => {
    const books = await bookService.getAll();
    dispatch(setBooks(books));
  };
};

export const createBook = (newBook) => {
  return async (dispatch) => {
    const book = await bookService.create(newBook);
    dispatch(appendBook(book));
  }
};

export const deleteBook = (id) => {
  return async (dispatch) => {
    await bookService.remove(id);
    dispatch(removeBook(id));
  }
}

export default bookSlice.reducer;