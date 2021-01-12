// var app = require('./src/server')
// var cors = require('cors')

// const signinRoute = require('./src/Route/signin')
// const newaccountRoute = require('./src/Route/newaccount')
// const homeRoute = require('./src/Route/home')
// const reviewRoute = require('./src/Route/review')
// const adminRoute = require('./src/Route/admin')

// app.all('/*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
//     res.header("Access-Control-Allow-Methods", "GET, POST", "PUT");
//     next();
// });

// app.use(cors())
// app.use('/services', homeRoute)
// app.use('/profile', signinRoute)
// app.use('/login', newaccountRoute)
// app.use('/rate', reviewRoute)
// app.use('/admin', adminRoute)



// app.get('/api', (req, res) => {
//     res.send({
//         success: true,
//         message: "server is down"
//     })
// })

//app.get('/', (req, res) => {
//    res.sendFile(__dirname + '/index.html');
//});
