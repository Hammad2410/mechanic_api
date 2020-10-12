var express = require('express')
var app = express()
app.use(express.json({ limit: '250mb' }))


const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Listering on port ${port}`))

module.exports = app 