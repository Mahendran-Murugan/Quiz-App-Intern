import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import Form from "./Form";
import { ADMIN_SERVER, FILE_SERVER } from "../data";
import { Provider, useDispatch, useSelector } from "react-redux";
import { resetAction } from "../feature/imageQuizSlice";
import MyDialog from "./MyDialog";

const QuizContext = React.createContext();

export default function CreateQuiz({ props }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [isError, setError] = React.useState(false);
  const [count, setCount] = React.useState(null);
  const [duration, setDuration] = React.useState(null);
  const [questions, setQuestions] = React.useState([]);
  const [attempt, setAttempt] = React.useState(null);
  const handleClickOpen = (e) => {
    e.preventDefault();
    setQuestions([]);
    setOpen(true);
    setName("");
    setCount(0);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setName("");
    setCount(null);
    setDuration(null);
    setQuestions([]);
    setAttempt(null);
    setOpen(false);
  };
  const selector = useSelector((state) => state.imageFiles.data);

  const dispatch = useDispatch();
  const handleCreate = async (e) => {
    // console.log("before :", questions);

    if (
      !name ||
      !count ||
      !duration ||
      !attempt ||
      isNaN(duration) ||
      isNaN(attempt) ||
      attempt <= 0 ||
      duration <= 0
    ) {
      // console.log("Enter Valid Quiz");
      // console.log(isError);
      setError(true);
      return;
    }
    try {
      questions.map((quest) => {
        if (
          !quest.question ||
          quest.choices.length <= 0 ||
          !quest.answer ||
          !quest.points ||
          quest.points < 0 ||
          quest.answer.length <= 0 ||
          isNaN(quest.points)
        ) {
          // console.log("Enter Valid Question");
          throw "Enter valid Question and fill the empty block";
        }
      });
    } catch (ex) {
      setError(true);
      return;
    }
    try {
      e.preventDefault();
      const uploadPromises = selector.map(async (select, index) => {
        const formData = new FormData();
        // console.log(select.qimage);
        // console.log(select);
        formData.append("qimage", select.qimage);

        // // console.log(formData);
        const response = await axios.post(
          `${FILE_SERVER}/api/post/image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const file =
          response.data.file != "error" ? response.data.file.filename : "none";
        // console.log(file);
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

      await Promise.all(
        questions.map(async (quest) => {
          if (quest.isImage) {
            await Promise.all(
              quest.choices.map(async (ch, j) => {
                const newFormData = new FormData();
                // console.log(ch);
                newFormData.append("qimage", ch); // Assuming ch is the file

                try {
                  const response = await axios.post(
                    `${FILE_SERVER}/api/post/image`,
                    newFormData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );
                  // console.log(response);
                  quest.choices[j] =
                    response.data.file.filename !== "error"
                      ? response.data.file.filename
                      : "none";
                } catch (err) {
                  console.error("Error uploading image:", err);
                  quest.choices[j] = "none";
                }
              })
            );
            quest.answer = quest.choices[quest.answer];
          }
        })
      );

      // console.log(questions);

      await Promise.all(uploadPromises).then((resolver) => {
        const response = axios.post(ADMIN_SERVER + "/quiz/create", {
          name: name,
          count: count,
          attempt: attempt,
          questions: questions,
          duration: duration,
        });
      });
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
    handleClose(e);
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
          attempt,
          setAttempt,
          setQuestions,
          duration,
          setDuration,
          questions,
        }}
      >
        {isError && (
          <MyDialog
            setError={setError}
            body={"Enter Valid Quiz and Question"}
            title={"Please fill the form"}
          />
        )}
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
