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
    reviseBook(state, action) {
      return state.map((book) => {
        if (book.id === action.payload.id) {
          return action.payload;
        }
        return book;
      });
    },
    removeBook(state, action) {
      return state.filter((book) => book.id !== action.payload);
    }
  }
});

export const { setBooks, appendBook, reviseBook, removeBook } = bookSlice.actions;

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

export const updateBook = (updatedBody) => {
  return async (dispatch) => {
    const updatedBook = await bookService.update(updatedBody);
    dispatch(reviseBook(updatedBook));
  }
}

export const deleteBook = (id) => {
  return async (dispatch) => {
    await bookService.remove(id);
    dispatch(removeBook(id));
  }
}

export default bookSlice.reducer;