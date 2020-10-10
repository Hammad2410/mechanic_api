var express = require('express')
var connection = require('../db')
var homeRoute = express.Router()

homeRoute.post("/get_mechanics", (req, res) => {



    connection.query("SELECT * FROM users ", (error, result) => {

        if (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
        else {
            res.send({
                success: true,
                message: "User fetched",
                user: result.rows
            })
        }
    })
})

module.exports = homeRoute