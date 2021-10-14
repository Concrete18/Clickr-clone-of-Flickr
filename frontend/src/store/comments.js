import { csrfFetch } from './csrf';

const ADD_COMMENT = 'comments/AddComment';
const ADD_ONE_COMMENT = 'comments/AddOneComment';
const REMOVE_COMMENT = 'comments/RemoveComment';

const AddComment = (comments) => {
  return {
    type: ADD_COMMENT,
    comments
  };
};

const AddOneComment = (comment) => {
  return {
    type: ADD_ONE_COMMENT,
    comment
  };
};

const RemoveComment = (commentId) => {
  return {
    type: REMOVE_COMMENT,
    commentId
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
    dispatch(AddOneComment(comment));
    return comment;
  }
};

export const updateComment = (data, commentId) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/update/${commentId}`, {
    method: 'PUT',
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

export const deleteComment = (commentId) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/delete/${commentId}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    dispatch(RemoveComment(commentId));
    return commentId;
  }
};

const initialState = {};

const commentsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_COMMENT:
      newState = {}
      action.comments.forEach((comment) => {newState[comment.id] = comment})
      return newState;
    case REMOVE_COMMENT:
      newState = Object.assign({}, state);
      delete newState[action.commentId]
      return newState;
    case ADD_ONE_COMMENT:
      newState = Object.assign({}, state);
      newState[action.comment.id] = action.comment
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;
