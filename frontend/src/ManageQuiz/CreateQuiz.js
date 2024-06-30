import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import Form from "./Form";
import { Provider, useDispatch, useSelector } from "react-redux";
import { resetAction } from "../feature/imageQuizSlice";

const QuizContext = React.createContext();

export default function CreateQuiz({ props }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [count, setCount] = React.useState(null);
  const [duration, setDuration] = React.useState(null);
  const [questions, setQuestions] = React.useState([]);
  const handleClickOpen = (e) => {
    e.preventDefault();
    setQuestions([]);
    setOpen(true);
    setName("");
    setCount(0);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  const selector = useSelector((state) => state.imageFiles.data);

  const dummy = ``;
  const dispatch = useDispatch();
  const handleCreate = async (e) => {
    try {
      e.preventDefault();
      console.log(selector);
      const uploadPromises = selector.map(async (select, index) => {
        const formData = new FormData();
        // console.log(select.qimage);
        formData.append("qimage", select.qimage);

        // console.log(formData);
        const response = await axios.post(
          "http://localhost:4000/api/post/image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const file =
          response.data.file != "error" ? response.data.file.filename : "none";
        setQuestions((prevQuestions) => {
          const newQuestions = [...prevQuestions];
          newQuestions[index] = {
            ...prevQuestions[index],
            image: file,
          };
          questions[index].image = file;
          return newQuestions;
        });
      });

      await Promise.all(uploadPromises).then((resolver) => {
        const response = axios.post(
          "http://localhost:8000/api/admin/quiz/create",
          {
            name: name,
            count: count,
            questions: questions,
            duration: duration,
          }
        );
      });

      setOpen(false);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
    dispatch(resetAction());
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={(e) => handleClickOpen(e)}>
        Create
      </Button>
      <QuizContext.Provider
        value={{
          setName,
          setCount,
          count,
          setQuestions,
          duration,
          setDuration,
          questions,
        }}
      >
        <Dialog
          open={open}
          onClose={(e) => handleClose(e)}
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
            <Button onClick={(e) => handleClose(e)}>Close</Button>
            {count > 0 && name != "" && (
              <Button type="submit" onClick={(e) => handleCreate(e)}>
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
