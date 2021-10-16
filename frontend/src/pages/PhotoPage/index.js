import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import './photo.css';
// stores
import { getPhoto, deletePhoto } from '../../store/photos';
import { getComments } from '../../store/comments';
// components
import CommentsSection from '../../components/CommentsSection';

function PhotoPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const { photoId } = useParams();
  let photo = useSelector((state) => state.photos?.photo);

  useEffect(() => {
    dispatch(getPhoto(photoId))
    dispatch(getComments(photoId))
  }, [dispatch, photoId])

  const handleDelete = async (e) => {
    e.preventDefault();
    let deletedPhoto = await dispatch(deletePhoto(photoId))
    history.push(`/profile/${sessionUser.id}`);
    if (deletedPhoto) return
  };

  return (
    <div className='photo_page'>
      <div className='photo_container'>
        {photo && <img src={photo?.imgUrl} alt={photo?.title} className='single_photo' />}
      </div>
      <div className='center small_margin'>
        {sessionUser && sessionUser.id === photo?.User.id && <button onClick={handleDelete} className='delete'>Delete Photo</button>}
      </div>
      <div className='lower_container'>
        <div className='photo_info_container'>
          <div className='photo_info'>
            <div className='info_box'>
              <Link to={`/profile/${photo?.User.id}`} key={photo?.id} className='username_link'>
                <h2>{photo?.User.username}</h2>
              </Link>
            </div>
            <div className='info_box'>
              <h3>{photo?.title}</h3>
            </div>
            <div className='info_box'>
              <p>{photo?.description}</p>
            </div>
          </div>
        </div>
         <CommentsSection photoId={photoId} />
      </div>
    </div>
  );
}

export default PhotoPage;
