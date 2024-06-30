import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { Button, Grid, TextField } from "@mui/material";
import Conformation from "./Conformation";
const UserTableContext = React.createContext();
export default function UserTable({ rows }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");

  const handleEdit = async (e, id) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/user/edit", {
      id: id,
      name: name,
      email: email,
      password: pass
    }).then((res) => console.log(res))
      .catch((err) => console.log(err))
  };
  const handleDelete = (e, id) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/user/delete", { id: id }).then((res) => console.log(res))
      .catch((err) => console.log(err))
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
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
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">
                <UserTableContext.Provider
                  value={{
                    handleEdit,
                    handleDelete,
                    name,
                    setName,
                    email,
                    setEmail,
                    pass,
                    setPass,
                  }}
                >
                  <Conformation
                    button="Edit"
                    header={"Edit"}
                    id={row.id}
                    name={row.name}
                    email={row.email}
                    pass={row.password}
                    body={
                      <>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                              User
                            </Typography>
                            <TextField
                              required
                              name="address1"
                              label="Name"
                              fullWidth
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                              autoComplete=""
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              name="address1"
                              label="Email"
                              fullWidth
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                              autoComplete=""
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              name="address1"
                              label="Password"
                              fullWidth
                              value={pass}
                              onChange={(e) => {
                                setPass(e.target.value);
                              }}
                              autoComplete=""
                            />
                          </Grid>
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
                </UserTableContext.Provider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const UseUserTableContext = () => {
  return React.useContext(UserTableContext);
};
