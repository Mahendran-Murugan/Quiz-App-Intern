import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Conformation from "./Conformation";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import Choices from "./Choices";
import { ChoiceContext } from "./Form";
import Uploader from "../MUI/Uploader";
import { useDispatch, useSelector } from "react-redux";
import {
  addAction,
  removeAction,
  resetAction,
} from "../feature/imageQuizSlice";
import { ADMIN_SERVER } from '../data'
const MyQuizTableContext = React.createContext();
export default function MyTable({ rows }) {
  const [name, setName] = React.useState("");
  const [count, setCount] = React.useState(0);
  const [questions, setQuestions] = React.useState([]);
  const [duration, setDuration] = React.useState(null);
  const [attempt, setAttempt] = React.useState(null);
  const selector = useSelector((state) => state.imageFiles.data);

  const handleDelete = (e, id) => {
    e.preventDefault();
    axios.delete(ADMIN_SERVER + "/quiz/delete/" + id);
  };
  const dispatcher = useDispatch();
  const handleEdit = async (e, id) => {
    e.preventDefault();
    try {
      // console.log(selector);

      const isFile = (input) => input instanceof File;
      const uploadPromises = selector.map(async (select, index) => {
        var file = "";
        // console.log(select);
        if (isFile(select.qimage)) {
          const formData = new FormData();
          formData.append("qimage", select.qimage);

          const response = await axios.post(
            "http://localhost:4000/api/post/image",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          file = response.data.file.filename || "none";
        } else {
          file = select.qimage;
        }
        // console.log(file);
        setQuestions((prevQuestions) => {
          const newQuestions = [...prevQuestions];
          newQuestions[index] = {
            ...prevQuestions[index],
            image: file,
          };
          return newQuestions;
        });
        questions[index].image = file;
      });

      await Promise.all(uploadPromises);

      // console.log(questions);
      await axios
        .put(ADMIN_SERVER + "/quiz/update", {
          id: id,
          name: name,
          duration: duration,
          count: count,
          attempt: attempt,
          questions: questions,
        })
        .then((resu) => {
          console.log(resu.data);
        })
        .catch((err) => console.log(err));
      // console.log(questions);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }

    dispatcher(resetAction());
  };
  const childRef = React.useRef();
  const handleRemove = (e, index) => {
    e.preventDefault();
    dispatcher(removeAction(index));
    setQuestions((prevItems) => {
      const newItems = prevItems.filter((_, i) => i !== index);
      prevItems.choices = [];
      setCount(newItems.length); // Update count based on the new length
      return newItems;
    });
    if (childRef.current) {
      childRef.current.handleChoiceDelete();
    }
  };

  const handleCount = (e) => {
    e.preventDefault();
    dispatcher(addAction(null));
    setCount((p) => p + 1);
    setQuestions((prevQuestions) => {
      const newQuestions = [
        ...prevQuestions,
        {
          question: "",
          choices: [],
          answer: "",
          image: "",
          points: 0,
        },
      ];
      return newQuestions;
    });
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Quiz Name</TableCell>
            <TableCell align="right">Questions</TableCell>
            <TableCell align="right">Duration</TableCell>
            <TableCell align="right">Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, ind) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {ind + 1}
              </TableCell>
              <TableCell component="right">{row.name}</TableCell>
              <TableCell align="right">{row.count}</TableCell>
              <TableCell component="right">{row.duration} Minutes</TableCell>
              <TableCell align="right">
                <MyQuizTableContext.Provider
                  value={{
                    handleEdit,
                    handleDelete,
                    name,
                    setName,
                    count,
                    setCount,
                    attempt,
                    setAttempt,
                    setDuration,
                    questions,
                    setQuestions,
                  }}
                >
                  <Conformation
                    button="Edit"
                    header={"Edit"}
                    id={row.id}
                    ConfirmName={row.name}
                    attemptCount={row.attempt}
                    questCount={row.count}
                    dura={row.duration}
                    body={
                      <>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                              Name
                            </Typography>
                            <Grid item xs={12} sm={12}>
                              <TextField
                                required
                                name="address1"
                                label="Quiz"
                                fullWidth
                                value={name}
                                onChange={(e) => {
                                  setName(e.target.value);
                                }}
                                autoComplete=""
                              />
                            </Grid>
                          </Grid>
                          <Grid container spacing={2} xs={12} m={2}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                name="duration"
                                label="Duration (in Mins)"
                                fullWidth
                                type="number"
                                value={duration}
                                onChange={(e) => {
                                  setDuration(e.target.value);
                                }}
                                autoComplete=""
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                name="attempt"
                                label="Attempt"
                                fullWidth
                                type="number"
                                value={attempt}
                                onChange={(e) => {
                                  setAttempt(e.target.value);
                                }}
                              />
                            </Grid>
                          </Grid>

                          {questions.map((question, index) => (
                            <>
                              <Grid item xs={10} sm={12}>
                                <Typography variant="h6" gutterBottom>
                                  Question {index + 1}
                                  <IconButton
                                    color="error"
                                    onClick={(e) => {
                                      handleRemove(e, index);
                                    }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Typography>
                                {selector[index] && (
                                  <Uploader
                                    index={index}
                                    src={selector[index].qimage}
                                  />
                                )}

                                <TextField
                                  required
                                  id="address1"
                                  name="address1"
                                  label="Question"
                                  fullWidth
                                  value={question.question}
                                  onChange={(e) => {
                                    question.question = e.target.value;
                                  }}
                                  autoComplete="shipping address-line1"
                                />
                              </Grid>

                              <ChoiceContext.Provider value={{ question }}>
                                <Choices
                                  ref={childRef}
                                  myChoices={question.choices}
                                  count={question.choices.length}
                                />
                              </ChoiceContext.Provider>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  id="answer"
                                  name="answer"
                                  value={question.answer}
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
                                  required
                                  id="points"
                                  value={question.points}
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
                          ))}
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <Button onClick={(e) => handleCount(e)}>
                            Add Question
                          </Button>
                        </Grid>
                      </>
                    }
                    left="Cancel"
                    right="Save"
                    color="primary"
                  />
                  <Conformation
                    id={row.id}
                    header={"Delete"}
                    body={"Do you want to delete ?"}
                    button="Delete"
                    left="Cancel"
                    right="Delete"
                    color="error"
                  />
                </MyQuizTableContext.Provider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const UseQuizTableContext = () => {
  return React.useContext(MyQuizTableContext);
};
