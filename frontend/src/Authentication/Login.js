import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { UseAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { USER_SERVER } from "../data";
import MyDialog from "../ManageQuiz/MyDialog";
const defaultTheme = createTheme();

export function Login() {
  const { login } = UseAuth();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (localStorage.getItem("name")) {
      navigate("/quiz");
    }
  });
  const [isError, setError] = React.useState(false);
  const [title, setTitle] = React.useState(null);
  const [body, setBody] = React.useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const all = {
      userid: data.get("userid"),
      password: data.get("password"),
    };
    if (all.userid === "" || all.password === "") {
      setTitle("Login Failed");
      setBody("Input Field should be filled");
      setError(true);
      return;
    }

    axios
      .post(USER_SERVER + "/login", all)
      .then((res) => {
        // console.log(res);
        if (res.data.role === "Representative" && res.data.verified === 0) {
          setTitle("Login Failed");
          setBody(
            "Representative login cannot be accessed.Contact Admin to Verify"
          );
          setError(true);
          return;
        }
        login(
          res.data.id,
          res.data.name,
          res.data.userid,
          res.data.password,
          res.data.role === "Representative" && res.data.verified === 1
        );
        navigate("/");
      })
      .catch((err) => {
        setTitle("Login Failed");
        setBody(err.response.data.status);
        setError(true);
      });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      {isError && <MyDialog setError={setError} title={title} body={body} />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h2" variant="h6">
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  autoFocus
                  id="userid"
                  label="User ID"
                  name="userid"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" underline="hover" variant="body2">
                  Doesn't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
