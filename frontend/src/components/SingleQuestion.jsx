import React, { useEffect, useState } from "react";
import { SingleChoice } from "./SingleChoice";
import {
  Alert,
  Box,
  Grid,
  Paper,
  RadioGroup,
  Stack,
  Typography,
  useMediaQuery,
  FormControlLabel,
  Checkbox,
  Radio,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { UseAnswer } from "./Questions";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { FILE_SERVER } from "../data";
import { changeSelected } from "../feature/quizAttendSlice";

export const SingleQuestion = ({ question, index }) => {
  const [choices, setChoice] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [select, setSelect] = useState([]);
  const choiceSelector = useSelector((state) => state.quizAttend.data);
  const choiceDispatch = useDispatch();
  const { setAnswered, setCorrect, isSubmitted, right, setRight } = UseAnswer();

  const isSingleAnswer =
    Object.values(JSON.parse(question.answer)).length === 1;

  useEffect(() => {
    setChoice(Object.values(JSON.parse(question.choices)));
    setAnswer(Object.values(JSON.parse(question.answer)));
    if (isSingleAnswer) {
      setSelect("");
    } else setSelect([]);
  }, []);

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleSelect = (choice) => {
    if (!isSubmitted) {
      if (isSingleAnswer) {
        choiceDispatch(
          changeSelected({
            questionId: question.id,
            choice: choice,
            isSingleAnswer: true,
            answer: answer,
            points: question.points,
          })
        );
        // console.log(choice);
        setSelect(choice);
      } else {
        choiceDispatch(
          changeSelected({
            questionId: question.id,
            choice: choice,
            isSingleAnswer: false,
            answer: answer,
            points: question.points,
          })
        );
        setSelect((prev) => {
          if (prev.includes(choice)) {
            return prev.filter((_, i) => _ !== choice);
          } else {
            return [...prev, choice];
          }
        });
      }
    }
  };

  const renderChoices = () => {
    if (isSingleAnswer) {
      return (
        <>
          {choices.map((choice, idx) => (
            <FormControlLabel
              key={idx}
              disabled={isSubmitted}
              control={<Radio checked={select === choice} />}
              onClick={() => handleSelect(choice)}
              value={choice}
              label={<SingleChoice question={question} choice={choice} />}
            />
          ))}
        </>
      );
    } else {
      return (
        <>
          {choices.map((choice, idx) => (
            <FormControlLabel
              key={idx}
              control={
                <Checkbox
                  disabled={isSubmitted}
                  checked={select.includes(choice)}
                  onChange={() => handleSelect(choice)}
                  value={choice}
                />
              }
              label={<SingleChoice question={question} choice={choice} />}
            />
          ))}
        </>
      );
    }
  };

  return (
    <Paper sx={{ m: 1, p: 2 }} elevation={3}>
      <pre className={!isMobile ? "text-base" : "text-sm"}>{`${index + 1}. ${
        question.question
      }`}</pre>
      {question.image !== "" && question.image !== "none" && (
        <Box
          sx={{
            textAlign: "center",
            mb: 2,
            width: {
              md: "60%",
              lg: "60%",
              xl: "60%",
              sm: "80%",
              xs: "100%",
            },
          }}
        >
          <img
            src={FILE_SERVER + "/" + question.image}
            alt=""
            width={isMobile ? "100%" : "60%"}
            style={{ height: "auto" }}
          />
        </Box>
      )}
      <Typography variant="body1" color="initial">
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={select}
          onChange={handleSelect}
        >
          <Stack spacing={2} mt={2}>
            {renderChoices()}
          </Stack>

          {/* {isSubmitted &&
            (select === question.answer ? (
              <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                Correct Answer
              </Alert>
            ) : (
              select && (
                <Alert icon={<CloseIcon fontSize="inherit" />} severity="error">
                  Wrong Answer.{" "}
                  {!question.isImage
                    ? question.answer
                    : `Image ${choices.indexOf(question.answer) + 1}`}{" "}
                  is Correct Answer
                </Alert>
              )
            ))} */}
        </RadioGroup>
      </Typography>
    </Paper>
  );
};
