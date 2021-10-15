import React, { useEffect } from 'react';
// import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './photo.css';
// stores
import { getPhoto } from '../../store/photos';
import { getComments } from '../../store/comments';
// components
import CommentsSection from '../../components/CommentsSection';

function PhotoPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const { photoId } = useParams();
  let photo = useSelector((state) => state.photos?.photo);

  useEffect(() => {
    dispatch(getPhoto(photoId))
    dispatch(getComments(photoId))
  }, [dispatch, photoId])

  const handleDelete = async (e) => {
    e.preventDefault();
    // setShowEditComment(!showEditComment)
    // let deletedComment = await dispatch(deleteComment(commentId))
    // if (deletedComment) return
  };

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
          {sessionUser.id === photo?.User.id && <button onClick={handleDelete} className='delete'>Delete Photo</button>}
          
        </div>
         <CommentsSection photoId={photoId} />
      </div>
    </div>
  );
}

export default PhotoPage;
