import { createSlice } from "@reduxjs/toolkit";
import userService from "../../services/users";

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

export default userSlice.reducer;