import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = null;

  const handleLogout = () => {

  }

  return (
    <nav className='nav'>
      <Link to='/' className='nav__site-title'>The Book Keeper</Link>
      { !user && (
        <div className="nav__test">
          <p>Test Account</p>
          <p>Email: toby@google.com | PW: Test123</p>
        </div>
      )}
      <ul className='nav__list'>
        { user && (
          <div>
            <p className="nav__greetings">
              Hi, <span>{ user.name }</span>!
              </p>
            <Link to='#' onClick={handleLogout}><li className='nav__item btn-logout'>Log out</li></Link>
          </div>
        )}
        { !user && (
          <div>
            <Link to='/login'><li className='nav__item btn-login'>Log in</li></Link>
            <Link to='/signup'><li className='nav__item btn-signup'>Sign up</li></Link>
          </div>
        )}
      </ul>
    </nav>
  )
}

export default Navbar;