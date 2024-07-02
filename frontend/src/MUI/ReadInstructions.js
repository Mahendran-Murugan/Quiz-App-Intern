import React from "react";
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import BlockIcon from "@mui/icons-material/Block";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";

const ReadInstructions = () => {
  const isMobile = useMediaQuery("(max-width:600px)"); // Adjust breakpoint as needed

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: "2em", marginTop: "2em" }}>
        <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
          Quiz Instructions
        </Typography>

        <Typography variant="h6" gutterBottom>
          Quiz Format
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                isMobile
                  ? "The quiz consists of MCQs and Yes/No questions."
                  : "The quiz consists of Multiple Choice Questions (MCQs) and Yes/No questions."
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                isMobile
                  ? "Each quiz has a specific duration. Complete all questions within the given time."
                  : "Each quiz has a specific duration. Make sure to complete all questions within the given time."
              }
            />
          </ListItem>
        </List>

        <Typography variant="h6" gutterBottom>
          Attempts and Scoring
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                isMobile
                  ? "Attempts are tracked and recorded. Each quiz start counts as one attempt."
                  : "Your attempts are tracked and recorded. Each time you start the quiz, it counts as one attempt."
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <WarningIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Attempting to leave full screen, switch tabs, or press restricted keys reduces attempts." />
          </ListItem>
        </List>

        <Typography variant="h6" gutterBottom>
          Full Screen Mode
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <FullscreenIcon />
            </ListItemIcon>
            <ListItemText primary="Take the quiz in full screen. Exiting early reduces attempts." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FullscreenIcon />
            </ListItemIcon>
            <ListItemText primary="Do not switch to other tabs or windows during the quiz." />
          </ListItem>
        </List>

        <Typography variant="h6" gutterBottom>
          Keyboard Restrictions
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <BlockIcon />
            </ListItemIcon>
            <ListItemText primary="Avoid Ctrl, Alt, Tab, or other keys that may disrupt the quiz. Using them triggers warnings and reduces attempts." />
          </ListItem>
        </List>

        <Typography variant="h6" gutterBottom>
          General Conduct
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Complete the quiz in one session. Do not close the browser or leave the quiz page." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BrowserUpdatedIcon />
            </ListItemIcon>
            <ListItemText primary="Do not open other tabs or windows while taking the quiz." />
          </ListItem>
        </List>

        <Typography variant="h6" gutterBottom>
          Technical Requirements
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Keep a stable internet connection to prevent disconnections and lost progress." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Use a compatible, updated browser for optimal performance." />
          </ListItem>
        </List>

        <Typography variant="h6" gutterBottom>
          Important Notes
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <WarningIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Violating rules results in warnings. Repeated violations reduce attempts." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Maintain quiz integrity. Do not use external help or resources." />
          </ListItem>
        </List>

        <Typography variant="body1" gutterBottom>
          Be attentive. Follow instructions to avoid penalties. Best of luck!
        </Typography>

        <Typography variant="body2" color="textSecondary">
          By starting the quiz, you agree to follow all instructions.
        </Typography>
      </Paper>
    </Container>
  );
};

export default ReadInstructions;
