import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import UIHelper from "../../helpers/UIHelper";

const Drawer = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const handleClickAction = (e) => {
    UIHelper.hideDrawer();
  }

  const handleLogout = (e) => {
    dispatch({ type: 'USER_LOGOUT' });
  }

  return (
    <div className='drawer hide-side'>
      <CloseIcon className='close-icon' onClick={handleClickAction} />
      <div className='drawer__header'>
        { 
          !user ? (
            <div className="drawer__test">
              <p>Test Account</p>
              <p>Email: toby@google.com</p>
              <p>PW: Test123</p>
            </div>
          ) : (
            <p className='drawer__greetings'>Hi, <span>{user.name}</span>!</p>
          )
        }
      </div>
      <ul className='drawer__list'>
        { 
          !user ? (
            <div className='drawer__unauthorized'>
              <Link to='/login' onClick={handleClickAction}><li className='drawer__item btn-login'>Log in</li></Link>
              <Link to='/signup' onClick={handleClickAction}><li className='drawer__item btn-signup'>Sign up</li></Link>
            </div>
          ) : (
            <div className='drawer__authorized'>
              <Link to='#' onClick={handleLogout}><li className='drawer__item btn-logout'>Log out</li></Link>
            </div>
          )
        }
      </ul>
    </div>
  )
}

export default Drawer;