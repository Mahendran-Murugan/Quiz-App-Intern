import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  createContext,
  useContext,
} from "react";
import { UseChoiceContext } from "./Form";
import {
  Grid,
  TextField,
  Button,
  Fab,
  Stack,
  Switch,
  Box,
  Container,
  Typography,
  RadioGroup,
  Radio,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChoiceUploader from "../MUI/ChoiceUploader";

const Choices = forwardRef(({ myChoices, count }, ref) => {
  const { question } = UseChoiceContext();
  const [selected, setSelected] = useState(0);
  const [isImage, setIsImage] = useState(question.isImage);
  const [choiceCount, setChoiceCount] = useState(count);
  const [choiceValue, setChoiceValue] = useState(question.choices);

  const handleChoiceCount = () => {
    console.log(selected);
    question.choices = [...question.choices, ""];
    setChoiceValue([...choiceValue, ""]);
    setChoiceCount((p) => p + 1);
  };

  const handleChoiceDelete = () => {
    setChoiceValue(question.choices);
  };

  useImperativeHandle(ref, () => ({
    handleChoiceDelete,
  }));

  return (
    <>
      <Container
        sx={{
          mt: 2,
        }}
      >
        {" "}
        <Typography variant="button" color="initial">
          Image Choice {isImage ? "ON" : "OFF"}
        </Typography>
        <Switch
          label="Image Choice"
          checked={isImage}
          onClick={(e) => {
            setIsImage(!isImage);
            question.isImage = !isImage;
          }}
        />
      </Container>
      {!isImage &&
        question.choices.map((choice, ind) => (
          <Grid item xs={12} sm={6} key={ind}>
            <TextField
              multiline
              required
              id={`choice${ind + 1}`}
              name="Choice"
              label={`Choice ${ind + 1}`}
              fullWidth
              onChange={(e) => {
                setChoiceValue((prevItems) => {
                  const newItems = [...prevItems];
                  newItems[ind] = e.target.value;
                  return newItems;
                });
                question.choices[ind] = e.target.value;
              }}
              value={choice}
              autoComplete="shipping address-level2"
            />
          </Grid>
        ))}
      {!isImage && (
        <Grid
          justifyContent={"center"}
          alignContent={"center"}
          item
          xs={12}
          sm={6}
        >
          <center>
            <Fab
              size="small"
              centerRipple
              color="primary"
              onClick={handleChoiceCount}
            >
              <AddIcon />
            </Fab>
          </center>
        </Grid>
      )}
      {isImage && (
        <>
          <Grid item xs={6} sx={6}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={selected}
              name="radio-buttons-group"
            >
              {choiceValue.map((ch, id) => (
                <ChoiceUploadContext.Provider
                  value={{
                    choiceValue,
                    setSelected,
                    selected,
                    setChoiceValue,
                    question,
                  }}
                >
                  <ChoiceUploader index={id} />
                </ChoiceUploadContext.Provider>
              ))}
            </RadioGroup>
          </Grid>
          <Grid alignContent={"center"} item xs={6} sx={6}>
            <Fab
              size="small"
              centerRipple
              color="primary"
              onClick={handleChoiceCount}
            >
              <AddIcon />
            </Fab>
          </Grid>
        </>
      )}
    </>
  );
});
const ChoiceUploadContext = createContext();
export const UseChoiceImage = () => {
  return useContext(ChoiceUploadContext);
};

export default Choices;
