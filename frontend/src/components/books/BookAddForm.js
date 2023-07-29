import { useEffect } from "react";
import FormRowInputText from "../form/FormRowInputText";
import FormButton from "../form/FormButton";
import FormRowCheckbox from "../form/FormRowCheckbox";

import useField from '../../hooks/useField';

import { useDispatch } from "react-redux";
import { createBook } from "../../reducers/bookReducer";

const BookAddForm = () => {
  const title = useField('text');
  const author = useField('text');
  const imgUrl = useField('text');
  const year = useField('number', 2023);
  const hasRead = useField('checkbox', false);

  const dispatch = useDispatch();

  useEffect(() => {
    
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createBook({
      title: title.value, 
      author: author.value, 
      imgUrl: imgUrl.value, 
      hasRead: hasRead.value,
      yearPublished: year.value
    }));
    resetForm();
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
          disabled={false} 
          label='Add Book'
          className='btn-add-book'  />
        {/* <FormError error={err} />
        <LoadingProgress isLoading={addLoading} /> */}
      </form>
    </div>
  )
}

export default BookAddForm;