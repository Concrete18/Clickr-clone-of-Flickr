import React, { useEffect } from 'react';
// import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPhoto } from '../../store/photos';
import './photo.css';

import CommentForm from '../../components/CommentForm';

function PhotoPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  let photo = useSelector(state => state.photos.photos);
  const { photoId } = useParams();
  
  let UserComments;
  if (sessionUser) {
    UserComments = CommentForm;
  }

  useEffect(() => {
    dispatch(getPhoto(photoId)).then(() => console.log())
    console.log(photo)
  }, [photoId])


  // photo = {
  //   imgUrl: 'https://live.staticflickr.com/1707/25393395045_ed34dbfe56_b.jpg',
  //   title: 'Victoria',
  //   description: 'I took this on the weekend'
  // }

  return (
    <div className='photo_page'>
      <div className='photo_container'>
        {photo && <img src={photo?.imgUrl} alt={photo?.title} className='single_photo' />}
      </div>
      <div className='info'>
        <div className='photo_info'>
          <div className='info_box'>
            <h2>Title</h2>
            <p>{photo?.title}</p>
          </div>
          <div className='info_box'>
            <h2>Description</h2>
            <p>{photo?.description}</p>
          </div>
        </div>
        <UserComments />
        <div className='photo_comments'>
          <h2>Comments</h2>
          All comments here
        </div>
      </div>
    </div>
  );
}

export default PhotoPage;
