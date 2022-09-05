const { Router } = require('express');
const express = require('express');
const multer = require('multer');
const app = express();

const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            // diem den khi tai file len server
            cb(null, 'upload')
        },
        filename: (req, file, cb) => {
            const filename = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, filename + '-' + file.originalname)
        }
    }
)

const upload = multer({ storage: storage })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/upload.html')
})

// upload single file
app.post('/uploadfile', upload.single('formFile'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Upload file again');
        error.httpStatusCode = 400;
        return next(error)
    }

    res.sendFile(__dirname + `/upload/${req.file.filename}`)
})

//upload multi file

app.post('/uploadmultiple', upload.array('formFileMultiple', 3), (req, res, next) => {
    const files = req.files;
    if (!files) {
        const error = new Error('Upload files again');
        error.httpStatusCode = 400;
        return next(error)
    }
    res.sendFile(__dirname + `/upload/${req.file.filename}`)
})

app.listen(4000, () => {
    console.log('server is running 4000')
})