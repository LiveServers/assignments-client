import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  answer: "",
  wordAnswer: []
};

const chatgptReducer = createSlice({
  name: 'chatgptReducer',
  initialState,
  reducers: {
    setAnswer: (state, action) => {
      state.answer = action.payload;
    },
    setWordAnswer: (state, action) => {
      state.wordAnswer = action.payload;
    }
  },
});

export const {setAnswer, setWordAnswer} = chatgptReducer.actions;

export default chatgptReducer.reducer;