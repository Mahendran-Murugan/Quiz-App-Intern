import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { UseUserTableContext } from "./UserTable";
import { useMediaQuery } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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

export default function Conformation({
  header,
  color,
  body,
  left,
  right,
  button,
  inst,
  mother,
  father,
  add,
  parent,
  name,
  userid,
  pass,
  num,
  r,
  std,
  g,
  id,
  verified,
}) {
  const {
    setNumber,
    handleEdit,
    setSTD,
    handleDelete,
    setName,
    setMother,
    setFather,
    setParent,
    setInstitute,
    setAddress,
    setEmail,
    setPass,
    role,
    isVerify,
    setVerify,
    setRole,

    gender,
    setGender,
  } = UseUserTableContext();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    e.preventDefault();
    setName(name);
    setEmail(userid);
    setNumber(num);
    setPass(pass);
    setSTD(std);
    setRole(r);
    setGender(g);
    setVerify(verified);
    setAddress(add);
    setMother(mother);
    setFather(father);
    setInstitute(inst);
    setParent(parent);
    // console.log(r, g);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <React.Fragment>
      <Button variant={""} color={color} onClick={(e) => handleClickOpen(e)}>
        {button === "Edit" && <EditIcon color="primary" />}
        {button === "Delete" && <DeleteIcon color="error" />}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {header}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{body}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            {left}
          </Button>
          <Button
            onClick={(e) => {
              if (right.toLowerCase() == "delete") handleDelete(e, id);
              else {
                handleEdit(e, id);
              }
              handleClose();
            }}
          >
            {right}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
