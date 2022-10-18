import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

// stores
import { getUserPhotos, getPhoto, deletePhoto } from "../../store/photos";
import { getComments } from "../../store/comments";
import { getProfile } from "../../store/profile";

// components
import CommentsSection from "../../components/CommentsSection";

import "./photo.css";

function PhotoPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const { photoId } = useParams();
  let photo = useSelector((state) => state.photos?.photo);

  useEffect(() => {
    dispatch(getPhoto(photoId));
    dispatch(getComments(photoId));
  }, [dispatch, photoId]);

  const handleDelete = async (e) => {
    e.preventDefault();
    let deletedPhoto = await dispatch(deletePhoto(photoId));
    history.push(`/profile/${sessionUser.id}`);
    if (deletedPhoto) return;
  };

  const toProfile = async (e) => {
    e.preventDefault();
    await dispatch(getUserPhotos(photo?.User.id));
    await dispatch(getProfile(photo?.User.id));
    history.push(`/profile/${photo?.User.id}`);
  };

  return (
    <div className="photo_page">
      <div className="photo_container">
        {photo && (
          <img
            src={photo?.imgUrl}
            alt={photo?.title}
            className="single_photo"
          />
        )}
      </div>
      <div className="center small_margin">
        {sessionUser && sessionUser.id === photo?.User.id && (
          <button onClick={handleDelete} className="delete button">
            Delete Photo
          </button>
        )}
      </div>
      <div className="lower_container">
        <div className="photo_info_container">
          <div className="photo_info">
            <div className="info_box">
              <button className="username_link" onClick={toProfile}>
                {photo?.User.username}
              </button>
            </div>
            <div className="info_box">
              <h3>{photo?.title}</h3>
            </div>
            <div className="info_box">
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
