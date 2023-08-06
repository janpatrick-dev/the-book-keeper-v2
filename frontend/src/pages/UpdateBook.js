import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import FormRowInputText from "../components/form/FormRowInputText";
import FormRowCheckbox from "../components/form/FormRowCheckbox";
import FormButton from "../components/form/FormButton";
import useField from "../hooks/useField";
import { useDispatch, useSelector } from "react-redux";
import { updateBook } from "../redux/reducers/bookReducer";
import useCheckbox from "../hooks/useCheckbox";
import tokenService from "../services/token";
import { setAlert } from "../redux/reducers/alertReducer";
import HashLoader from "react-spinners/HashLoader";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const book = useSelector(state => state.books.find((b) => b.id === id));
  const user = useSelector(state => state.user);
  const [loading, setLoading] = useState(null);

  const title = useField('text', book && book.title);
  const author = useField('text', book && book.author);
  const imgUrl = useField('text', book && book.imgUrl);
  const year = useField('number', book && book.yearPublished);
  const hasRead = useCheckbox(book && book.hasRead);

  useEffect(() => {
    dispatch(setAlert(null));
  }, [dispatch])

  useEffect(() => {
    if (user) {
      tokenService.set(user.token);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading({ message: '', loading: true });
    await dispatch(updateBook({
      id: book.id,
      title: title.value,
      author: author.value,
      imgUrl: imgUrl.value,
      yearPublished: year.value,
      hasRead: hasRead.value,
      createdAt: book.createdAt // TODO: Remove when database is implemented
    }));
    setLoading(null);
    navigate('/books');
  }

  if (!user) {
    return <Navigate to='/login' />
  }
  
  return (
    <div className='books__update'>
      <form onSubmit={handleSubmit} className='form'>
        <h1>Update Book</h1>
        <div className='divider'></div>
        <FormRowInputText
          {...title}
          label='Title *'
          name='title'
          required={true}
        />
        <FormRowInputText
          {...author}
          label='Author Name *'
          name='author'
          required={true}
        />
        <FormRowInputText
          {...imgUrl}
          label='Book Image URL'
          name='imgUrl'
          placeholder='https://www.example.com/image.jpg'
        />
        <FormRowInputText
          {...year}
          label='Year Published'
          name='year'
        />
        <FormRowCheckbox
          {...hasRead}
          label='Mark as read'
          name='hasRead'
        />
        <FormButton 
          disabled={loading} 
          label='Update Book'
          className='btn-update-book' />
        {loading && <HashLoader style={{ textAlign: 'center' }} />}
      </form>
    </div>
  );
}

export default UpdateBook;