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
import { USER_SERVER } from "../data";
import axios from "axios";
import LeaderBoard from "../MUI/LeaderBoard";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [details, setDetails] = useState(null);
  const [leader, setLeader] = useState(null);
  async function Async() {
    const result = await axios.get(
      USER_SERVER + "/get/userDetails/" + localStorage.getItem("id")
    );
    // console.log(result.data);
    setDetails(result.data);
    const leader = await axios.get(USER_SERVER + "/leadership").then((res) => {
      setLeader(res.data);
    });
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("name") != "") {
      Async();
      console.log(details);
    } else {
      navigate("/");
    }
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
              userid : {localStorage.getItem("userid")}
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            maxWidth: {
              md: 500,
              xs: 250,
            },
          }}
        >
          <CardContent>
            {details && (
              <>
                <PieChart
                  sx={{
                    display: {
                      md: "block",
                      sm: "none",
                      xs: "none",
                    },
                    height: {
                      sm: 100,
                      xs: 100,
                    },
                  }}
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: `${details.attended}`,
                          label: "Attended " + details.attended,
                        },
                        {
                          id: 1,
                          value: `${details.correct}`,
                          label: "Correct " + details.correct,
                        },
                      ],
                    },
                  ]}
                  width={450}
                  height={200}
                />
                <Box
                  align="center"
                  sx={{
                    display: {
                      md: "none",
                      sm: "block",
                    },
                  }}
                >
                  <Typography variant="h6" color="initial">
                    Attended : {details.attended}
                  </Typography>
                  <Typography variant="h6" color="initial">
                    Correct : {details.correct}
                  </Typography>
                </Box>
                <Typography align="center" mt={4} variant="h6" color="initial">
                  Score :{" "}
                  {((details.correct / details.attended) * 100).toFixed(2)}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Stack>
      {details && details.role != "School Student" && (
        <Stack
          m={2}
          p={2}
          sx={{
            minWidth: {
              xl: 1000,
              lg: 800,
              md: 600,
              sm: 300,
              xs: 250,
            },
          }}
        >
          <LeaderBoard data={leader} />
        </Stack>
      )}
    </Grid>
  );
};

export default Profile;
