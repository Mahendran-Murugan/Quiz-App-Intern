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

  const handleClickOpen = () => {
    setCount(questCount);
    setName(ConfirmName);
    setOpen(true);
  };
  async function AsyncFunction() {
    const result = (
      await axios.get("http://localhost:8000/api/user/quiz/" + id)
    ).data;

    setQuestions([]);
    result.map((ele) => {
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

  React.useEffect(() => {
    setName(ConfirmName);
    setCount(questCount);
    AsyncFunction();
  }, []);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color={color} onClick={handleClickOpen}>
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
            autoFocus
            onClick={() => {
              handleClose();
            }}
          >
            {left}
          </Button>
          <Button
            onClick={() => {
              if (right.toLowerCase() == "save") handleEdit(id);
              if (right.toLowerCase() == "delete") handleDelete(id);
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
