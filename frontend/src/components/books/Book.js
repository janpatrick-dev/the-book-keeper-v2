import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { updateBook, deleteBook } from '../../redux/reducers/bookReducer';
import BookLoading from './BookLoading';
import { useState } from 'react';

const Book = ({ book }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(null);

  const { 
    id, 
    hasRead, 
    imgUrl, 
    title, 
    author, 
    yearPublished, 
    createdAt 
  } = book;

  const handleUpdateReadStatus = async (e) => {
    setLoading({ message: 'Updating book...', isLoading: true });
    await dispatch(updateBook({ ...book, hasRead: !book.hasRead }));
    setLoading(null);
  }

  const handleDelete = async (e) => {
    setLoading({ message: 'Deleting book...', isLoading: true });
    await dispatch(deleteBook(id));
    setLoading(null);
  }

  return (
    <div className={`books__item ${hasRead && 'books__item--read'}`}>
      <div className='books__item-left'>
        { imgUrl && 
          <img src={imgUrl} alt={`Book cover of ${title}`} className="books__item-img" />
        }
      </div>
      <div className='books__item-right'>
        <div className='books__item-details'>
          <div>
            <p className='books__item-title'>{title}</p>
            <p className='books__item-author'>{author}</p>
            <p className='books__item-year'>{yearPublished}</p>
          </div>
          <p className='books__item-created'>{moment(createdAt).fromNow()}</p>
        </div>
        <div className='books__item-actions'>
          <CheckBoxIcon
            className={`books__item-check-icon ${hasRead && 'active'}`}
            onClick={handleUpdateReadStatus}
            titleAccess={`Mark as ${hasRead ? 'unread' : 'read'}`} 
          />
          <Link to={`/books/edit/${id}`}>
            <EditIcon
              className='books__item-edit-icon'
              titleAccess='Edit this book' 
            />
          </Link>
          <DeleteIcon 
            className='books__item-delete-icon' 
            onClick={handleDelete} 
            titleAccess='Delete this book'
          />
        </div>
      </div>
      {loading && <BookLoading message={loading.message} />}
    </div>
  )
}

export default Book;