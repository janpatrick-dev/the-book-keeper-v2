import { createSlice } from "@reduxjs/toolkit";
import { setAlert } from "./alertReducer";
import bookService from "../../services/books";

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

const setError = (error) => {
  return (dispatch) => {
    console.log(error);
    let message = error.message;
    if (error.response && error.response.status === 401) {
      dispatch({ type: 'USER_LOGOUT' });
      message = 'Session Expired. Please log in again.';
    }
    dispatch(setAlert(message, false));
  }
};

const clearAlert = () => {
  return (dispatch) => {
    dispatch(setAlert(null));
  }
}

export const initializeBooks = () => {
  return async (dispatch) => {
    try {
      const books = await bookService.getUserBooks();
      dispatch(setBooks(books));
    } catch (err) {
      console.log(err);
      dispatch(setError(err));
    }
  };
};

export const createBook = (newBook) => {
  return async (dispatch) => {
    dispatch(clearAlert());
    try {
      const book = await bookService.create(newBook);
      dispatch(appendBook(book));
      dispatch(setAlert(`Successfully added '${book.title}' to your library.`));
    } catch (err) {
      dispatch(setError(err));
    }
  }
};

export const updateBook = (updatedBook) => {
  return async (dispatch) => {
    dispatch(clearAlert());
    try {
      const bookToUpdate = await bookService.update(updatedBook);
      dispatch(reviseBook(bookToUpdate));
      dispatch(setAlert(`Successfully updated '${bookToUpdate.title}'.`));
    } catch (err) {
      dispatch(setError(err));
    }
  }
}

export const deleteBook = (id) => {
  return async (dispatch) => {
    dispatch(clearAlert());
    try {
      const bookToDelete = await bookService.getUserBook(id);
      await bookService.remove(id);
      dispatch(removeBook(id));
      dispatch(setAlert(`Removed '${bookToDelete.title}' book from your library.`, false));
    } catch (err) {
      dispatch(setError(err));
    }
  }
}

export default bookSlice.reducer;