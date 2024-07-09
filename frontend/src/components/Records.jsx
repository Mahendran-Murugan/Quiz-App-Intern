import { Button, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FILE_SERVER, USER_SERVER } from "../data";
import { UploadeXL } from "../ManageUser/UploadeXL";
import LeaderBoard from "../MUI/LeaderBoard";

export const Records = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const getData = async () => {
      await axios
        .post(`${USER_SERVER}/studentPerformance`, {
          institute_name: localStorage.getItem("institute"),
        })
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => console.log(err));
    };
    getData();
  }, []);

  const handleDownloadTemplate = async () => {
    try {
      const response = await axios.get(`${FILE_SERVER}/getTemplate`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "Template_for_Student_Info.xlsx";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the template", error);
    }
  };

  const handleDownloadData = async () => {
    console.log(
      `${USER_SERVER}/getReport/${localStorage.getItem("institute")}`
    );
    try {
      const response = await axios.get(
        `${USER_SERVER}/getReport/${localStorage.getItem("institute")}`,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "details.xlsx";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the template", error);
    }
  };

  return (
    <Stack>
      <center>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            onClick={handleDownloadTemplate}
            component="label"
            role={undefined}
            variant="contained"
          >
            Download Template
          </Button>
          <UploadeXL />
          <Button
            onClick={handleDownloadData}
            component="label"
            role={undefined}
            variant="contained"
          >
            Download Details
          </Button>
        </Stack>
      </center>
      <br />
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <LeaderBoard data={data} />
      </Stack>
    </Stack>
  );
};
