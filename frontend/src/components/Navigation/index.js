import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// stores
import { getUserPhotos } from '../../store/photos';
import * as sessionActions from '../../store/session';
import { getPageOwner } from '../../store/owner'

import logo from '../../images/logo.png'
import './Navigation.css';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const toProfile = async (e) => {
    e.preventDefault();
    await dispatch(getUserPhotos(sessionUser.id))
    await dispatch(getPageOwner(sessionUser.id))
    history.push(`/profile/${sessionUser.id}`);
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <button className='text_only_button' onClick={toProfile} >{sessionUser.username}</button>
        <button onClick={logout} className='text_only_button'>Log Out</button>
      </div>
    );
  } else {
    sessionLinks = (
      <div className='login_signup'>
        <NavLink to="/" className='nav_link' >Login/Sign Up</NavLink>
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
