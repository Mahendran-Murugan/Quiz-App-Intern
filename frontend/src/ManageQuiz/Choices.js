import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  createContext,
  useContext,
  useEffect,
} from "react";
import RemoveIcon from "@mui/icons-material/Remove";
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
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChoiceUploader from "../MUI/ChoiceUploader";

const Choices = forwardRef(
  ({ src, myAnswer, myChoices, count, isimage }, ref) => {
    const { question } = UseChoiceContext();

    const [selected, setSelected] = useState(0);
    const [isImage, setIsImage] = useState(question.isImage);
    const [answer, setAnswer] = useState(myAnswer);
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

    const handleRemoveChoice = () => {
      setChoiceCount((p) => p - 1);
      const newA = choiceValue.slice(0, -1);
      setChoiceValue(newA);
      question.choices = newA;
      setAnswer((prevSelected) => {
        const newA = prevSelected.filter(
          (item) => item !== choiceValue[choiceValue.length - 1]
        );
        question.answer = newA;
        return newA;
      });
      setSelected(0);
    };
    const handleCheckboxChange = (index) => {
      setAnswer((prevSelected) => {
        if (prevSelected.includes(index)) {
          const newA = prevSelected.filter((i) => i !== index);
          question.answer = newA;
          console.log(newA);
          return newA;
        } else {
          const newA = [...prevSelected, index];

          question.answer = newA;
          console.log(newA);
          return newA;
        }
        
      });
    };
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
              if (!isImage) {
                setChoiceValue([""]);
                setAnswer([]);
                question.answer = [];
              } else question.answer = "";
              setChoiceValue([""]);
              setAnswer([]);
              setIsImage(!isImage);
              question.isImage = !isImage;
            }}
          />
        </Container>
        {!isImage &&
          choiceValue.map((choice, ind) => (
            <Grid item xs={12} sm={6} key={ind}>
              <TextField
                multiline
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
                  setAnswer((prevSelected) => {
                    if (prevSelected.includes(choice)) {
                      const newA = prevSelected.map((item) =>
                        item === choice ? e.target.value : item
                      );
                      question.answer = newA;
                      return newA;
                    }
                    question.answer = prevSelected;
                    return prevSelected;
                  });
                }}
                value={choice}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={answer.includes(choice)}
                    onClick={() => {
                      handleCheckboxChange(choice);
                    }}
                  />
                }
                label={`Select Choice ${ind + 1}`}
              />
            </Grid>
          ))}
        {!isImage && (
          <Grid
            display={"flex"}
            justifyContent={"center"}
            gap={4}
            alignContent={"center"}
            item
            xs={12}
            sm={6}
          >
            <Fab
              size="small"
              centerRipple
              color="primary"
              onClick={handleChoiceCount}
            >
              <AddIcon />
            </Fab>
            {choiceValue.length > 1 && (
              <Fab
                size="small"
                centerRipple
                color="error"
                onClick={handleRemoveChoice}
              >
                <RemoveIcon />
              </Fab>
            )}
          </Grid>
        )}
        {isImage && (
          <>
            <Grid item xs={6} sx={6}>
              {choiceValue &&
                choiceValue.map((ch, id) => (
                  <ChoiceUploadContext.Provider
                    value={{
                      choiceValue,
                      setSelected,
                      selected,
                      setChoiceValue,
                      question,
                    }}
                  >
                    <Checkbox
                      checked={answer.includes(id)}
                      onChange={() => {
                        handleCheckboxChange(id);
                      }}
                    />
                    <ChoiceUploader src={ch} index={id} />
                  </ChoiceUploadContext.Provider>
                ))}
            </Grid>
            <Grid
              display={"flex"}
              justifyContent={"center"}
              alignItems={"flex-end"}
              gap={3}
              item
              xs={6}
              sx={6}
            >
              <Fab
                size="small"
                centerRipple
                color="primary"
                onClick={handleChoiceCount}
              >
                <AddIcon />
              </Fab>
              {choiceValue.length > 1 && (
                <Fab
                  size="small"
                  centerRipple
                  color="error"
                  onClick={handleRemoveChoice}
                >
                  <RemoveIcon />
                </Fab>
              )}
            </Grid>
          </>
        )}
      </>
    );
  }
);
const ChoiceUploadContext = createContext();
export const UseChoiceImage = () => {
  return useContext(ChoiceUploadContext);
};

export default Choices;
