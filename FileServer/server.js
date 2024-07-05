const express = require("express");
const xlsx = require("xlsx");
const upload = require("./imageStorage");
const cors = require("cors");
const fs = require("fs");
const uploadExcel = require("./excelStorage");
const { default: axios } = require("axios");
const { BACKEND_SERVER } = require("./data");
const app = express();
const PORT = 4000;
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static("Images"));
app.use(express.static("Excel"));
app.post("/api/post/image", upload.single("qimage"), (req, res) => {
  console.log(req.file);
  if (req.file) {
    res.json({ file: req.file });
    return;
  }
  console.log("error ", req.file);
  res.json({ file: "error" });
});

app.post("/api/post/excel", uploadExcel.single("excel"), (req, res) => {
  const { file } = req;
  const { filename, destination } = file;
  console.log(filename, destination);
  if (file) {
    const workbook = xlsx.readFile(`${destination}/${filename}`);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const range = xlsx.utils.decode_range(worksheet["!ref"]);
    for (let row = range.s.r + 1; row <= range.e.r; row++) {
      let data = [];
      for (let col = range.s.c; col <= range.e.c; col++) {
        let cell = worksheet[xlsx.utils.encode_cell({ r: row, c: col })];
        if (!cell) continue;
        try {
          data.push(cell.v);
        } catch (e) {
          console.log(e);
        }
      }
      if (data.length === 12) {
        axios
          .post(BACKEND_SERVER + "/api/user/register", {
            name: data[0],
            password: data[1],
            userid: data[2],
            role: data[3],
            phone_number: data[4],
            parents_number: data[5],
            address: data[6],
            father_name: data[7],
            mother_name: data[8],
            standard: data[9],
            institute_name: data[10],
            gender: data[11],
          })
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
        console.log(data);
      }
    }
    res.json({ file: file });
    return;
  }
  console.log("error ", file);
  res.json({ file: "error" });
});

app.get("/Images/:name", (req, res) => {
  console.log(req.params);

  fs.readFileSync(`./Images/${req.params.name}`, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ file: "error" });
      return;
    }
    console.log(data);
  });
});

app.get("/getTemplate", (req, res) => {
  res.download('./Excel/Template_for_Student_Info.xlsx');
});

app.post("/studentPerformace", (req, res) => {
  const { institute } = req.body;
  res.json({ institute: institute });
})

app.listen(PORT, () => {
  console.log(`Port ${PORT} is running`);
});
