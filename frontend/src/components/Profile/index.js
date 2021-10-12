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

  const [username, setUsername] = useState('Unknown')
  const [totalPhotos, setTotalPhotos] = useState('0 Photos')
  const [joinedDate, setJoinedDate] = useState('Joined 2021')


  const getUserData = (userId) => async (dispatch) => {
    const response = await fetch(`/api/photos/${userId}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    if (response.ok) {
      const user = await response.json();
      return user
    }
  }

  // const username = 'ErisconPhotography'
  // const totalPhotos = `800 Photos`
  // const joinedDate = 'Joined 2021'

  useEffect(() => {
    dispatch(getUserPhotos(userId))
    // TODO get userData
    const user = getUserData()
    setUsername(user.username)
    setJoinedDate(user.createdAt)
    // const totalPhotos = `${photos[userId].length} Photos`
    setTotalPhotos(photos.length)
    // const joinedDate = `Joined ${sessionUser.createdAt}`
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
          <a href={`/profile/photo/${photo.id}`} key={photo.id}>
            <img src={photo.imgUrl} alt={photo.title} className='gallery_image' />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Profile;
