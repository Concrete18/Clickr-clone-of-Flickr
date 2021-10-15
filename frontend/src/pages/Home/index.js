import React, { useEffect } from 'react';
// import * as sessionActions from '../../store/session';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './home.css';
import { getAllPhotos } from '../../store/photos';
import Signup from "../../components/SignupForm";
import Login from "../../components/LoginForm";

function Home() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const photos = useSelector(state => Object.values(state.photos));

  useEffect(() => {
    dispatch(getAllPhotos())
  }, [dispatch])
  
  let sessionLinks;
  if (!sessionUser) {
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
      <h2>Trending</h2>
      <div className='gallery'>
      {photos && photos?.map( photo => (
          <Link to={`/profile/photo/${photo?.id}`} key={photo?.id} >
            <img src={photo?.imgUrl} alt={photo?.title} className='gallery_image' />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
