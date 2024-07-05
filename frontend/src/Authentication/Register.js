import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import e from "cors";
import { USER_SERVER } from "../data";
import MySelection from "../MUI/MySelection";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../app/store";
import {
  editAddress,
  editFathername,
  editInstitute,
  editMothername,
  editParentNumber,
  editPassword,
  editPhone,
  editProp,
  editStandard,
  editStudent,
  editUser,
  resetAll,
} from "../feature/registerSlice";
import MyDialog from "../ManageQuiz/MyDialog";
import { useNavigate } from "react-router-dom";
const defaultTheme = createTheme();

export function Register() {
  const student_data = useSelector((state) => state.register.student_data);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (localStorage.getItem("name")) {
      navigate("/quiz");
    }
  });
  const [isError, setError] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const rep_data = useSelector((state) => state.register.rep_data);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(student_data);
    if (student_data.role === "") {
      setTitle("Please fill the Form");
      setBody("Select the Role");
      setError(true);
      return;
    }
    switch (student_data.role) {
      case "Representative": {
        const data = [
          "name",
          "userid",
          "password",
          "gender",
          "role",
          "user_phone",
          "institute_name",
        ];
        for (let stud in student_data) {
          if (data.includes(stud) && student_data[stud] === "") {
            setTitle("Please fill the Form");
            setBody("Fill the " + stud + " field");
            setError(true);
            return;
          }
          if (!data.includes(stud)) {
            dispatcher(editProp(stud));
          }
        }
        break;
      }

      default: {
        for (let stud in student_data) {
          console.log(stud);
          if (student_data[stud] === "") {
            setBody("Fill the " + stud + " field");
            setError(true);
            return;
          }
        }
        break;
      }
    }
    axios
      .post(USER_SERVER + "/register", {
        name: student_data.name,
        userid: student_data.userid,
        password: student_data.password,
        role: student_data.role,
        phone_number: student_data.user_phone,
        parents_number: student_data.parents_number,
        address: student_data.address,
        father_name: student_data.father_name,
        mother_name: student_data.mother_name,
        gender: student_data.gender,
        institute_name: student_data.institute_name,
        standard: student_data.standard,
      })
      .then((res) => {
        setError(true);
        setTitle("Registration Successfully");
        setBody(student_data.userid + " user is Registerd");
        dispatcher(resetAll());
        navigate("/login");

        console.log(res);
      })
      .catch((err) => {
        setError(true);
        setTitle("Error");
        dispatcher(resetAll());
        setBody(err.message);
        console.log(err);
      });
  };

  const dispatcher = useDispatch();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {isError && <MyDialog setError={setError} title={title} body={body} />}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h2" variant="h6">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="Name"
                  value={student_data.name}
                  onChange={(e) => {
                    dispatcher(editStudent(e.target.value));
                  }}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="userid"
                  label="User ID"
                  name="userid"
                  value={student_data.userid}
                  onChange={(e) => {
                    dispatcher(editUser(e.target.value));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={student_data.password}
                  onChange={(e) => {
                    dispatcher(editPassword(e.target.value));
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <MySelection
                  text="gender"
                  placeholder={"Select Gender"}
                  collection={["Male", "Female"]}
                />
              </Grid>
              <Grid item xs={6}>
                <MySelection
                  text="role"
                  placeholder={"Select Role"}
                  collection={[
                    "School Student",
                    "College Student",
                    "Representative",
                  ]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="phonenumber"
                  label="Phone Number"
                  type="number"
                  id="phonenumber"
                  value={student_data.user_phone}
                  onChange={(e) => {
                    dispatcher(editPhone(e.target.value));
                  }}
                />
              </Grid>
              {student_data.role != "" && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="institution"
                    label={
                      student_data.role.startsWith("School")
                        ? "School Name"
                        : "Institution Name"
                    }
                    type="text"
                    id="institution"
                    value={student_data.institute_name}
                    onChange={(e) => {
                      dispatcher(editInstitute(e.target.value));
                    }}
                  />
                </Grid>
              )}
              {student_data.role != "" &&
                student_data.role.endsWith("Student") && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="fathername"
                        label={
                          student_data.role.startsWith("School")
                            ? "Standard"
                            : "Degree & Department"
                        }
                        type="text"
                        id="fathername"
                        value={student_data.standard}
                        onChange={(e) => {
                          dispatcher(editStandard(e.target.value));
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="fathername"
                        label="Father Name"
                        type="text"
                        id="fathername"
                        value={student_data.father_name}
                        onChange={(e) => {
                          dispatcher(editFathername(e.target.value));
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="mothername"
                        label="Mother Name"
                        type="text"
                        id="mothername"
                        value={student_data.mother_name}
                        onChange={(e) => {
                          dispatcher(editMothername(e.target.value));
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="parentsnumber"
                        label="Parent Contact Number"
                        type="number"
                        id="parentsnumber"
                        value={student_data.parents_number}
                        onChange={(e) => {
                          dispatcher(editParentNumber(e.target.value));
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="Address"
                        label="Address"
                        type="text"
                        id="Address"
                        value={student_data.address}
                        onChange={(e) => {
                          dispatcher(editAddress(e.target.value));
                        }}
                      />
                    </Grid>
                  </>
                )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" underline="hover" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
