import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { QuestContext } from "../Context/QuestionContext";
import { UseAnswer } from "../components/Questions";
import { NavLink } from "react-router-dom";
import { USER_SERVER } from "../data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { resetAll } from "../feature/quizAttendSlice";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function arraysEqualSet(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  if (set1.size !== set2.size) return false;
  for (const item of set1) {
    if (!set2.has(item)) return false;
  }
  return true;
}

export default function MyScrollDialog({ props }) {
  const { setSubmitted, isSubmitted, open, setOpen, Ref } = UseAnswer();
  const selector = useSelector((s) => s.quizAttend.data);
  const [attend, setAttended] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const dispatcher = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
    setAttended(selector.length);
    if (selector) {
      selector.map((ele) => {
        if (arraysEqualSet(ele.selected, ele.answer)) {
          setCorrect((p) => p + 1);
        }
      });
    }
    dispatcher(resetAll());
    setSubmitted(true);
    if (props.quizid.QID != 0) {
      console.log(props.quizid);
      axios.put(USER_SERVER + "/update/score/" + localStorage.getItem("id"), {
        attendedQuestion: props.answed.answed,
        correctAnswer: props.isCorrect.isCorrect,
      });
    }
    console.log(props.isCorrect, props.answed);
    clearInterval(Ref.current);
    Ref.current = null;
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {!isSubmitted && (
        <Button variant="contained" onClick={handleClickOpen}>
          {props.name}
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          <>
            <Typography variant="body1" color="initial">
              Questions : {props.question}
            </Typography>
            <Typography variant="body1" color="initial">
              Answered : {attend}
            </Typography>
            <Typography variant="body1" color="green">
              Correct : {correct}
            </Typography>
            <Typography variant="body1" color="red">
              Wrong : {attend - correct}
            </Typography>
          </>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{props.text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <NavLink to={"/quiz"}>
            <Button onClick={handleClose}>Go to Quiz</Button>
          </NavLink>
          <Button onClick={handleClose}>View My Answer</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
