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
import { USER_SERVER } from "../data";
const UserTableContext = React.createContext();
export default function UserTable({ rows }) {
  const [name, setName] = React.useState("");
  const [userid, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");

  const handleEdit = async (e, id) => {
    e.preventDefault();
    axios
      .post(USER_SERVER + "/edit", {
        id: id,
        name: name,
        userid: userid,
        password: pass,
      })
      .then
      // (res) =>
      // console.log(res)
      ()
      .catch((err) => console.log(err));
  };
  const handleDelete = (e, id) => {
    e.preventDefault();
    axios
      .post(USER_SERVER + "/delete", { id: id })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="center">User ID</TableCell>
            <TableCell align="center">Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, ind) => (
            <TableRow>
              <TableCell align="center">{ind + 1}</TableCell>
              <TableCell component="center">{row.name}</TableCell>
              <TableCell align="center">{row.userid}</TableCell>
              <TableCell align="center">
                <UserTableContext.Provider
                  value={{
                    handleEdit,
                    handleDelete,
                    name,
                    setName,
                    userid,
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
                    userid={row.userid}
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
                              label="User ID"
                              fullWidth
                              value={userid}
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
