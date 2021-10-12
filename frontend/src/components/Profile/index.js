import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { getUserPhotos } from '../../store/photos';
import './profile.css';

function Profile() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const photos = useSelector(state => state.photos);


  // TODO wrong data
  // const username = sessionUser.username
  const username = 'ErisconPhotography'
  // const totalPhotos = `${photos[userId].length} Photos`
  const totalPhotos = `800 Photos`
  // const joinedDate = `Joined ${sessionUser.createdAt}`
  const joinedDate = 'Joined 2021'

  useEffect(() => {
    dispatch(getUserPhotos(userId))
  }, [userId])

  return (
    <div className='profile_page'>

      <div className='profile_info'>
        <div className='user_name'>
          {username}
        </div>
        <div className='user_name'>
          <p className='total_photos'>{totalPhotos}</p>
          <p className='joined_date'>{joinedDate}</p>
        </div>
      </div>
      <div className='gallery'>
        { photos[userId]?.map( photo => (
          <a href={`/photo/${photo.id}`} key={photo.id}>
            <img src={photo.imgUrl} alt={photo.title} className='gallery_image' />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Profile;
