var express = require('express')
var app = express()
var multer = require('multer');
var upload = multer();
const http = require("http").createServer(app);
var io = require('socket.io')(http)


app.use(upload.array());
app.use(express.static('public'));
app.use(express.json({ limit: '250mb' }))

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const port = process.env.PORT || 8082;

http.listen(port, () => console.log(`Listering on port ${port}`))


module.exports = app