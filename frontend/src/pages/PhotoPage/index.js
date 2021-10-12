import React, { useEffect } from 'react';
// import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPhoto } from '../../store/photos';
import './photo.css';

function PhotoPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const photo = useSelector(state => state.photos);
  const { photoId } = useParams();
  
  if (sessionUser) {
    // add comments to page
  }

  useEffect(() => {
    dispatch(getPhoto(photoId))
    console.log(photo)
  }, [photoId])

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
