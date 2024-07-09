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
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Conformation from "./Conformation";
import { USER_SERVER } from "../data";
import MyDialog from "../ManageQuiz/MyDialog";
const UserTableContext = React.createContext();
export default function UserTable({ rows }) {
  const [name, setName] = React.useState("");
  const [userid, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [role, setRole] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [mother, setMother] = React.useState("");
  const [father, setFather] = React.useState("");
  const [parent, setParent] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [institute, setInstitute] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [STD, setSTD] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [isError, setError] = React.useState(false);
  const [isVerify, setVerify] = React.useState(false);
  const [sortby, setSortBy] = React.useState("All");

  const handleEdit = async (e, id) => {
    e.preventDefault();
    if (
      name == "" ||
      userid == "" ||
      pass == "" ||
      role == "" ||
      gender == "" ||
      number === "" ||
      isNaN(number) ||
      isNaN(parent) ||
      parent === "" ||
      institute === "" ||
      father === "" ||
      mother === "" ||
      address === "" ||
      STD === ""
    ) {
      setBody("Please Fill the details correctly");
      setTitle("Fill the form");
      setError(true);
      return;
    }

    axios
      .post(USER_SERVER + "/edit", {
        id: id,
        name: name,
        userid: userid,
        password: pass,
        role: role,
        gender: gender,
        verified: isVerify,
        father_name: father,
        mother_name: mother,
        institute_name: institute,
        phone_number: number,
        address: address,
        standard: STD,
        parents_number: parent,
      })
      .then((res) => {
        setTitle("Detail Updated Successfully");
        setBody("User : " + name + " Updated");
        setError(true);
      })
      .catch((err) => {
        setBody(err.message);
        setTitle("Error");
        console.log(err);
      });
  };
  const handleDelete = (e, id) => {
    e.preventDefault();
    axios
      .post(USER_SERVER + "/delete", { id: id })
      .then(
        (res) => {}
        // console.log(res)
      )
      .catch((err) => console.log(err));
  };
  // console.log(rows);
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: {
          xs: 250,
          sm: 850,
          md: 950,
        },
      }}
    >
      {isError && <MyDialog title={title} body={body} setError={setError} />}
      <FormControl
        variant="standard"
        sx={{ m: 3, minWidth: 180 }}
        align="center"
      >
        <InputLabel id="demo-simple-select-standard-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={sortby}
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
          label="Sort By"
        >
          {["All", "School Student", "College Student", "Representative"].map(
            (e) => (
              <MenuItem value={e}>{e}</MenuItem>
            )
          )}
        </Select>
      </FormControl>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="center">User ID</TableCell>
            <TableCell align="center">Role</TableCell>
            <TableCell align="center">Verified</TableCell>
            <TableCell align="center">Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .filter((e) => (sortby != "All" ? e.role === sortby : true))
            .map((row, ind) => (
              <TableRow>
                <TableCell align="center">{ind + 1}</TableCell>
                <TableCell component="center">{row.name}</TableCell>
                <TableCell align="center">{row.userid}</TableCell>
                <TableCell component="center">{row.role}</TableCell>
                <TableCell align="center">
                  {row.verified ? "True" : "False"}
                </TableCell>
                <TableCell align="center">
                  <UserTableContext.Provider
                    value={{
                      handleEdit,
                      handleDelete,
                      name,
                      role,
                      mother,
                      setMother,
                      father,
                      setFather,
                      parent,
                      number,
                      setNumber,
                      setParent,
                      institute,
                      setInstitute,
                      STD,
                      setSTD,
                      address,
                      setAddress,
                      isVerify,
                      setVerify,
                      setRole,
                      gender,
                      setGender,
                      setName,
                      userid,
                      setEmail,
                      pass,
                      STD,
                      setSTD,
                      setPass,
                    }}
                  >
                    <Conformation
                      button="Edit"
                      verified={row.verified}
                      header={"Edit"}
                      id={row.id}
                      name={row.name}
                      userid={row.userid}
                      r={row.role}
                      parent={row.parents_number}
                      add={row.address}
                      mother={row.mother_name}
                      father={row.father_name}
                      std={row.standard}
                      inst={row.institute_name}
                      g={row.gender}
                      pass={row.password}
                      num={row.phone_number}
                      body={
                        <>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Typography variant="h6" gutterBottom>
                                User
                              </Typography>
                              <TextField
                                name="address1"
                                label="Name"
                                fullWidth
                                value={name}
                                onChange={(e) => {
                                  setName(e.target.value);
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                name="address1"
                                label="User ID"
                                fullWidth
                                value={userid}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                }}
                                te=""
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                name="address1"
                                label="Password"
                                fullWidth
                                value={pass}
                                onChange={(e) => {
                                  setPass(e.target.value);
                                }}
                                te=""
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormControl sx={{ m: 1, width: "90%" }}>
                                <InputLabel id="demo-simple-select-autowidth-label">
                                  Select gender
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-autowidth-label"
                                  id="demo-simple-select-autowidth"
                                  value={gender}
                                  onChange={(e) => setGender(e.target.value)}
                                  autoWidth
                                  label="Select Gender"
                                >
                                  {["Male", "Female"].map((e) => (
                                    <MenuItem value={e}>{e}</MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormControl sx={{ m: 1, width: "90%" }}>
                                <InputLabel id="demo-simple-select-autowidth-label">
                                  Select Role
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-autowidth-label"
                                  id="demo-simple-select-autowidth"
                                  value={role}
                                  onChange={(e) => setRole(e.target.value)}
                                  autoWidth
                                  label="Select Role"
                                >
                                  {[
                                    "School Student",
                                    "College Student",
                                    "Representative",
                                  ].map((e) => (
                                    <MenuItem value={e}>{e}</MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControl sx={{ m: 1, width: "90%" }}>
                                <InputLabel id="demo-simple-select-autowidth-label">
                                  Verified
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-autowidth-label"
                                  id="demo-simple-select-autowidth"
                                  value={isVerify}
                                  onChange={(e) => setVerify(e.target.value)}
                                  autoWidth
                                  label="Select Verified"
                                >
                                  {[1, 0].map((e) => (
                                    <MenuItem value={e}>
                                      {e ? "True" : "False"}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                name="phonenumber"
                                label={"Phone Number"}
                                type="number"
                                fullWidth
                                value={number ? number : ""}
                                onChange={(e) => {
                                  setNumber(e.target.value);
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                name="address"
                                label={"Address"}
                                type="text"
                                fullWidth
                                value={address}
                                onChange={(e) => {
                                  setAddress(e.target.value);
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                name="institute"
                                label={
                                  role && role.startsWith("School")
                                    ? "School Name"
                                    : "Institute Name"
                                }
                                type="text"
                                fullWidth
                                value={institute ? institute : ""}
                                onChange={(e) => {
                                  setInstitute(e.target.value);
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                name="standard"
                                label={
                                  role && role.startsWith("School")
                                    ? "Standard"
                                    : "Degree & Department"
                                }
                                type="text"
                                fullWidth
                                value={STD ? STD : ""}
                                onChange={(e) => {
                                  setSTD(e.target.value);
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                name="fathername"
                                label={"Father Name"}
                                type="text"
                                fullWidth
                                value={father ? father : ""}
                                onChange={(e) => {
                                  setFather(e.target.value);
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                name="mothername"
                                label={"Mother Name"}
                                type="text"
                                fullWidth
                                value={mother ? mother : ""}
                                onChange={(e) => {
                                  setMother(e.target.value);
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                name="phone_parent"
                                label={"Parent Number"}
                                type="number"
                                fullWidth
                                value={parent ? parent : ""}
                                onChange={(e) => {
                                  setParent(e.target.value);
                                }}
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
