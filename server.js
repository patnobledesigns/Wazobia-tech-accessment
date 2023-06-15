import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.split(".");
    ext = ext[ext.length - 1];
    cb(null, `${Date.now()}.${ext}`);
  },
});
const upload = multer({ storage: storage });
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use([
  express.static("images"),
  express.json(),
  cors(corsOptions),
  upload.array("files"),
]);

app.post("/upload_files", (req, res) => {
  if (req.files.length > 0) {
    res.json(req.files[0]);
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
