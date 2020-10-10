var { Client } = require('pg');

//const connectionString = 'postgres://postgres:root@localhost:5432/moneyUp'

var con = new Client({
    user: "postgres",
    password: "root1234",
    database: "postgres",
    port: 5432,
    host: "mechaniczuse.c3hwmtfmlowy.us-east-2.rds.amazonaws.com",
    //ssl: { rejectUnauthorized: false }

});

con.connect()
module.exports = con