import { csrfFetch } from './csrf';

const ADD_USER_PHOTOS = 'photos/addUserPhotos';
const ADD_SINGLE_PHOTO = 'photo/addSinglePhoto';
const REMOVE_PHOTO = 'photos/removePhoto';

const addUserPhotos = (photos) => {
  return {
    type: ADD_USER_PHOTOS,
    photos
  };
};

const addSinglePhoto = (photo) => {
  return {
    type: ADD_SINGLE_PHOTO,
    photo
  };
};

const removePhoto = (photoId) => {
  return {
    type: REMOVE_PHOTO,
    photoId
  };
};

export const getAllPhotos = () => async (dispatch) => {
  const response = await fetch(`/api/photos/`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  if (response.ok) {
    const photos = await response.json();
    dispatch(addUserPhotos(photos));
  }
}

export const getUserPhotos = (userId) => async (dispatch) => {
  const response = await fetch(`/api/photos/users/${userId}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  if (response.ok) {
    const photos = await response.json();
    dispatch(addUserPhotos(photos));
  }
}

export const getPhoto = (photoId) => async (dispatch) => {
  const response = await fetch(`/api/photos/${photoId}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  if (response.ok) {
    const photo = await response.json();
    dispatch(addSinglePhoto(photo));
  }
}

export const uploadNewPhoto = (photo) => async (dispatch) => {
  const { title, userId, albumId, description, imgUrl } = photo;
  const response = await csrfFetch("/api/photos/new", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      userId,
      albumId,
      description,
      imgUrl
    }),
  });
  const data = await response.json();
  dispatch(addSinglePhoto(data));
  return data;
};

export const deletePhoto = (photoId) => async (dispatch) => {
  const response = await csrfFetch(`/api/photos/delete/${photoId}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    dispatch(removePhoto(photoId));
    return photoId;
  }
};

const initialState = {}

const photosReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_USER_PHOTOS:
      newState  = {};
      action.photos.forEach((photo) => {newState[photo.id] = photo});
      return newState;
    case ADD_SINGLE_PHOTO:
      newState = Object.assign({}, state);
      newState['photo'] = action.photo;
      return newState;
    case REMOVE_PHOTO:
      newState = Object.assign({}, state);
      delete newState[action.photoId];
      return newState;
    default:
      return state;
  }
};

export default photosReducer;
