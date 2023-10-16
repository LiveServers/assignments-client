import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

const testReducer = createSlice({
  name: 'testReducer',
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const {setOpen} = testReducer.actions;

export default testReducer.reducer;