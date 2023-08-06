import { Navigate, useNavigate } from 'react-router-dom';
import useField from '../hooks/useField';
import loginService from '../services/login';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setUser } from '../redux/reducers/userReducer';
import { setAlert } from '../redux/reducers/alertReducer';
import { useState } from 'react';
import FormRowInputText from '../components/form/FormRowInputText';
import FormButton from '../components/form/FormButton';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const email = useField('email');
  const password = useField('password');

  const [isLoading, setIsLoading] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await dispatch(loginUser({ email, password }));
      setIsLoading(false);
      navigate('/books');
    } catch (error) {
      let message = error.response.data.error;
      if (!message) {
        message = error.message;
      }
      setIsLoading(false);
      dispatch(setAlert(message, false));
    }
  }

  if (user) {
    return <Navigate to='/books' />
  }

  return (
    <div className='login'>
      <form onSubmit={handleSubmit} className='form'>
        <h1>Log In</h1>
        <div className='divider'></div>
        <FormRowInputText
          {...email}
          name='email'
          label='Email'
          placeholder='Email'
          required={true}
        />
        <FormRowInputText
          {...password}
          name='password'
          label='Password'
          placeholder='Password'
          required={true}
        />
        <FormButton
          disabled={isLoading}
          label='Log in'
          className='btn-login'
        />
      </form>
    </div>
  );
}

export default Login;