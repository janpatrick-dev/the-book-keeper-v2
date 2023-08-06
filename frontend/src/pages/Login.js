import { Navigate, useNavigate } from 'react-router-dom';
import useField from '../hooks/useField';
import loginService from '../services/login';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setUser } from '../redux/reducers/userReducer';
import { setAlert } from '../redux/reducers/alertReducer';
import { useState } from 'react';
import FormRowInputText from '../components/form/FormRowInputText';
import FormButton from '../components/form/FormButton';
import LoadingProgress from '../components/LoadingProgress';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const email = useField('email');
  const password = useField('password');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await dispatch(loginUser({ email, password }));
      setLoading(false);
      navigate('/books');
    } catch (error) {
      let message = error.response.data.error;
      if (!message) {
        message = error.message;
      }
      setLoading(false);
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
          disabled={loading}
          label='Log in'
          className='btn-login'
        />
        {loading && <LoadingProgress />}
      </form>
    </div>
  );
}

export default Login;