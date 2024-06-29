import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
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
  questCount,
  id,
}) {
  const {
    handleEdit,
    handleDelete,
    count,
    setName,
    questions,
    setCount,
    setQuestions,
  } = UseQuizTableContext();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    e.preventDefault();
    AsyncFunction();
    setName(ConfirmName);
    setCount(questCount);
    setOpen(true);
  };
  const selector = useSelector((state) => state.imageFiles.data);
  const dispatch = useDispatch();
  async function AsyncFunction() {
    dispatch(resetAction());
    const result = (
      await axios.get("http://localhost:8000/api/user/quiz/" + id)
    ).data;
    setQuestions([]);
    result.map((ele) => {
      dispatch(addAction(ele.image));
      
      setQuestions((p) => [
        ...p,
        {
          question: ele.question,
          choices: Object.values(JSON.parse(ele.choices)),
          answer: ele.answer,
          image: ele.image,
          points: ele.points,
        },
      ]);
    });
  }

  const handleClose = () => {
    dispatch(resetAction());
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
                handleDelete(e, id);
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
