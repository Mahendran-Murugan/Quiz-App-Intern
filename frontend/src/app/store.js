import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "../feature/imageQuizSlice";
import quizAttendReducer from "../feature/quizAttendSlice";
import registerReducer from "../feature/registerSlice";
export const store = configureStore({
  reducer: {
    imageFiles: imageReducer,
    quizAttend: quizAttendReducer,
    register: registerReducer,
  },
});
