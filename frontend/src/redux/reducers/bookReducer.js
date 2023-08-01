import { createSlice } from "@reduxjs/toolkit";
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

export const initializeBooks = () => {
  return async (dispatch) => {
    try {
      const books = await bookService.getAll();
      dispatch(setBooks(books));
    } catch (err) {
      dispatch({ type: 'USER_LOGOUT' });
    }
  };
};

export const createBook = (newBook) => {
  return async (dispatch) => {
    try {
      const book = await bookService.create(newBook);
      dispatch(appendBook(book));
    } catch (err) {
      dispatch({ type: 'USER_LOGOUT' });
    }
  }
};

export const updateBook = (updatedBook) => {
  return async (dispatch) => {
    try {
      const bookToUpdate = await bookService.update(updatedBook);
      dispatch(reviseBook(bookToUpdate));
    } catch (err) {
      dispatch({ type: 'USER_LOGOUT' });
    }
  }
}

export const deleteBook = (id) => {
  return async (dispatch) => {
    try {
      await bookService.remove(id);
      dispatch(removeBook(id));
    } catch (err) {
      dispatch({ type: 'USER_LOGOUT' });
    }
  }
}

export default bookSlice.reducer;