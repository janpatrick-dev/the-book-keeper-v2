import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import FormRowInputText from "../components/form/FormRowInputText";
import FormRowCheckbox from "../components/form/FormRowCheckbox";
import FormButton from "../components/form/FormButton";
import useField from "../hooks/useField";
import { useDispatch, useSelector } from "react-redux";
import { updateBook } from "../redux/reducers/bookReducer";
import useCheckbox from "../hooks/useCheckbox";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const book = useSelector(state => state.books.find((b) => b.id === Number(id)));
  const user = { id: 1 };

  // console.log(book.hasRead);

  const title = useField('text', book.title);
  const author = useField('text', book.author);
  const imgUrl = useField('text', book.imgUrl);
  const year = useField('number', book.yearPublished);
  const hasRead = useCheckbox(book.hasRead);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBook({
      id: book.id,
      title: title.value,
      author: author.value,
      imgUrl: imgUrl.value,
      yearPublished: year.value,
      hasRead: hasRead.value,
      createdAt: book.createdAt // TODO: Remove when database is implemented
    }));
    navigate('/books');
  }

  const resetForm = () => {
    const emptyEvent = { target: { value: '' }};
    title.onChange(emptyEvent);
    author.onChange(emptyEvent);
    imgUrl.onChange(emptyEvent);

    emptyEvent.target.value = 2023;
    year.onChange(emptyEvent);

    emptyEvent.target.value = false;
    hasRead.onChange(emptyEvent);
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
          disabled={false} 
          label='Update Book'
          className='btn-update-book' />
      </form>
    </div>
  );
}

export default UpdateBook;