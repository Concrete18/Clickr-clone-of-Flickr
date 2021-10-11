import { csrfFetch } from './csrf';

const ADD_PHOTO = 'session/AddPhoto';
const REMOVE_PHOTO = 'session/RemovePhoto';

const AddPhoto = (user) => {
  return {
    type: ADD_PHOTO,
    payload: user,
  };
};

const RemovePhoto = () => {
  return {
    type: REMOVE_PHOTO,
  };
};

export const getUserPhotos = (photo) => async (dispatch) => {
  
}

export const uploadPhoto = (photo) => async (dispatch) => {
    const { title, albumId, description } = photo;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        title,
        albumId,
        description,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };
