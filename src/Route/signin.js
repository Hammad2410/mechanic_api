var express = require('express')
var connection = require('../db')
var signinRoute = express.Router()

signinRoute.post("/register", (req, res) => {

    var phone = req.body.phone
    var otp = 1111

    if (phone && otp) {
        connection.query("SELECT * FROM users WHERE phone = $1", [phone], (error, result) => {

            if (error) {
                res.send({
                    success: false,
                    message: error.message
                })
            }
            else {

                if (result.rows.length > 0) {
                    connection.query("UPDATE users SET otp = $1  WHERE phone = $2 ", [otp, phone], (error1, result1) => {

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
                    connection.query("Insert INTO users(Phone,otp)  VALUES($1,$2) ", [phone, otp], (error1, result1) => {

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
            }
        })
    }
    else {
        res.send({
            success: false,
            message: "Missing Fields"
        })
    }
})


signinRoute.post("/login", (req, res) => {

    var phone = req.body.phone
    var otp = req.body.otp

    connection.query("SELECT * FROM users WHERE phone= $1 AND otp=$2", [phone, otp], (error, result) => {

        if (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
        else {
            if (result.rows.length == 0) {
                res.send({
                    success: false,
                    message: "Invalid User Name or Password"
                })
            }
            else {
                res.send({
                    success: true,
                    message: "Login sucessfully",
                    user: result.rows[0]
                })
            }
        }
    })
})


module.exports = signinRoute