let express = require("express");
let app = express();
let port = 3000;
let fs = require("fs");
const path = require("path");

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Serve uploaded files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const multer = require("multer");

// Setup storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/upload", upload.array("file"), (req, res) => {
  // Wait until all files are processed before sending the response
  // let files = req.files;
  // if (!files) {
  //   return res.status(400).send("no file uploaded");
  // }

  res.send("upload successfully");
});

// Endpoint to list uploaded files
app.get("/files", (req, res) => {
  fs.readdir(path.join(__dirname, "uploads"), (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Unable to scan directory" });
    }
    res.json(files);
  });
});

// Endpoint for deleting image
app.delete("/delete/:filename", (req, res) => {
  let filePath = path.join(__dirname, "uploads", req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ error: "Unable to delete file" });
    }
    return res.json({ message: "file deleted successfully" });
  });
});

app.listen(port, (error) => {
  if (error) {
    console.log("something went wrong", error);
  } else {
    console.log("port is listeing", port);
  }
});
