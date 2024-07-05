import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import CreateQuiz from "../ManageQuiz/CreateQuiz";
import QuizManipulate from "../ManageQuiz/QuizManipulate";
import { Container, Stack } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "../app/store";
import CreateUser from "../ManageUser/CreateUser";
import { UserManipulate } from "../ManageUser/UserManipulate";

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
    <Container
      sx={{
        maxWidth: { xs: 360, sm: 750, md: 950 },
        display: "flex",
        alignItems: "center",
        gap: "30px",
        width: "100%",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
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
            <Provider store={store}>
              <CreateQuiz />
            </Provider>
          </center>
          <br />
          <Provider store={store}>
            <QuizManipulate />
          </Provider>
        </Stack>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Stack>
          <center>
            <Provider store={store}>
              <CreateUser />
            </Provider>
          </center>
          <br />
          <Provider store={store}>
            <UserManipulate />
          </Provider>
        </Stack>
      </CustomTabPanel>
    </Container>
  );
}
