import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { editGender, editRole, editStudent } from "../feature/registerSlice";
import { InputLabel } from "@mui/material";

export default function MySelection({ collection, placeholder, text }) {
  const theme = useTheme();

  const [names, setNames] = React.useState(placeholder);
  const [value, setValue] = React.useState([]);
  const dispatcher = useDispatch();
  const selector = useSelector((s) => s.register.student_data);
  const handleChange = (event) => {
    switch (text) {
      case "gender": {
        dispatcher(editGender(event.target.value));
        setNames(event.target.value);
        break;
      }
      case "role": {
        dispatcher(editRole(event.target.value));
        setNames(event.target.value);
        break;
      }
    }
  };

  return (
    <span>
      <FormControl sx={{ m: 1, width: "90%" }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          {placeholder}
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={names}
          onChange={handleChange}
          autoWidth
          label={placeholder}
        >
          {collection.map((e) => (
            <MenuItem value={e}>{e}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </span>
  );
}
