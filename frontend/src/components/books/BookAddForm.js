import { useEffect, useState } from "react";
import FormRowInputText from "../form/FormRowInputText";
import FormButton from "../form/FormButton";
import FormRowCheckbox from "../form/FormRowCheckbox";

import useField from '../../hooks/useField';

import { useDispatch } from "react-redux";
import { createBook } from "../../redux/reducers/bookReducer";
import LoadingProgress from "../LoadingProgress";

const BookAddForm = ({ onSubmit=null }) => {
  const title = useField('text');
  const author = useField('text');
  const imgUrl = useField('text');
  const year = useField('number', 2023);
  const hasRead = useField('checkbox', false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(createBook({
      title: title.value, 
      author: author.value, 
      imgUrl: imgUrl.value, 
      hasRead: hasRead.value,
      yearPublished: year.value,
      createdAt: new Date() // TODO: remove after creating database
    }));
    setLoading(false);
    resetForm();
    if (onSubmit) { onSubmit(); }
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

  return (
    <div className='books__add'>
      <form onSubmit={handleSubmit} className='form'>
        <h2>New book</h2>
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
          label='Add Book'
          className='btn-add-book'  />
      </form>
      {loading && <LoadingProgress />}
    </div>
  )
}

export default BookAddForm;