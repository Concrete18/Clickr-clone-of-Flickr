import { csrfFetch } from './csrf';

const ADD_PHOTO = 'photos/AddPhoto';
const REMOVE_PHOTO = 'photos/RemovePhoto';

const addPhoto = (photos, userId) => {
  return {
    type: ADD_PHOTO,
    payload: userId,
    photos
  };
};

const removePhoto = () => {
  return {
    type: REMOVE_PHOTO,
  };
};

export const getUserPhotos = (userId) => async (dispatch) => {
  const response = await fetch(`/api/photos/users/${userId}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  if (response.ok) {
    const photos = await response.json();
    dispatch(addPhoto(photos, userId));
  }
}

// export const uploadPhoto = (photo) => async (dispatch) => {
//   const { title, albumId, description } = photo;
//   const response = await csrfFetch("/api/users", {
//     method: "POST",
//     body: JSON.stringify({
//       title,
//       albumId,
//       description,
//     }),
//   });
//   const data = await response.json();
//   dispatch(setUser(data.user));
//   return response;
// };

const initialState = { photos: null };

const photosReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_PHOTO:
      newState = Object.assign({}, state);
      newState[action.payload] = action.photos;
      return newState;
    case REMOVE_PHOTO:
      newState = Object.assign({}, state);
      newState[action.payload] = null;
      return newState;
    default:
      return state;
  }
};

export default photosReducer;
