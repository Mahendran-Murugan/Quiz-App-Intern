import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { insertAction } from "../feature/imageQuizSlice";
import { Stack } from "@mui/material";
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

export default function Uploader({ index, src }) {
  const selector = useSelector((state) => state.imageFiles.data);
  const dispatch = useDispatch();

  const [image, setImage] = React.useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file); // Convert image to base64 string
    }
    dispatch(
      insertAction({
        index: index,
        qimage: file,
      })
    );
    // console.log(selector );
    // console.log(selector);
  };
  // console.log(selector);

  return (
    <Stack spacing={0} m={2}>
      {src && src != "none" && (
        <img
          src={FILE_SERVER + "/" + src}
          style={{ maxWidth: "100%", maxHeight: "300px" }}
        />
      )}
      {image && (
        <img src={image} style={{ maxWidth: "100%", maxHeight: "300px" }} />
      )}
      <Button
        onChange={handleFileChange}
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
