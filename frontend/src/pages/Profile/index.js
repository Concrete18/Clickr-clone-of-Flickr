import React, { useEffect } from 'react';
// import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getUserPhotos, uploadNewPhoto } from '../../store/photos';
import './profile.css';

function Profile() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  // const sessionUser = useSelector(state => state.session.user);
  const photos = useSelector(state => Object.values(state.photos));

  // const [username, setUsername] = useState('Unknown')
  // const [totalPhotos, setTotalPhotos] = useState('0 Photos')
  // const [joinedDate, setJoinedDate] = useState('Joined 2021')

  useEffect(() => {
    dispatch(getUserPhotos(userId))

    console.log(photos)
    // setUsername(photos.User.username)
    // setJoinedDate(photos.User.createdAt)
    // const totalPhotos = `${photos[userId].length} Photos`
    // setTotalPhotos(photos.length)
    // const joinedDate = `Joined ${sessionUser.createdAt}`
  }, [userId])
  
  function handleSubmit(e) {
    dispatch(uploadNewPhoto())
  }

  return (
    <div className='profile_page'>

      <div className='profile_info'>
        <div className='user_name'>
          {/* {username} */}
        </div>
        <div className='user_name'>
          {/* <p className='total_photos'>{totalPhotos}</p>
          <p className='joined_date'>{joinedDate}</p> */}
        </div>
      </div>
      <input type="text" name="" id="" on onChange/>
      <button onClick={() => handleSubmit}>Upload Photo</button>
      <div className='gallery'>
        { photos?.map( photo => (
          <Link to={`/profile/photo/${photo.id}`} key={photo.id} >
            <img src={photo.imgUrl} alt={photo.title} className='gallery_image' />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Profile;
