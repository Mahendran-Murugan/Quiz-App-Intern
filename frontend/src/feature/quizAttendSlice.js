import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const quizAttendSlice = createSlice({
  name: "quizAttendSlicer",
  initialState,
  reducers: {
    changeSelected: (state, action) => {
      const { questionId, choice, isSingleAnswer, answer, points } =
        action.payload;
      // console.log(questionId, choice, isSingleAnswer, answer);

      const questionIndex = state.data.findIndex(
        (item) => item.questionId === questionId
      );

      if (isSingleAnswer) {
        if (questionIndex !== -1) {
          state.data[questionIndex].selected = [choice];
          state.data = [...state.data];
        } else {
          const newA = [...state.data];
          newA.push({
            questionId,
            selected: [choice],
            answer: answer,
            points: points,
          });
          state.data = [...newA];
        }
        console.log(state.data);
      } else {
        if (questionIndex !== -1) {
          const selectedChoices = state.data[questionIndex].selected;
          const choiceIndex = selectedChoices.indexOf(choice);
          if (choiceIndex !== -1) {
            selectedChoices.splice(choiceIndex, 1);
          } else {
            selectedChoices.push(choice);
          }
          state.data[questionIndex].selected = selectedChoices;
          state.data = [...state.data];
        } else {
          const newA = [...state.data];
          newA.push({
            questionId,
            selected: [choice],
            answer: answer,
            points: points,
          });
          state.data = [...newA];
        }
      }
    },
    addAnswer: (state, action) => {},
    resetAll: (state) => {
      state.data = [];
    },
  },
});

export const { changeSelected, resetAll, addAnswer } = quizAttendSlice.actions;

export default quizAttendSlice.reducer;
