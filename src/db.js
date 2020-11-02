var { Client } = require('pg');

//const connectionString = 'postgres://postgres:root@localhost:5432/moneyUp'

var con = new Client({
    user: "hmuyeifesnsrkh",
    password: "c4b721c0a7c85c6c7bba6a73410dc14b6fa93640e727848377079a61f535ea5a",
    database: "d3kpet623jfn9g",
    port: 5432,
    host: "ec2-54-90-68-208.compute-1.amazonaws.com",
    ssl: { rejectUnauthorized: false }

});

con.connect()
module.exports = con