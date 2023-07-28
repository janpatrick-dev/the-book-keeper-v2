import { useEffect, useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <div className='login'>
      <form onSubmit={handleSubmit} className='form'>
        <h1>Log In</h1>
        <div className='divider'></div>
        <div className='form__row'>
          <label htmlFor='email' className='form__label'>Email</label>
          <input 
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name='email'
            id='email'
            className='form__input-text'
            placeholder='Email'
            required
          />
        </div>
        <div className='form__row'>
          <label htmlFor='password' className='form__label'>Password</label>
          <input 
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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