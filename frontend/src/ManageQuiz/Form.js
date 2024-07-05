import React, { createContext, useContext, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
  duration,
} from "@mui/material";
import { UseQuiz } from "./CreateQuiz";
import Choices from "./Choices";
import DeleteIcon from "@mui/icons-material/Delete";
import Uploader from "../MUI/Uploader";
import { useSelector, useDispatch } from "react-redux";
import { addAction, removeAction } from "../feature/imageQuizSlice";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

export default function Form() {
  const {
    duration,
    setDuration,
    setName,
    name,
    count,
    setCount,
    attempt,
    setAttempt,
    setQuestions,
    questions,
  } = UseQuiz();
  const questionFiles = useSelector((state) => state.imageFiles.data);
  const questionFilesDispatcher = useDispatch();
  const childRef = useRef();
  const handleRemove = (e, index) => {
    e.preventDefault();
    questionFilesDispatcher(removeAction(index));
    setQuestions((prevItems) => {
      const newItems = prevItems.filter((_, i) => i !== index);
      prevItems.choices = [];
      setCount(newItems.length);

      return newItems;
    });
    // console.log(questions);
    if (childRef.current) {
      childRef.current.handleChoiceDelete();
    }
  };
  const handleCount = (e) => {
    e.preventDefault();
    questionFilesDispatcher(addAction(null));

    setCount((p) => p + 1);

    setQuestions((p) => [
      ...p,
      {
        question: "",
        choices: [""],
        answer: [],
        image: "",
        points: null,
        isImage: false,
      },
    ]);
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom></Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="firstName"
            name="firstName"
            label="Quiz name"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="duration"
            name="duration"
            label="Duration in Minutes"
            fullWidth
            type="number"
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="attempt"
            name="attempt"
            label="Attempt"
            fullWidth
            type="number"
            onChange={(e) => setAttempt(e.target.value)}
            value={attempt}
          />
        </Grid>

        {questions.map((question, index) => {
          return (
            <>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Question {index + 1}
                  <IconButton
                    color="error"
                    onClick={(e) => {
                      handleRemove(e, index);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Typography>

                <Uploader index={index} />

                <TextField
                  id="address1"
                  name="address1"
                  label="Question"
                  multiline
                  fullWidth
                  onChange={(e) => {
                    setQuestions((p) => {
                      const newA = [...p];
                      newA.splice(index, 1, {
                        ...question,
                        question: e.target.value,
                      });
                      return newA;
                    });
                    question.question = e.target.value;
                  }}
                  value={question.question}
                />
              </Grid>
              <ChoiceContext.Provider value={{ question }}>
                <Choices
                  src={null}
                  myAnswer={question.answer}
                  myChoices={[""]}
                  count={1}
                />
              </ChoiceContext.Provider>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="points"
                  name="points"
                  type="number"
                  minRows={"0"}
                  onChange={(e) => {
                    setQuestions((p) => {
                      const newA = [...p];
                      newA.splice(index, 1, {
                        ...question,
                        points: e.target.value,
                      });
                      return newA;
                    });
                  }}
                  value={question.points}
                  InputProps={{ inputProps: { min: 0 } }}
                  label="Points"
                  fullWidth
                />
              </Grid>
            </>
          );
        })}

        <Grid item xs={12} sm={8}>
          <Button onClick={(e) => handleCount(e)}>Add Question</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export const ChoiceContext = React.createContext();

export const UseChoiceContext = () => {
  return useContext(ChoiceContext);
};
