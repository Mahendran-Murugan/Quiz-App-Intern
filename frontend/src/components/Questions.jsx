import React, { createContext, useContext, useEffect, useState } from "react";
import { SingleQuestion } from "./SingleQuestion";
import axios from "axios";
import { QuestContext } from "../Context/QuestionContext";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import MyScrollDialog from "../MUI/MyScrollDialog";
const AnswerContext = createContext();
export const Questions = () => {
  const [data, setData] = useState([]);
  const { QID, setQID } = QuestContext();
  const [right, setRight] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/user/quiz/" + QID).then((res) => {
      setData(res.data);
    });
  }, []);

  const [answed, setAnswered] = useState(0);
  const [isCorrect, setCorrect] = useState(0);
  const [isSubmitted, setSubmitted] = useState(false);
  return (
    <AnswerContext.Provider
      value={{
        right,
        setRight,
        setAnswered,
        setCorrect,
        isSubmitted,
        setSubmitted,
      }}
    >
      <Stack sx={{ width: "70%" }}>
        <Stack direction={"row"} spacing={3} sx={{ m: 2 }}>
          <Typography variant="h5" color="initial">
            Questions {data.length}
          </Typography>
          <Typography variant="h5" color="initial">
            Answered {answed}
          </Typography>
          {isSubmitted && (
            <Typography variant="h5" color="initial">
              Correct {isCorrect}
            </Typography>
          )}
        </Stack>
        {data.map((question, index) => {
          return <SingleQuestion index={index} question={question} />;
        })}

        <Stack
          direction={"row"}
          spacing={2}
          sx={{ m: 2 }}
          justifyContent={"center"}
        >
          <MyScrollDialog
            props={{
              name: "Submit",
              title: (
                <Typography variant="h5" color="initial">
                  Score
                </Typography>
              ),
              text: (
                <>
                  <Typography variant="body1" color="initial">
                    Questions : {data.length}
                  </Typography>
                  <Typography variant="body1" color="initial">
                    Answered : {answed}
                  </Typography>
                  <Typography variant="body1" color="initial">
                    Correct : {isCorrect}
                  </Typography>
                  <Typography variant="body1" color="initial">
                    Wrong : {answed - isCorrect}
                  </Typography>
                </>
              ),
            }}
          />
          {isSubmitted && (
            <>
              <NavLink to="/quiz">
                <Button variant="contained">Back to Quiz</Button>
              </NavLink>
            </>
          )}
        </Stack>
      </Stack>
    </AnswerContext.Provider>
  );
};
export const UseAnswer = () => {
  return useContext(AnswerContext);
};
