const express = require("express");
const upload = require("./imageStorage");
const cors = require("cors");
const fs = require("fs");
const uploadExcel = require("./excelStorage");
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
  console.log(req.file);
  if (req.file) {
    res.json({ file: req.file });
    return;
  }
  console.log("error ", req.file);
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

app.listen(PORT, () => {
  console.log(`Port ${PORT} is running`);
});
