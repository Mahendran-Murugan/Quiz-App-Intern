import React, { useContext, useState } from "react";
import {
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { UseUser } from "./CreateUser";

export default function UserForm() {

  const { name, setName, email, setEmail, pass, setPass } = UseUser();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom></Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="Name"
            name="Name"
            label="User Name"
            fullWidth
            onChange={(e) => setName(e.target.value)}
            autoComplete="given-name"
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="Email"
            name="Email"
            label="E-mail Id"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="given-name"
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="Password"
            name="Password"
            label="Password"
            fullWidth
            onChange={(e) => setPass(e.target.value)}
            autoComplete="given-name"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
