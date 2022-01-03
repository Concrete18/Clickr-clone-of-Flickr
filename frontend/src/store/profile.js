import { csrfFetch } from './csrf';

const LOAD = "profiles/LOAD";
const ADD = "profiles/ADD";
const REMOVE = "profiles/REMOVE";

const load = (list) => ({
  type: LOAD,
  list,
});

const add = (profile) => ({
  type: ADD,
  profile,
});

// const remove = (profileId) => ({
//   type: REMOVE,
//   profileId,
// });

export const getProfile = (userId) => async (dispatch) => {
  const response = await fetch(`/api/profiles/user/${userId}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  if (response.ok) {
    const profile = await response.json();
    dispatch(load(profile));
    return profile
  }
}

export const editProfile = (formData) => async (dispatch) => {
  const response = await csrfFetch(`/api/profiles/update/${formData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (response.ok) {
    const profile = await response.json();
    dispatch(add(profile));
  }
}

const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const newState = {};
      for (let profile of action.list) {
        newState[profile.id] = profile;
      }
      return newState;
    case ADD:
      return { ...state, [action.profile.id]: action.profile };
    case REMOVE:
      const newProfiles = { ...state };
      delete newProfiles[action.profileId];
      return newProfiles;
    default:
      return state;
  }
};

export default profileReducer;
