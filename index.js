const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const multer = require('multer')
const AdministratorRoute = require("./routes/administrator")

const sampleData = {
    "appName": "cwc-user-manager-api",
    "isAPIRunning": "API Running Successfully",
    "dateOfStatus": new Date()
}

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/images', express.static('images'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `images/admin-${file.fieldname}-${Date.now()}.${ext}`)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

app.post('/api/upload', upload.single('file'), function (req, res) {
    res.json(req.file.filename)
})

app.get("/api/status", (req, res) => {
    res.send(sampleData)
})

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to Mongo Database successfully")
    })
    .catch(error => {
        console.log("Error Connecting in Mongo Database")
    })

app.use("/api/administrator", AdministratorRoute)

const PORT = process.env.PORT || 9999;

app.listen(PORT, () => {
    console.log(`SERVER STARTED WITH PORT : ${PORT}`)
    console.log(`HOST URL IS : ${process.env.HOST_URL}`)
})