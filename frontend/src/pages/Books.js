import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Book from "../components/books/Book";
import BookAddForm from "../components/books/BookAddForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBooks } from "../reducers/bookReducer";

const Books = () => {
  const dispatch = useDispatch();
  const books = useSelector(state => state.books);
  const user = {
    _id: 1
  };

  const handleFilter = (e) => {

  };

  const handleFloatingAddBookClick = () => {

  }

  useEffect(() => {
    dispatch(initializeBooks());
  }, [dispatch]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="books">
      <div className="books__left">
        <div className="books__left-header">
          <h2>My Books</h2>
          <select onChange={handleFilter}>
            <option value="date-created">Sort by Date Created</option>
            <option value="title">Sort by Title</option>
            <option value="author">Sort by Author Name</option>
            <option value="year-published">Sort by Year Published</option>
            <option value="read-status">Sort by Read Status</option>
          </select>
        </div>
        <div className="books__list">
          {books.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </div>
      </div>
      <div className="books__right">
        <BookAddForm />
      </div>
      <div className="books__floating">
        <button
          className="btn btn-add-book btn-add-book-floating"
          onClick={handleFloatingAddBookClick}
        >
          Add New Book
        </button>
      </div>
    </div>
  );
};

export default Books;
