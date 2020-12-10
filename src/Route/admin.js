var express = require('express')
const con = require('../db')
var connection = require('../db')
var adminRoute = express.Router()

adminRoute.get('/getUsers', (req, res) => {
    connection.query("SELECT * FROM users WHERE role IS NOT NULL", (error, result) => {
        if (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
        else {
            res.send({
                success: true,
                message: "Users fetched",
                users: result.rows
            })
        }
    })
})

adminRoute.get('/getOrders', (req, res) => {
    connection.query("SELECT * FROM services", (error, result) => {
        if (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
        else {
            res.send({
                success: true,
                message: "Orders fetched",
                orders: result.rows.map((item) => {
                    return ({
                        ...item,
                        request: JSON.parse(item.request),
                        services: JSON.parse(item.services),
                        location: JSON.parse(item.location)
                    })
                })
            })
        }
    })
})

module.exports = adminRoute