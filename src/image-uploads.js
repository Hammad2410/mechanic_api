var express = require('express')
var app = express()
var multer = require('multer')
var cloudinary = require('cloudinary')
var bodyParser = require('body-parser')
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

cloudinary.config({
    cloud_name: 'dfnwr2zzm',
    api_key: '934236885457255',
    api_secret: 'CVPPgEUTrzj9OkxCKGofIS_IFio'
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage });

module.exports = {
    upload,
}