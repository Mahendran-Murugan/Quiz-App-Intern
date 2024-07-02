import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import Form from "../ManageQuiz/Form";
import { USER_SERVER } from '../data'
import { useDispatch, useSelector } from "react-redux";
import UserForm from "./UserForm";
import { Stack } from "@mui/material";
import { UploadeXL } from "./UploadeXL";

const userContext = React.createContext();

export default function CreateUser({ props }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [userid, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
    setName("");
    setEmail("");
    setPass("");
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  const handleCreate = async (e) => {
    const all = {
      name: name,
      userid: userid,
      password: pass,
    };
    if (all.name == "" || all.userid == "" || all.password == "") {
      alert("Input Field should be filled");
      return;
    }
    axios
      .post(USER_SERVER + "/register", all)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => alert(err));
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Button variant="contained" onClick={(e) => handleClickOpen(e)}>
          Create
        </Button>
        <UploadeXL />
      </Stack>
      <userContext.Provider
        value={{ name, setName, userid, setEmail, pass, setPass }}
      >
        <Dialog
          open={open}
          onClose={(e) => handleClose(e)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Create User</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <UserForm></UserForm>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => handleClose(e)}>Close</Button>
            <Button type="submit" onClick={(e) => handleCreate(e)}>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </userContext.Provider>
    </React.Fragment>
  );
}

export const UseUser = () => {
  return React.useContext(userContext);
};
