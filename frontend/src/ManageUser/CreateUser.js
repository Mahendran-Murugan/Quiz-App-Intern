import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import Form from "../ManageQuiz/Form";
import { USER_SERVER } from "../data";
import { useDispatch, useSelector } from "react-redux";
import UserForm from "./UserForm";
import MyDialog from "../ManageQuiz/MyDialog";
import { Stack } from "@mui/material";
import { UploadeXL } from "./UploadeXL";

const userContext = React.createContext();

export default function CreateUser({ props }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [userid, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [isError, setError] = React.useState(false);
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
      role: role,
      phone_number: 0,
      parents_number: 0,
      address: "none",
      father_name: "none",
      mother_name: "none",
      gender: gender,
      institute_name: "none",
      standard: "",
    };
    if (
      all.name === "" ||
      all.userid === "" ||
      all.password === "" ||
      gender === "" ||
      role === ""
    ) {
      setError(true);
      setBody("Please fill all the details of the User");
      setTitle("Fill the Form");
      return;
    }
    axios
      .post(USER_SERVER + "/register", all)
      .then((res) => {
        setError(true);
        setTitle("User Created")
        setBody(all.name + " User Created Successfully");
        console.log(res);
      })
      .catch((err) => alert(err));
    setOpen(false);
  };

  return (
    
    <React.Fragment>
    {isError && <MyDialog title={title} body={body} setError={setError} />}
      
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
        value={{
          name,
          setName,
          userid,
          setEmail,
          pass,
          setPass,
          role,
          setRole,
          setGender,
          gender,
        }}
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
