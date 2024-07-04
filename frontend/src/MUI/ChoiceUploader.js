import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { insertAction } from "../feature/imageQuizSlice";
import { Checkbox, FormControlLabel, Radio, Stack } from "@mui/material";
import { UseChoiceContext } from "../ManageQuiz/Form";
import { UseChoiceImage } from "../ManageQuiz/Choices";
import { FILE_SERVER } from "../data";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function ChoiceUploader({ index, src }) {
  const { choiceValue, setChoiceValue, question, selected, setSelected } =
    UseChoiceImage();
  const [image, setImage] = React.useState(null);

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    // setChoiceValue([...choiceValue, choiceValue.splice(index, 1, file)]);
    const newA = [...choiceValue];
    newA.splice(index, 1, file);
    question.choices[index] = file;
    setChoiceValue(newA);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file); // Convert image to base64 string
    }
  };

  return (
    <Stack spacing={0} m={2}>
      {
        <>
          {src && src != "none" && !(src instanceof File) ? (
            <img
              src={`${FILE_SERVER}/${src}`}
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
          ) : (
            <img src={image} style={{ maxWidth: "100%", maxHeight: "300px" }} />
          )}
        </>
      }

      <Button
        onChange={(e) => handleFileChange(e)}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
      >
        <CloudUploadIcon />
        <VisuallyHiddenInput accept="image" type="file" />
      </Button>
    </Stack>
  );
}
