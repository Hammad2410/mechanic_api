var express = require('express')
var connection = require('../db')
var homeRoute = express.Router()

homeRoute.post("/get_mechanics", (req, res) => {



    connection.query("SELECT * FROM users WHERE role = 'mechanic' ", (error, result) => {

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

homeRoute.post("/postRequest", (req, res) => {
    var id = req.body.id
    var service = JSON.stringify(req.body.service)
    var vehicle_id = req.body.vehicle_id
    var time_frame = req.body.time_frame

    if (id && service && vehicle_id && time_frame) {
        connection.query("INSERT INTO request(vehicle_id,service,time_frame,user_id) VALUES($1,$2,$3,$4)", [vehicle_id, service, time_frame, id], (error, result) => {
            if (error) {
                res.send({
                    success: false,
                    message: error.message
                })
            }
            else {
                res.send({
                    success: true,
                    message: "request posted"
                })
            }
        })
    } else {
        res.send({
            success: false,
            message: "missing fields"
        })
    }
})

homeRoute.post("/addVehicle", (req, res) => {
    var id = req.body.id
    var brand = req.body.brand
    var model = req.body.model
    var reg_no = req.body.reg_no


    if (id && brand && model && reg_no) {
        connection.query("INSERT INTO vehicle(model,brand,reg_no,user_id) VALUES($1,$2,$3,$4)", [model, brand, reg_no, id], (error, result) => {
            if (error) {
                res.send({
                    success: false,
                    message: error.message
                })
            }
            else {
                res.send({
                    success: true,
                    message: "vehicle posted"
                })
            }
        })
    } else {
        res.send({
            success: false,
            message: "missing fields"
        })
    }
})

homeRoute.post('/getMyVehicles', (req, res) => {
    var id = req.body.id

    if (id) {
        connection.query("SELECT * FROM vehicle WHERE user_id = $1", [id], (error, result) => {
            if (error) {
                res.send({
                    success: false,
                    message: error.message
                })
            }
            else {
                res.send({
                    success: true,
                    message: "vehicles fetched",
                    vehicles: result.rows
                })
            }
        })
    } else {
        res.send({
            success: false,
            message: "missing fields"
        })
    }
})

homeRoute.post('/getMyRequests', (req, res) => {
    var id = req.body.id

    if (id) {
        connection.query("SELECT * FROM request WHERE user_id = $1", [id], (error, result) => {
            if (error) {
                res.send({
                    success: false,
                    message: error.message
                })
            }
            else {
                res.send({
                    success: true,
                    message: "requests fetched",
                    requests: result.rows.map((item) => {
                        return ({
                            ...item,
                            service: JSON.parse(item.service)
                        })
                    })
                })
            }
        })
    } else {
        res.send({
            success: false,
            message: "missing fields"
        })
    }
})

homeRoute.get('/getRequests', (req, res) => {


    connection.query("SELECT * FROM request ", (error, result) => {
        if (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
        else {
            res.send({
                success: true,
                message: "requests fetched",
                requests: result.rows.map((item) => {
                    return ({
                        ...item,
                        service: JSON.parse(item.service)
                    })
                })
            })
        }
    })

})

module.exports = homeRoute