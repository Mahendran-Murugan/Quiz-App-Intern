import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const choiceSlice = createSlice({
  name: "ChoiceSlice",
  initialState,
  reducers: {
    insertChoice: (state, action) => {
        
    },
    removeChoice: (state, action) => {
      const newA = [...state.data];
      state.data = newA.filter((_, id) => id !== action.payload);
    },
    resetChoice: (state, action) => {
      state.data = [];
    },
  },
});
