
var express = require('express')
const con = require('../db')
var connection = require('../db')
var newaccountRoute = express.Router()
//const shal = require('sha1')

newaccountRoute.post("/auth", (req, res) => {


    var name = req.body.name
    var email = req.body.email
    var gender = req.body.gender
    var role = req.body.role

    connection.query("SELECT * FROM users WHERE email = $1 ", [email], (error, result1) => {

        if (error) {

            res.send({
                success: false,
                message: error.message
            })

        }
        else if (result1.rows.length == 0) {
            if (name && email && gender && role) {
                connection.query("Insert INTO users(name,email,gender,role)  VALUES($1,$2,$3,$4) ", [name, email, gender, role], (error1, result1) => {
                    if (error1) {
                        res.send({
                            success: false,
                            message: error1.message
                        })
                    }
                    else {
                        res.send({
                            success: true,
                            message: "Users Registered"
                        })
                    }
                })
            }
            else {
                res.send({
                    success: false,
                    message: "Missing Fields"
                })
            }
        }
        else {
            res.send({
                success: false,
                message: "email already exists"
            })
        }
    })

})

module.exports = newaccountRoute