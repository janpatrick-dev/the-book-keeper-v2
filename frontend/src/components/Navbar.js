import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UIHelper from '../helpers/UIHelper';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const handleLogout = () => {
    dispatch({ type: 'USER_LOGOUT' });
  }

  const handleHamburgerClick = () => {
    UIHelper.showDrawer();
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
      <div className="nav__hamburger" onClick={handleHamburgerClick}>
        <div className="nav__line"></div>
        <div className="nav__line"></div>
        <div className="nav__line"></div>
      </div>
    </nav>
  )
}

export default Navbar;