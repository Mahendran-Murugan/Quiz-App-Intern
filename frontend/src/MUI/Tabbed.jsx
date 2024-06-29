import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import CreateQuiz from "../ManageQuiz/CreateQuiz";
import QuizManipulate from "../ManageQuiz/QuizManipulate";
import { Stack } from "@mui/material";
export default function Tabbed() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 720 }, bgcolor: "background.paper" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Manage Quiz" />
        <Tab label="Manage Users" />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <Stack>
          <center>
            <CreateQuiz />
          </center>
          <br />
          <QuizManipulate />
        </Stack>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}></CustomTabPanel>
    </Box>
  );
}
