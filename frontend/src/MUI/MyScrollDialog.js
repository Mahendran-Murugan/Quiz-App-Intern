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
  const [open, setOpen] = React.useState(false);
  const { setSubmitted } = UseAnswer();
  const handleClickOpen = () => {
    setOpen(true);
    setSubmitted(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        {props.name}
      </Button>
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
