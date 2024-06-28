const express = require("express");
const upload = require("./imageStorage");
const cors = require("cors");
const app = express();
const PORT = 4000;
app.use(cors({ origin: "*" }));
app.use(express.json());
app.post("/api/post/image", upload.single("image"), (req, res) => {
  if (req.file) {
    res.json({ file: req.file });
    return;
  }
  res.json({ file: "error" });
});

app.listen(PORT, () => {
  console.log(`Port ${PORT} is running`);
});
