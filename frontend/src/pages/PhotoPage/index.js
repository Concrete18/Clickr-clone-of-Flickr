import React, { useEffect } from 'react';
// import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPhoto } from '../../store/photos';
import { getComments } from '../../store/comments';
import './photo.css';

import CommentForm from '../../components/CommentForm';

function PhotoPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const { photoId } = useParams();
  // let photo = useSelector(state => state.photos.photos);
  let photo = useSelector((state) => state.photos?.photos[photoId]);
  let comments = useSelector((state) => state.comments?.[photoId]);

  useEffect(() => {
    dispatch(getPhoto(photoId))
    dispatch(getComments(photoId))
  }, [photoId])

  console.log(comments)

  return (
    <div className='photo_page'>
      <div className='photo_container'>
        {photo && <img src={photo?.imgUrl} alt={photo?.title} className='single_photo' />}
      </div>
      <div className='info'>
        <div className='photo_info'>
          <div className='info_box'>
            <h2>Creator</h2>
            <p>{photo?.User.username}</p>
          </div>
          <div className='info_box'>
            <h2>Title</h2>
            <p>{photo?.title}</p>
          </div>
          <div className='info_box'>
            <h2>Description</h2>
            <p>{photo?.description}</p>
          </div>
        </div>
        {sessionUser && <CommentForm />}
        <div className='photo_comments'>
          <h2>Comments</h2>
          { comments?.map( comment => {
            return (
              <div className='single_comment' key={comment.id}>
                <h3>{comment.User.username}.</h3>
                <p>{comment.commentBody}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default PhotoPage;
