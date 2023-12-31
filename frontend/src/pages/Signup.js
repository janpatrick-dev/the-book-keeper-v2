import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import useField from '../hooks/useField';
import { createUser } from '../redux/reducers/userReducer';
import FormRowInputText from '../components/form/FormRowInputText';
import FormButton from '../components/form/FormButton';
import { setAlert } from '../redux/reducers/alertReducer';
import LoadingProgress from '../components/LoadingProgress';

const Signup = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const name = useField('text');
  const email = useField('email');
  const password = useField('password');

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(setAlert(null));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await dispatch(createUser({
        name: name.value,
        email: email.value.toLowerCase(),
        password: password.value
      }));
      setLoading(false);
    } catch (err) {
      const { email, password } = err.response.data.error;
      setLoading(false);
      setEmailError(email);
      setPasswordError(password);
    }
  }

  if (user) {
    return <Navigate to='/books' />;
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
          {...email}
          name='email'
          label='Email *'
          required={true}
          placeholder='Email'
          error={emailError}
        />
        <FormRowInputText
          {...password}
          name='password'
          label='Password *'
          required={true}
          placeholder='Password'
          error={passwordError}
        />
        <FormButton
          disabled={loading}
          label='Sign up'
          className='btn-signup'
        />
        {loading && <LoadingProgress />}
        {/* <FormButton disabled={isLoading} label='Sign up' className='btn-signup' /> */}
        {/* <FormError error={error} />*/}
      </form>
    </div>
  );
}

export default Signup;