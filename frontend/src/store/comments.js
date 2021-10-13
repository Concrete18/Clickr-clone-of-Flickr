import { csrfFetch } from './csrf';

const ADD_COMMENT = 'comments/AddComment';
const REMOVE_COMMENT = 'comments/RemoveComment';

const AddComment = (comments, userId) => {
  return {
    type: ADD_COMMENT,
    payload: userId,
    comments
  };
};

// const RemoveComment = () => {
//   return {
//     type: COMMENT,
//   };
// };

export const getComments = (photoId) => async (dispatch) => {
  const response = await fetch(`/api/comments/photo/${photoId}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  if (response.ok) {
    const comments = await response.json();
    dispatch(AddComment(comments, photoId));
  }
}

const initialState = { comments:{} };

const commentsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_COMMENT:
      newState = Object.assign({}, state);
      newState[action.payload] = action.comments;
      return newState;
    case REMOVE_COMMENT:
      newState = Object.assign({}, state);
      newState[action.payload] = null;
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;
