import HashLoader from 'react-spinners/HashLoader';

const BookLoading = ({ message='Loading' }) => {
  return ( 
    <div className='books__item-loading'>
      <HashLoader color='white' />
      <p>{ message }</p>
    </div>
  );
}
 
export default BookLoading;