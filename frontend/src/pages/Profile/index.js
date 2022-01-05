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


function myFunction() {
  var d = new Date();
  var hours = d.getHours();
  var currentTime = d.toLocaleDateString();
  var counter = SpreadsheetApp.getActiveSheet().getRange("B1").getValues();
  
  // if (hours >= 6 && hours <= 18) {
  var response = UrlFetchApp.fetch("https://click-r.herokuapp.com/");
  var response = UrlFetchApp.fetch("https://feedly-clone.herokuapp.com/");
  SpreadsheetApp.getActiveSheet().getRange("A" + counter).setValue("Visted at " + currentTime + " " + hours + "h");
  SpreadsheetApp.getActiveSheet().getRange("B1").setValue(Number(counter) + 1);

  SpreadsheetApp.getActiveSheet().getRange('A' + counter).setValue("Visted at " + currentTime + " " + hours + "h");
  SpreadsheetApp.getActiveSheet().getRange('B1').setValue(Number(counter) + 1);
  // }
}


function myFunction() {
  let d = new Date();
  let hours = d.getHours();
  let currentTime = d.toLocaleDateString();
  let counter = SpreadsheetApp.getActiveSheet().getRange('B1').getValues();
  
  if (hours >= 8 && hours <= 16) {
  let response = UrlFetchApp.fetch("https://click-r.herokuapp.com/");
  let response = UrlFetchApp.fetch("https://feedly-clone.herokuapp.com/");
  SpreadsheetApp.getActiveSheet().getRange('A' + counter).setValue("Visted at " + currentTime + " " + hours + "h");
  SpreadsheetApp.getActiveSheet().getRange('B1').setValue(Number(counter) + 1);
  }
 }
