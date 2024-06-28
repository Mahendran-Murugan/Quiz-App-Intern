import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import Form from "./Form";

const QuizContext = React.createContext();

export default function CreateQuiz({ props }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [count, setCount] = React.useState(0);
  const [questions, setQuestions] = React.useState([]);
  const handleClickOpen = () => {
    setQuestions([]);
    setOpen(true);
    setName("");
    setCount(0);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCreate = () => {
    console.log(questions);
    axios.post("http://localhost:8000/api/admin/quiz/create", {
      name: name,
      count: count,
      questions: questions,
    });
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Button   variant="contained" onClick={handleClickOpen}>
        Create
      </Button>
      <QuizContext.Provider
        value={{ setName, setCount, count, setQuestions, questions }}
      >
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Create Quiz</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Form></Form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            {count > 0 && name != "" && (
              <Button type="submit" onClick={handleCreate} autoFocus>
                Create
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </QuizContext.Provider>
    </React.Fragment>
  );
}

export const UseQuiz = () => {
  return React.useContext(QuizContext);
};
