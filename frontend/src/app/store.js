import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "../feature/imageQuizSlice";
export const store = configureStore({
  reducer: {
    imageFiles: imageReducer,
  },
});
