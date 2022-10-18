import React, { useEffect } from "react";
// import * as sessionActions from '../../store/session';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// stores
import { getAllPhotos, getPhoto } from "../../store/photos";
import { getComments } from "../../store/comments";

// components
import Signup from "../../components/SignupForm";
import Login from "../../components/LoginForm";
import Demo from "../../components/DemoLogin";

import "./home.css";

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const photos = useSelector((state) => Object.values(state.photos));

  useEffect(() => {
    dispatch(getAllPhotos());
  }, [dispatch]);

  let sessionLinks;
  if (!sessionUser) {
    sessionLinks = (
      <div className="auth_container">
        <div className="user_auth sign_up">
          <Signup />
        </div>
        <div className="user_auth sign_in">
          <Login />
        </div>
        <div className="user_auth sign_up">
          <Demo />
        </div>
      </div>
    );
  }

  return (
    <div className="home_page">
      {sessionLinks}
      <h2 className="trending_text">Trending</h2>
      <div className="gallery">
        {photos &&
          photos?.map((photo) => (
            <img
              src={photo?.imgUrl}
              alt={photo?.title}
              key={`home${photo?.id}`}
              onClick={async (e) => {
                e.preventDefault();
                console.log(photo?.id);
                await dispatch(getPhoto(photo?.id));
                await dispatch(getComments(photo?.id));
                history.push(`/profile/photo/${photo?.id}`);
              }}
              className="gallery_image"
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
