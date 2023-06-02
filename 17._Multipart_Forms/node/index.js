import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const app = express();
app.use(express.static("public"));

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.array("files"), (req, res) => {
    const files = req.files;

    files.forEach((file) => {

    const filename = uuidv4() + file.originalname;
    const path = "uploads/" + filename;

    fs.renameSync(file.path, path);
    console.log("File uploaded successfully", filename);
    });

    res.json({ message: "File(s) uploaded successfully" });
});
 
app.listen(3000, () => console.log("Server started on port 3000")); 
