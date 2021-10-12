import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { getUserPhotos } from '../../store/photos';
import './photo.css';

function PhotoPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const { photoId } = useParams();
  let photoTest
  const [photo, setPhoto] = useState(null)
  
  if (sessionUser) {
    // add comments to page
  }
  
  const getPhoto = (photoId) => async () => {
    const response = await fetch(`/api/photos/${photoId}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    if (response.ok) {
      const photo = await response.json();
      // console.log(photo)
      return photo;
    }
  }

  useEffect(() => {
    photoTest = getPhoto(photoId)
    setPhoto(photoTest)
  }, [photoId])

  useEffect(() => {
    setPhoto(photoTest)
    console.log(photo)
  }, [photo])

  // useEffect(() => {
  //   dispatch(getUserPhotos(userId))
  // }, [userId])

  return (
    <div className='photo_page'>
      <div className='photo_container'>
        {photo && <img src={photo?.imgUrl} alt={photo?.title} className='single_photo' />}
      </div>
      <div className='info'>
        <div className='photo_info'>
          <p>{photo?.title}</p>
          <p>{photo?.description}</p>
        </div>
        <div className='user_comment'>
        
        </div>
        <div className='photo_comments'>
        
        </div>
      </div>
    </div>
  );
}

export default PhotoPage;
