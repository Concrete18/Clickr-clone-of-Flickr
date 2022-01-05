import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

// stores
import { getUserPhotos, getPhoto } from '../../store/photos';
import { getComments } from '../../store/comments';
import { getProfile } from '../../store/profile'

// components
import UploadPhoto from '../../components/UploadPhoto'

import './profile.css';

function Profile() {
  const sessionUser = useSelector(state => state.session.user);
  const photos = useSelector(state => Object.values(state.photos));
  const profile = useSelector(state => Object.values(state.profile)[0]);
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getUserPhotos(userId))
    dispatch(getProfile(userId))
  }, [dispatch, userId])

  const dateObj = new Date(profile?.createdAt);
  const year = dateObj.getUTCFullYear();

  return (
    <div className='profile_page'>
      <div className='banner'>
        <div className='banner_info'>
          <img className='profile_avatar' src={profile?.avatar} alt="" />
          <div className='info_container'>
            <div className='banner_info_left'>
              <div className='user_name'>{profile?.username}</div> 
            </div>
            <div className='banner_info_right'>
              <div className='total_photos'>{photos?.length} Photos</div>
              <div className='joined_date'>Joined {year}</div>  
            </div>
          </div>
        </div>
      </div>
      {sessionUser && Number(userId) === sessionUser.id && <UploadPhoto />}
      <div className='gallery'>
        {photos && photos?.map( photo => (
            <img src={photo?.imgUrl} alt={photo?.title} key={`profile${photo?.id}`} onClick={ async (e) => {
              e.preventDefault();
              await dispatch(getPhoto(photo?.id))
              await dispatch(getComments(photo?.id))
              history.push(`/profile/photo/${photo?.id}`);
            }} className='gallery_image' />
        ))}
      </div>
    </div>
  );
}

export default Profile;
