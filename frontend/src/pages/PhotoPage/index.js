import React, { useEffect } from 'react';
// import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPhoto } from '../../store/photos';
import './photo.css';

import commentForm from '../../components/CommentForm';

function PhotoPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  let photo = useSelector(state => state.photos);
  const { photoId } = useParams();
  
  let userComments;
  if (sessionUser) {
    userComments = commentForm
  }

  useEffect(() => {
    dispatch(getPhoto(photoId))
    console.log(photo)
  }, [photoId])


  photo = {
    imgUrl: 'https://live.staticflickr.com/1707/25393395045_ed34dbfe56_b.jpg',
    title: 'Victoria',
    description: 'I took this on the weekend'
  }

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
        {userComments}
        <div className='photo_comments'>
        
        </div>
      </div>
    </div>
  );
}

export default PhotoPage;
