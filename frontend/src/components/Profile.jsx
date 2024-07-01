import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import React, { useEffect, useState } from "react";
import { USER_SERVER } from '../data'
import axios from "axios";
import LeaderBoard from "../MUI/LeaderBoard";

const Profile = () => {
  const [details, setDetails] = useState(null);
  const [leader, setLeader] = useState(null);
  async function Async() {
    const result = await axios.get(
      USER_SERVER + "/get/userDetails/" +
      localStorage.getItem("id")
    );
    // console.log(result.data);
    setDetails(result.data);
    const leader = await axios
      .get(USER_SERVER + "/leadership")
      .then((res) => {
        console.log(res);
        setLeader(res.data);
      });
  }
  useEffect(() => {
    Async();
  }, []);
  return (
    <Grid alignContent={"center"}>
      <Typography variant="h5" align="center" m={2} gutterBottom>
        Profile
      </Typography>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        gap={3}
      >
        <Card sx={{ maxWidth: 245 }}>
          <CardMedia
            component="img"
            height="70"
            image="https://cdn.serc.carleton.edu/images/serc/empty_user_icon_256.v2.webp"
            alt="green iguana"
          />

          <CardContent>
            <Typography
              sx={{ textTransform: "capitalize", fontWeight: "bold" }}
              align="center"
              mb={1}
            >
              Name : {localStorage.getItem("name")}
            </Typography>
            <Typography
              variant="overline"
              gutterBottom
              align="center"
            ></Typography>

            <Typography variant="body1">
              Email : {localStorage.getItem("email")}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 500 }}>
          <CardContent>
            {details && (
              <>
                <PieChart
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: `${details.attended}`,
                          label: "Attended",
                        },
                        {
                          id: 1,
                          value: `${details.correct}`,
                          label: "Correct",
                        },
                      ],
                    },
                  ]}
                  width={400}
                  height={250}
                />

                <Typography align="center" mt={4} variant="h6" color="initial">
                  Score :{" "}
                  {((details.correct - (details.attended - details.correct)) /
                    details.attended) *
                    100}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Stack>
      <Stack m={2} p={2}>
        <LeaderBoard data={leader} />
      </Stack>
    </Grid>
  );
};

export default Profile;
