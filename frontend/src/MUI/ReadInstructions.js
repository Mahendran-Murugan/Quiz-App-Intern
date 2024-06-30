import React from "react";
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import BlockIcon from "@mui/icons-material/Block";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";

const ReadInstructions = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "2em", marginTop: "2em" }}>
        <Typography variant="h4" gutterBottom>
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
            <ListItemText primary="The quiz consists of Multiple Choice Questions (MCQs) and Yes/No questions." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Each quiz has a specific duration. Make sure to complete all questions within the given time." />
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
            <ListItemText primary="Your attempts are tracked and recorded. Each time you start the quiz, it counts as one attempt." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <WarningIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Attempting to leave the full screen, switching browser tabs, or pressing restricted keys will reduce your attempt count." />
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
            <ListItemText primary="The quiz must be taken in full screen mode. Exiting the full screen mode before completing the quiz will result in an automatic attempt reduction." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FullscreenIcon />
            </ListItemIcon>
            <ListItemText primary="Do not switch to another tab or window during the quiz." />
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
            <ListItemText primary="Avoid pressing Ctrl, Alt, Tab, or any other key combinations that could interfere with the quiz. Using these keys will trigger a warning and may result in an attempt reduction." />
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
            <ListItemText primary="Once you start the quiz, you must complete it in a single session. Do not close your browser or navigate away from the quiz page." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BrowserUpdatedIcon />
            </ListItemIcon>
            <ListItemText primary="Do not open any other browser tabs or windows while taking the quiz." />
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
            <ListItemText primary="Ensure you have a stable internet connection throughout the quiz to avoid disconnections and loss of progress." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Use a compatible and up-to-date browser for the best experience." />
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
            <ListItemText primary="Any attempt to violate the rules will result in a warning. Continued violations will lead to a reduction in attempts." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Maintain the integrity of the quiz by not seeking external help or resources." />
          </ListItem>
        </List>

        <Typography variant="body1" gutterBottom>
          Be cautious and attentive during the quiz. Follow the instructions
          strictly to avoid penalties. Good luck and do your best!
        </Typography>

        <Typography variant="body2" color="textSecondary">
          By starting the quiz, you agree to adhere to all the instructions
          mentioned above.
        </Typography>
      </Paper>
    </Container>
  );
};

export default ReadInstructions;
