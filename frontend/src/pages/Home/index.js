import React from 'react';
// import * as sessionActions from '../../store/session';
import { useSelector } from 'react-redux';
import './home.css';

import Signup from "../../components/SignupForm";
import Login from "../../components/LoginForm";

function Home() {
  const sessionUser = useSelector(state => state.session.user);
  
  let sessionLinks;
  if (!sessionUser) {
    console.log(sessionUser)
    sessionLinks = (
      <div className='login_signUp'>
        <div className='user_form sign_up' >
          <h2>New User?</h2>
          <Signup />
        </div>
        <div className='user_form sign_in'>
          <Login />
        </div>
      </div>
    );
  }

  return (
    <div className='home_page'>
      {sessionLinks}
      <div>
        Show Profiles Here
      </div>
    </div>
  );
}

export default Home;
