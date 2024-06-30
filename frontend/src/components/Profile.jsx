import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const Profile = () => {
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Profile
      </Typography>
      <Stack direction={"row"} flexWrap={"wrap"} gap={3}>
        <Card sx={{ maxWidth: 245 }}>
          <CardMedia
            component="img"
            height="70"
            image="https://cdn.serc.carleton.edu/images/serc/empty_user_icon_256.v2.webp"
            alt="green iguana"
          />
          <CardContent>
            <Typography sx={{ textTransform: "capitalize" }} align="center">
              Name : {localStorage.getItem("name")}
            </Typography>
            <Typography
              variant="overline"
              gutterBottom
              align="center"
            ></Typography>
            <Typography variant="body1">Correct Answers:</Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 245 }}>
          <CardContent>
            <Typography variant="h5"></Typography>
            <Typography variant="body1">Attended Questions:</Typography>
            <Typography variant="body1">Correct Answers:</Typography>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

export default Profile;
