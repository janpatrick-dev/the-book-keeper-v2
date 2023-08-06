import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: '',
  success: true
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setMessage(state, action) {
      state.message = action.payload.message;
      state.success = action.payload.success;
      return state;
    }
  }
});

export const { setMessage } = alertSlice.actions;

let alertTimeout = null;

export const setAlert = (message, success=true) => {
  return (dispatch) => {
    clearTimeout(alertTimeout);
    
    dispatch(setMessage({ message, success }));
    alertTimeout = setTimeout(() => {
      dispatch(setMessage(initialState));
    }, 5000);
  }
};

export default alertSlice.reducer;