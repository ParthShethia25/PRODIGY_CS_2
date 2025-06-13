// server.js (BACKEND)
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { execFile } = require("child_process");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use("/encrypted", express.static(path.join(__dirname, "encrypted")));
app.use("/decrypted", express.static(path.join(__dirname, "decrypted")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post("/process", upload.single("image"), (req, res) => {
  const { operation, key } = req.body;
  const inputPath = req.file.path;
  const outputFileName = `${Date.now()}_${operation}.png`;
  const outputDir = operation === "encrypt" ? "encrypted" : "decrypted";
  const outputPath = path.resolve(__dirname, outputDir, outputFileName);

  execFile(
    path.resolve(__dirname, "encrypt_tool.exe"),
    [operation, inputPath, outputPath, key],
    (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Error executing encrypt_tool:", error);
        return res.status(500).json({ message: "Processing failed" });
      }
      console.log("✅ Process complete:", stdout);
      res.json({
        imageUrl: `http://localhost:5000/${outputDir}/${outputFileName}`,
      });
    }
  );
});

app.post("/ping", (req, res) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
