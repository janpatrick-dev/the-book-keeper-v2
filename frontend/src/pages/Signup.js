import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useField from '../hooks/useField';
import { createUser } from '../redux/reducers/userReducer';
import FormRowInputText from '../components/form/FormRowInputText';
import FormButton from '../components/form/FormButton';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const name = useField('text');
  const username = useField('text');
  const email = useField('email');
  const password = useField('password');

  useEffect(() => {

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createUser({
      name: name.value,
      username: username.value,
      email: email.value,
      password: password.value
    }));
    navigate('/books');
  }

  return (
    <div className='signup'>
      <form onSubmit={handleSubmit} className='form'>
        <h1>Sign Up</h1>
        <div className='divider'></div>
        <FormRowInputText
          {...name}
          name='name'
          label='Name'
          required={true}
          placeholder='Name'
        />
        <FormRowInputText
          {...username}
          name='username'
          label='Username'
          required={true}
          placeholder='Username'
        />
        <FormRowInputText
          {...email}
          name='email'
          label='Email'
          required={true}
          placeholder='Email'
        />
        <FormRowInputText
          {...password}
          name='password'
          label='Password'
          required={true}
          placeholder='Password'
        />
        <FormButton
          disabled={false}
          label='Sign up'
          className='btn-signup'
        />
        {/* <FormButton disabled={isLoading} label='Sign up' className='btn-signup' /> */}
        {/* <FormError error={error} />
        <LoadingProgress isLoading={isLoading} /> */}
      </form>
    </div>
  );
}

export default Signup;