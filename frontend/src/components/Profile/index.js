import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import './profile.css';

function Profile() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  

  const photos = ['']

  return (
    <div>
      <div className='profile_info'>
      
      </div>
      <div className='gallery'>
        { photos.map( photo => (
          <img src={photo.imgUrl} alt={photo.description}> </img>
        ))}
      </div>
    </div>
  );
}

export default Profile;
