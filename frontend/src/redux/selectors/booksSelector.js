import { createSelector } from "@reduxjs/toolkit";

const selectBooks = state => state.books;
const selectFilter = state => state.filter;

const booksSelector = createSelector([selectBooks, selectFilter], (books, filter) => {
  switch (filter) {
    case 'date-created':
      return [...books].sort((a, b) => (a.createdAt).localeCompare(b.createdAt));
    case 'title':
      return [...books].sort((a, b) => (a.title).localeCompare(b.title));
    case 'author':
      return [...books].sort((a, b) => (a.author).localeCompare(b.author));
    case 'year-published':
      return [...books].sort((a, b) => a.yearPublished - b.yearPublished);
    case 'read-status':
      return [...books].sort((a, b) => a.hasRead - b.hasRead);
    default:
      return books;
  }
});

export default booksSelector;