import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Admin } from "./components/Admin";
import { Student } from "./components/Student";
import { Quiz } from "./components/Quiz";
import { ListQuiz } from "./components/ListQuiz";
import { Questions } from "./components/Questions";
import { QuizInstructions } from "./components/QuizInstructions";
import { QuestionContext } from "./Context/QuestionContext";
import { Box } from "@mui/material";
import MyNavBar from "./MUI/MyNavBar";

export const App = () => {
  return (
    <>
      <MyNavBar />
      <Box sx={{ m: 3 }}>
        <QuestionContext>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/student" element={<Student />} />
            <Route path="/quiz" element={<Quiz />}>
              <Route index element={<ListQuiz />} />
              <Route path=":quiz_id">
                <Route index element={<QuizInstructions />} />
                <Route path="questions" element={<Questions />} />
              </Route>
            </Route>
          </Routes>
        </QuestionContext>
      </Box>
    </>
  );
};
