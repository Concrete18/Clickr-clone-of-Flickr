const SET_PAGE_OWNER = 'user/SetPageOwner';

const addPageOwner = (owner) => {
  return {
    type: SET_PAGE_OWNER,
    owner
  };
};

export const getPageOwner = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  if (response.ok) {
    const user = await response.json();
    dispatch(addPageOwner(user));
  }
}

const initialState = {}

const ownerReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
      case SET_PAGE_OWNER:
      newState  = {};
      newState['ownerInfo'] = action.owner;
      return newState;
    default:
      return state;
  }
};

export default ownerReducer;
