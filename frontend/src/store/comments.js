import { csrfFetch } from './csrf';

const ADD_COMMENTS = 'comments/AddComments';
const ADD_ONE_COMMENT = 'comments/AddOneComment';
const REMOVE_COMMENT = 'comments/RemoveComment';

const AddComments = (comments) => {
  return {
    type: ADD_COMMENTS,
    comments
  };
};

const AddOneComment = (comment) => {
  return {
    type: ADD_ONE_COMMENT,
    comment
  };
};``

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
    dispatch(AddComments(comments, photoId));
  }
}

export const createComment = (data) => async (dispatch) => {
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
    body: JSON.stringify({ commentData: data })
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
    case ADD_COMMENTS:
      newState = {};
      action.comments.forEach((comment) => {newState[comment.id] = comment});
      return newState;
    case ADD_ONE_COMMENT:
      newState = Object.assign({}, state);
      newState[action.comment.id] = action.comment;
      return newState;
    case REMOVE_COMMENT:
      newState = Object.assign({}, state);
      delete newState[action.commentId];
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;
