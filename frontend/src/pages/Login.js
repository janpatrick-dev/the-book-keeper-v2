import { Navigate, useNavigate } from 'react-router-dom';
import useField from '../hooks/useField';
import loginService from '../services/login';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/reducers/userReducer';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const identifier = useField('text');
  const password = useField('password');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ 
        identifier: identifier.value, 
        password: password.value 
      });
      dispatch(setUser(user));
      navigate('/books');
    } catch (error) {
      console.log(error);
      // TODO: Handle error later on failed login..
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
        <div className='form__row'>
          <label htmlFor='identifier' className='form__label'>Email / Username</label>
          <input 
            {...identifier}
            name='identifier'
            id='identifier'
            className='form__input-text'
            placeholder='Email / Username'
            required
          />
        </div>
        <div className='form__row'>
          <label htmlFor='password' className='form__label'>Password</label>
          <input 
            {...password}
            name='password'
            id='password'
            className='form__input-text'
            placeholder='Password'
            required
          />
        </div>
        <button className={`form__btn btn-login`}>
          Log in
        </button>
      </form>
    </div>
  );
}

export default Login;