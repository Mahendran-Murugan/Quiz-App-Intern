import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { USER_SERVER } from "../data";
import { UseQuizTableContext } from "./MyTable";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addAction, resetAction } from "../feature/imageQuizSlice";

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

export default function Conformation({
  header,
  color,
  body,
  left,
  right,
  button,
  ConfirmName,
  attemptCount,
  questCount,
  id,
  dura,
}) {
  const {
    handleEdit,
    handleDelete,
    count,
    setName,
    questions,
    setCount,
    setDuration,
    attempt,
    setAttempt,
    setQuestions,
  } = UseQuizTableContext();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    e.preventDefault();
    AsyncFunction();
    setName(ConfirmName);
    setDuration(dura);
    setCount(questCount);
    setAttempt(attemptCount);
    console.log(attemptCount);
    setOpen(true);
  };
  const selector = useSelector((state) => state.imageFiles.data);
  const dispatch = useDispatch();
  async function AsyncFunction() {
    dispatch(resetAction());
    const result = (await axios.get(USER_SERVER + "/quiz/" + id)).data;
    setQuestions([]);

    result &&
      result.map((ele, i) => {
        dispatch(addAction(ele.image));
        const ch = Object.values(JSON.parse(ele.choices));
        const an = Object.values(JSON.parse(ele.answer));

        if (ele.isImage) {
          an.map((elem, ind) => {
            an[ind] = ch.indexOf(elem);
          });
        }
        console.log(an);
        setQuestions((p) => [
          ...p,
          {
            id: ele.id,
            question: ele.question,
            choices: ch,
            answer: an,
            image: ele.image,
            points: ele.points,
            isImage: ele.isImage,
          },
        ]);
      });
  }

  const handleClose = () => {
    dispatch(resetAction());
    setName("");
    setDuration(null);
    setCount(null);
    setAttempt(null);
    setQuestions([]);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color={color}
        onClick={(e) => handleClickOpen(e)}
      >
        {button}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {header}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{body}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            {left}
          </Button>
          <Button
            onClick={(e) => {
              if (right.toLowerCase() == "save") {
                handleEdit(e, id);
              }
              if (right.toLowerCase() == "delete") handleDelete(e, id);
              handleClose();
            }}
          >
            {right}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
