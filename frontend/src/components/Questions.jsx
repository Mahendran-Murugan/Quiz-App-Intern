import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "../feature/quizAttendSlice";
const AnswerContext = createContext();
export const Questions = () => {
  const [data, setData] = useState([]);
  const { QID, setQID, min, setMin } = QuestContext();
  const [right, setRight] = useState([]);

  const selectedSubscribe = useSelector((state) => state.quizAttend.selected);
  const selectedDispatcher = useDispatch();
  useEffect(() => {
    axios.get("http://localhost:8000/api/user/quiz/" + QID).then((res) => {
      setData(res.data);
      res.data.map((e) => {
        selectedDispatcher(setSelected());
      });
    });
  }, []);
  const [answed, setAnswered] = useState(0);
  const [isCorrect, setCorrect] = useState(0);
  const [isSubmitted, setSubmitted] = useState(false);
  const [timer, setTimer] = useState("00:00:00");
  const Ref = useRef(null);
  const [open, setOpen] = useState(false);
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    if (total === 0) {
      setOpen(true);
      setSubmitted(true);
      clearInterval(Ref.current);
      Ref.current = null;
    }
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    // console.log("Start");
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    const time = new Date(min * 60 * 1000).toISOString().substr(11, 8);
    setTimer(time);
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + min * 60);
    // console.log("DeadTime " + deadline);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
    return () => {
      if (Ref.current) clearInterval(Ref.current);
    };
  }, []);

  return (
    <AnswerContext.Provider
      value={{
        right,
        setRight,
        setAnswered,
        setCorrect,
        isSubmitted,
        setSubmitted,
        open,
        setOpen,
        Ref,
      }}
    >
      <Stack sx={{ width: "70%" }}>
        <Stack
          direction={"row"}
          spacing={3}
          sx={{ justifyContent: "space-between", m: 3 }}
        >
          <Typography variant="h5" color="initial">
            Questions {data.length}
          </Typography>
          <Typography variant="h5" color="initial">
            Answered {answed}
          </Typography>
          <Typography variant="h5" color="initial">
            {timer}
          </Typography>
          {isSubmitted && (
            <Typography variant="h5" color="initial">
              Correct {isCorrect}
            </Typography>
          )}
        </Stack>
        {data.map((question, index) => {
          return (
            <SingleQuestion key={index} index={index} question={question} />
          );
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
                  <Typography variant="body1" color="green">
                    Correct : {isCorrect}
                  </Typography>
                  <Typography variant="body1" color="red">
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
