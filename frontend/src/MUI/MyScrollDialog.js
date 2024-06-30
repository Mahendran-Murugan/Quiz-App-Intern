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
import axios from "axios";

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

export default function MyScrollDialog({ props }) {
  const { setSubmitted, isSubmitted, open, setOpen, Ref } = UseAnswer();
  const handleClickOpen = () => {
    setOpen(true);
    setSubmitted(true);
    if (props.quizid.QID != 0) {
      console.log(props.quizid);
      axios.put(
        "http://localhost:8000/api/user/update/score/" +
          localStorage.getItem("id"),
        {
          attendedQuestion: props.answed.answed,
          correctAnswer: props.isCorrect.isCorrect,
        }
      );
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
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{props.text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <NavLink to={"/quiz"}>
            <Button onClick={handleClose}>Go to Quiz</Button>
          </NavLink>
          <Button onClick={handleClose}>View Answer</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
