import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import logo from '../../images/logo.png'
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <NavLink to={`/profile/${sessionUser.id}`} className='nav_link' >{sessionUser.username}</NavLink>
        <button onClick={logout}>Log Out</button>
      </div>
    );
  } else {
    sessionLinks = (
      <div className='login_signup'>
        <NavLink to="/" className='nav_link' >Log In</NavLink>
        <NavLink to="/" className='nav_link' >Sign Up</NavLink>
      </div>
    );
  }

  return (
    <div className='nav_bar'>
      <div className='nav_left'>
        <NavLink to="/">
          <img src={logo}  alt='logo' className='nav_logo' />
        </NavLink>
      </div>
      <div className='nav_right'>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
