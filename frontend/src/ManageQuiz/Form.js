import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { UseQuiz } from "./CreateQuiz";

export default function Form() {
  const { setName, name, count, setCount, setQuestions, questions } = UseQuiz();

  const handleCount = () => {
    setCount((p) => p + 1);
    
      setQuestions((p) => [
        ...p,
        {
          question: "",
          ch1: "",
          ch2: "",
          ch3: "",
          ch4: "",
          answer: "",
          image: "",
          points: "",
        },
      ]);
    
    console.log(questions);
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
                </Typography>
                <TextField
                  required
                  id="address1"
                  name="address1"
                  label="Question"
                  fullWidth
                  onChange={(e) => {
                    question.question = e.target.value;
                  }}
                  autoComplete="shipping address-line1"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="Choice 1"
                  fullWidth
                  onChange={(e) => {
                    question.ch1 = e.target.value;
                  }}
                  autoComplete="shipping address-level2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="state"
                  name="state"
                  onChange={(e) => {
                    question.ch2 = e.target.value;
                  }}
                  label="Choice 2"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="zip"
                  name="zip"
                  onChange={(e) => {
                    question.ch3 = e.target.value;
                  }}
                  label="Choice 3"
                  fullWidth
                  autoComplete="shipping postal-code"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="country"
                  name="country"
                  onChange={(e) => {
                    question.ch4 = e.target.value;
                  }}
                  required
                  label="Choice 4"
                  fullWidth
                  autoComplete="shipping country"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="answer"
                  name="answer"
                  onChange={(e) => {
                    question.answer = e.target.value;
                  }}
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
                    question.image = e.target.value;
                  }}
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
                    question.points = e.target.value;
                  }}
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
