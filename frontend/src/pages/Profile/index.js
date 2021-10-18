import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

// stores
import { getUserPhotos, getPhoto } from '../../store/photos';
import { getComments } from '../../store/comments';
import { getPageOwner } from '../../store/owner'

// components
import UploadPhoto from '../../components/UploadPhoto'

import './profile.css';

function Profile() {
  const sessionUser = useSelector(state => state.session.user);
  const photos = useSelector(state => Object.values(state.photos));
  const owner = useSelector(state => state.owner);
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams();

  console.log()
  const [username, setUsername] = useState('Unknown')
  // const [totalPhotos, setTotalPhotos] = useState('0 Photos')
  // const [joinedDate, setJoinedDate] = useState('Joined 2021')

  useEffect(() => {
    dispatch(getUserPhotos(userId))
    const newOwner = dispatch(getPageOwner(userId))
    // TODO add banner info
    console.log(newOwner)
    // setUsername(newOwner.ownerInfo.username)
    // setJoinedDate(photos.User.createdAt)
    // const totalPhotos = `${photos[userId].length} Photos`
    // setTotalPhotos(photos.length)
    // const joinedDate = `Joined ${sessionUser.createdAt}`
  }, [dispatch])

  return (
    <div className='profile_page'>

      <div className='banner'>
        {/* <img src={photos.User.avatar} alt="" /> */}
        <div className='user_name'>
          {/* {owner.user.username} */}
        </div> 
        <div className='user_name'>
          {/* <p className='total_photos'>{totalPhotos}</p>
          <p className='joined_date'>{joinedDate}</p> */}
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
