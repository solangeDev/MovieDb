import userTypes from "./userTypes";

const initialState = {
  account: {},
  expires_at: "",
  request_token: "",
  session_id: "",
};

const favoriteMoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.SET_USER:
      return { ...state, ...action.payload };
    case userTypes.CLEAN_USER:
      return {
        ...state,
        account: {},
        expires_at: "",
        request_token: "",
        session_id: "",
      };
    default:
      return state;
  }
};

export default favoriteMoviesReducer;
