import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const imageQuizSlice = createSlice({
  name: "ImageQuiz",
  initialState,
  reducers: {
    addAction: (state, action) => {
      state.data = [...state.data, { qimage: action.payload }];
      // console.log(state.data);
    },
    insertAction: (state, action) => {
      const { index, qimage } = action.payload;
      const newA = [...state.data];
      const changer = { ...state.data[index], qimage: qimage };
      newA.splice(index, 1, changer);
      state.data = newA;
    },
    removeAction: (state, action) => {
      const newA = [...state.data];
      state.data = newA.filter((_, i) => i !== action.payload);
    },
    resetAction: (state) => {
      state.data = [];
    },
  },
});

export const { addAction, insertAction, removeAction, resetAction } =
  imageQuizSlice.actions;
export default imageQuizSlice.reducer;
