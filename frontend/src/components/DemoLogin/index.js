import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const demoLogin = async () => {
    const username = 'Doug_DemoDome'
    const password = 'password'
    return dispatch(
      sessionActions.login({credential: username, password: password})
    )
  }

  return (
      <div className='demo_div single_auth_container'> 
        <h2>Log in as Demo User</h2>
        <button className="demo_login" onClick={demoLogin}>Demo Login</button>
      </div>
  );
}

export default LoginFormPage;
