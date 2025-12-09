require("dotenv").config();
const express = require("express");
const ytdlp = require("yt-dlp-exec");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const connectDB = require("./Connections/db");
const cloudinary = require("./Connections/cloudnary");
const Download = require("./Connections/downloadmodel");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();


const DOWNLOAD_DIR = "url_downloads";

if (!fs.existsSync(DOWNLOAD_DIR)) fs.mkdirSync(DOWNLOAD_DIR);

app.post("/download", async (req, res) => {

  try {
    const url = req.body.url;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const uid = uuidv4(); 
    const outTemplate = `url_downloads/${uid}.%(ext)s`;


    await ytdlp(url, { format: "best", output: outTemplate });

   
    const downloadedFiles = fs.readdirSync("url_downloads").filter(f => f.startsWith(uid));

    if (downloadedFiles.length === 0)

      return res.status(500).json({ error: "Downloaded file not found" });

    const fileName = downloadedFiles[0];

    const filePath = path.join("url_downloads", fileName);

    const uploaded = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      folder: "youtube_downloads"
    });

    const saved = await Download.create({
      fileName,
      fileUrl: uploaded.secure_url
    });

  
    fs.unlinkSync(filePath);

    res.json({
      status: "success",
      data: {
        id: saved._id,
        fileName: saved.fileName,
        fileUrl: saved.fileUrl
      }
    });

  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({
      error: "Download failed",
      details: error.message
    });
  }
});

app.listen(3000, () => console.log("Server On"));
