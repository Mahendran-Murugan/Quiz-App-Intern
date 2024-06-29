import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: [],
  answer: [],
};

export const quizAttendSlice = createSlice({
  name: "quizAttendSlicer",
  initialState,
  reducers: {
    setSelected: (state) => {
      const array = [...state.answer, ""];
      state.answer = array;
    },
    changeSelected: (state, action) => {
      const { index, value } = action.payload;
      const newArray = [...state.selected];
      newArray.splice(index, 1, value);
      state.selected = newArray;
    },
    addAnswer: (state, action) => {
      const newArray = [...state.answer, action.payload];
      state.answer = newArray;
    },
    resetAll: (state) => {
      state.selected = [];
      state.answer = [];
    },
  },
});

export const { setSelected, changeSelected, resetAll, addAnswer } =
  quizAttendSlice.actions;

export default quizAttendSlice.reducer;
