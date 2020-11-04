var app = require('./src/server')

const signinRoute = require('./src/Route/signin')
const newaccountRoute = require('./src/Route/newaccount')
const homeRoute = require('./src/Route/home')
const reviewRoute = require('./src/Route/review')

app.use('/services', homeRoute)
app.use('/profile', signinRoute)
app.use('/login', newaccountRoute)
app.use('/rate', reviewRoute)

app.get('/api', (req, res) => {
    res.send({
        success: true,
        message: "server is down"
    })
})

//app.get('/', (req, res) => {
//    res.sendFile(__dirname + '/index.html');
//});
