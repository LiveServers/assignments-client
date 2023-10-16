import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: "",
};

const setTokenReducer = createSlice({
  name: 'setTokenReducer',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {setToken} = setTokenReducer.actions;

export default setTokenReducer.reducer;