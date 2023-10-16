import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    severity:"",
    message:""
};

const responseStateReducer = createSlice({
  name: 'responseStateReducer',
  initialState,
  reducers: {
    setResponseState: (state, action) => {
      state.severity = action.payload.severity;
      state.message = action.payload.message;
    },
  },
});

export const {setResponseState} = responseStateReducer.actions;

export default responseStateReducer.reducer;