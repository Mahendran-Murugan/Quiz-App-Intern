import CloudUpload from "@mui/icons-material/CloudUpload";
import { Button, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
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

export const UploadeXL = () => {
  const handleOnChange = (e) => {
    let formData = new FormData();
    formData.append("excel", e.target.files[0]);
    axios
      .post(FILE_SERVER + "/api/post/excel", formData)
      .then(
        (res) => {}
        // console.log(res.data)
      )
      .catch((err) => console.log(err));
    e.preventDefault();
  };

  return (
    <form onSubmit={handleOnChange}>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        type="submit"
      >
        <CloudUpload />
        &#12644; Upload From xlsx
        <VisuallyHiddenInput
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          type="file"
          onChange={handleOnChange}
        />
      </Button>
    </form>
  );
};
