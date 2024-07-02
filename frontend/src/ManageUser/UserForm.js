import React, { useContext, useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { UseUser } from "./CreateUser";
import MySelection from "../MUI/MySelection";

export default function UserForm() {
  const {
    name,
    setName,
    userid,
    setEmail,
    pass,
    setPass,
    role,
    setRole,
    gender,
    setGender,
  } = UseUser();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom></Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="Name"
            name="Name"
            label="User Name"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            id="userid"
            name="userid"
            label="User ID"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            id="Password"
            name="Password"
            label="Password"
            fullWidth
            onChange={(e) => setPass(e.target.value)}
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
              {["School Student", "College Student", "Representative"].map(
                (e) => (
                  <MenuItem value={e}>{e}</MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
