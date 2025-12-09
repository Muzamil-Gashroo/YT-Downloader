# YouTube URL Downloader API

A Node.js backend service that downloads YouTube videos using **yt-dlp**, uploads them to **Cloudinary**, and stores download history in **MongoDB**.  
Fully deployable on **Render**, including support for YouTube cookies to bypass bot verification.

---

##  Features

-  Download YouTube videos using `yt-dlp`
-  Upload downloaded media to **Cloudinary**
-  Save download info in **MongoDB**
-  Generate unique filenames using UUID
-  Temporary server-side storage
-  Supports **YouTube cookies** (required on cloud servers)
-  CORS-enabled backend API

---

## Tech Stack

- Node.js  
- Express.js  
- yt-dlp-exec  
- Cloudinary  
- MongoDB + Mongoose  
- UUID  

---

## 🔧 Environment Variables

Create a `.env` file:

## API Endpoint

### **POST /download**




