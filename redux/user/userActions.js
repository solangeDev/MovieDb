import userTypes from "./userTypes";

//Action Creator
export const setUser = (data) => ({
  type: userTypes.SET_USER,
  payload: data,
});

export const cleanUser = () => ({
  type: userTypes.CLEAN_USER,
  payload: [],
});
