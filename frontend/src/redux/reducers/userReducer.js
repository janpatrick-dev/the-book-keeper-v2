import { createSlice } from "@reduxjs/toolkit";
import userService from "../../services/users";
import loginService from "../../services/login";
import { setAlert } from "./alertReducer";

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    }
  }
});

export const { setUser } = userSlice.actions;

export const createUser = (newUser) => {
  return async (dispatch) => {
    const user = await userService.create(newUser);
    dispatch(setUser(user));
  };
};

export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(setAlert(null));
    const user = await loginService.login({ 
      email: email.value.toLowerCase(), 
      password: password.value 
    });
    dispatch(setUser(user));
  }
}

export default userSlice.reducer;