import React, { useEffect } from 'react';
// import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPhoto } from '../../store/photos';
import './home.css';

function Home() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  
  if (sessionUser) {
    // add comments to page
  }

  return (
    <div className='home_page'>
      <h2>Home Page</h2>
    </div>
  );
}

export default Home;
