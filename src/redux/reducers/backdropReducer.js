import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  open: false,
  isSignedIn: false,
  userName: "",
};

const backdropReducer = createSlice({
  name: 'backdropReducer',
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setUserData: (state, action) => {
      state.isSignedIn = action.isSignedIn;
      state.userName = action.userName;
    },
  },
});

export const {setOpen, setUserData} = backdropReducer.actions;

export default backdropReducer.reducer;