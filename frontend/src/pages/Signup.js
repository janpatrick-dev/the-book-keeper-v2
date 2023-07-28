import { useEffect, useState } from 'react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <div className='signup'>
      <form onSubmit={handleSubmit} className='form'>
        <h1>Sign Up</h1>
        <div className='divider'></div>
        <div className='form__row'>
          <label htmlFor='name' className='form__label'>Name</label>
          <input 
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            name='name'
            id='name'
            className='form__input-text'
            placeholder='Name'
            required
          />
        </div>
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
        <button className='form__btn btn-login btn-signup'>
          Sign up
        </button>
        {/* <FormButton disabled={isLoading} label='Sign up' className='btn-signup' /> */}
        {/* <FormError error={error} />
        <LoadingProgress isLoading={isLoading} /> */}
      </form>
    </div>
  );
}

export default Signup;