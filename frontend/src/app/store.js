import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "../feature/imageQuizSlice";
import quizAttendReducer from "../feature/quizAttendSlice";
export const store = configureStore({
  reducer: {
    imageFiles: imageReducer,
    quizAttend: quizAttendReducer,
  },
});
