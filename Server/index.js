const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/process', upload.single('image'), (req, res) => {
    const { key, action } = req.body;
    const inputPath = req.file.path;
    const outputPath = `${inputPath}_out.png`;

    const cmd = `./backend/build/image_encryption ${action} ${inputPath} ${outputPath} ${key}`;
    exec(cmd, () => {
        res.download(outputPath, () => {
            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);
        });
    });
});

app.listen(5000, () => console.log("Server started on :5000"));
