import { csrfFetch } from './csrf';

const ADD_USER_PHOTOS = 'photos/addUserPhotos';
const ADD_SINGLE_PHOTO = 'photos/addSinglePhoto';
const UPLOAD_PHOTO = 'photos/uploadPhoto'
const REMOVE_PHOTO = 'photos/RemovePhoto';

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

// const uploadPhoto = (photo) => {
//   return {
//     type: UPLOAD_PHOTO,
//     photo
//   };
// };

const removePhoto = (photoId) => {
  return {
    type: REMOVE_PHOTO,
    photoId
  };
};

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

export const uploadPhoto = (photo) => async (dispatch) => {
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
  dispatch(uploadPhoto(data.user));
  return response;
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
      // newState[action.payload] = action.photos;
      return newState;
    case ADD_SINGLE_PHOTO:
      newState = Object.assign({}, state);
      newState.photo[action.payload] = action.photo;
      return newState;
    case UPLOAD_PHOTO:
      newState = Object.assign({}, state);
      newState[action.photo.id] = action.photo;
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
