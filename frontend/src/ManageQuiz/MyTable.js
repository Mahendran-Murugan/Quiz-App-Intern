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
import { Button, Grid, TextField } from "@mui/material";
import Choices from "./Choices";
import { ChoiceContext } from "./Form";
const MyQuizTableContext = React.createContext();
export default function MyTable({ rows }) {
  const [name, setName] = React.useState("");
  const [count, setCount] = React.useState(0);
  const [questions, setQuestions] = React.useState([]);
  const handleDelete = (id) => {
    axios.delete("http://localhost:8000/api/admin/quiz/delete/" + id);
  };
  const handleEdit = (id) => {
    axios.delete("http://localhost:8000/api/admin/quiz/delete/" + id);
    // console.log(questions);
    axios.post("http://localhost:8000/api/admin/quiz/create", {
      name: name,
      count: questions.length,
      questions: questions,
    });
  };
  const childRef = React.useRef();
  const handleRemove = (index) => {
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

  const handleCount = () => {
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
      setCount(newQuestions.length);
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
              <TableCell align="right">
                <MyQuizTableContext.Provider
                  value={{
                    handleEdit,
                    handleDelete,
                    name,
                    setName,
                    count,
                    setCount,
                    questions,
                    setQuestions,
                  }}
                >
                  <Conformation
                    button="Edit"
                    header={"Edit"}
                    ConfirmName={row.name}
                    questCount={row.count}
                    body={
                      <>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                              Quiz
                            </Typography>
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
                          {questions.map((question, index) => (
                            <>
                              <Grid item xs={10} sm={10}>
                                <Typography variant="h6" gutterBottom>
                                  Question {index + 1}
                                  <Button
                                    color="error"
                                    onClick={(e) => {
                                      handleRemove(index);
                                    }}
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </Typography>
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
                                  id="image"
                                  value={question.image}
                                  name="image"
                                  onChange={(e) => {
                                    question.image = e.target.value;
                                  }}
                                  required
                                  label="Image"
                                  fullWidth
                                  autoComplete="Image"
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
                          <Button onClick={() => handleCount()}>
                            Add Question
                          </Button>
                        </Grid>
                      </>
                    }
                    id={row.id}
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
