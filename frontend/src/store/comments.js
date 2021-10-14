import { csrfFetch } from './csrf';

const ADD_COMMENT = 'comments/AddComment';
const ADD_ONE_COMMENT = 'comments/AddOneComment';
const REMOVE_COMMENT = 'comments/RemoveComment';

const AddComment = (comments, userId) => {
  return {
    type: ADD_COMMENT,
    payload: userId,
    comments
  };
};

const AddOneComment = (comment, userId) => {
  return {
    type: ADD_ONE_COMMENT,
    payload: userId,
    comment
  };
};

const RemoveComment = (comment) => {
  return {
    type: REMOVE_COMMENT,
    // payload: userId,
    comment
  };
};

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

export const createComment = (data) => async (dispatch) => {
  console.log(data);
  const response = await csrfFetch(`/api/comments/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (response.ok) {
    const comment = await response.json();
    dispatch(AddComment(comment));
    return comment;
  }
};

export const updateComment = (data) => async (dispatch) => {
  const response = await fetch(`/api/comments/update`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const comment = await response.json();
    dispatch(AddOneComment(comment));
    return comment;
  }
};

// export const deleteComment = (data) => async (dispatch) => {
//   const response = await fetch(`/api/comments/update`, {
//     method: 'put',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   });

//   if (response.ok) {
//     const comment = await response.json();
//     dispatch(AddOneComment(comment));
//     return comment;
//   }
// };

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
    case ADD_ONE_COMMENT:
      // WIP
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;
