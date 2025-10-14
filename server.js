const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const Archive = require("./models/Archive") // your archive schema

const app = express()
app.use(cors())
app.use(express.json())

// Make uploads folder static
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/archiveDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error(err))

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads")
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath)
    cb(null, "uploads")
  },
  filename: (req, file, cb) => {
    const uniqueName = ${Date.now()}-${file.originalname}
    cb(null, uniqueName)
  }
})
const upload = multer({ storage })

// Upload file
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" })
  const fileUrl = ${req.protocol}://${req.get("host")}/uploads/${req.file.filename}
  res.json({ fileUrl })
})

// Get all archives
app.get("/api/archives", async (req, res) => {
  try {
    const archives = await Archive.find().sort({ createdAt: -1 })
    res.json(archives)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Add new archive
app.post("/api/archives", async (req, res) => {
  try {
    const newArchive = new Archive(req.body)
    const saved = await newArchive.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Update archive
app.put("/api/archives/:id", async (req, res) => {
  try {
    const updated = await Archive.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Delete archive
app.delete("/api/archives/:id", async (req, res) => {
  try {
    await Archive.findByIdAndDelete(req.params.id)
    res.json({ message: "Archive deleted" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Start server
const PORT = 5000
app.listen(PORT, () => console.log(Server running on port ${PORT}))
