import React, { createContext, useContext, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { UseQuiz } from "./CreateQuiz";
import Choices from "./Choices";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Form() {
  const { setName, name, count, setCount, setQuestions, questions } = UseQuiz();
  const childRef = useRef();
  const handleRemove = (index) => {
    setQuestions((prevItems) => {
      const newItems = prevItems.filter((_, i) => i !== index);
      prevItems.choices = [];
      setCount(newItems.length); // Update count based on the new length
      return newItems;
    });
    if (childRef.current) {
      childRef.current.handleChoiceDelete();
    }
  };
  const handleCount = () => {
    setCount((p) => p + 1);

    setQuestions((p) => [
      ...p,
      {
        question: "",
        choices: [""],
        answer: "",
        image: "",
        points: 0,
      },
    ]);
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom></Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Quiz name"
            fullWidth
            onChange={(e) => setName(e.target.value)}
            autoComplete="given-name"
          />
        </Grid>

        {questions.map((question, index) => {
          return (
            <>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Question {index + 1}
                  <Button
                    color="error"
                    onClick={() => {
                      handleRemove(index);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </Typography>
                <TextField
                  required
                  id="address1"
                  name="address1"
                  label="Question"
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
                  autoComplete="shipping address-line1"
                />
              </Grid>
              <ChoiceContext.Provider value={{ question }}>
                <Choices myChoices={[""]} count={1} />
              </ChoiceContext.Provider>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="answer"
                  name="answer"
                  onChange={(e) => {
                    setQuestions((p) => {
                      const newA = [...p];
                      newA.splice(index, 1, {
                        ...question,
                        answer: e.target.value,
                      });
                      return newA;
                    });
                    question.answer = e.target.value;
                  }}
                  value={question.answer}
                  required
                  label="Answer"
                  fullWidth
                  autoComplete="Answer"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="image"
                  name="image"
                  onChange={(e) => {
                    setQuestions((p) => {
                      const newA = [...p];
                      newA.splice(index, 1, {
                        ...question,
                        image: e.target.value,
                      });
                      return newA;
                    });
                    question.image = e.target.value;
                  }}
                  value={question.image}
                  required
                  label="Image"
                  fullWidth
                  autoComplete="Image"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
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
                  autoComplete="points"
                />
              </Grid>
            </>
          );
        })}

        <Grid item xs={12} sm={8}>
          <Button onClick={() => handleCount()}>Add Question</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export const ChoiceContext = React.createContext();

export const UseChoiceContext = () => {
  return useContext(ChoiceContext);
};
