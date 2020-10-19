var express = require('express')
const con = require('../db')
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

homeRoute.post('/addQuote', (req, res) => {
    var request_id = req.body.request_id
    var services = JSON.stringify(req.body.services)
    var note = req.body.note
    var id = req.body.id

    if (id && services && note && request_id) {
        connection.query("INSERT INTO quote(request_id,services,note,mechanic_id) VALUES($1,$2,$3,$4)", [request_id, services, note, id], (error, result) => {
            if (error) {
                res.send({
                    success: false,
                    message: error.message
                })
            }
            else {
                res.send({
                    success: true,
                    message: "Quote Added"
                })
            }
        })
    }
    else {
        res.send({
            success: false,
            message: "missing fields"
        })
    }
})

homeRoute.post('/getQuote', (req, res) => {
    var id = req.body.request_id

    if (id) {
        connection.query("SELECT * FROM quote WHERE request_id = $1 ", [id], (error, result) => {
            if (error) {
                res.send({
                    success: false,
                    message: error.message
                })
            }
            else {
                res.send({
                    success: true,
                    message: "Quote Fetched",
                    quotes: result.rows.map((item) => {
                        return ({
                            ...item,
                            services: JSON.parse(item.services)
                        })
                    })
                })
            }
        })
    }
    else {
        res.send({
            success: false,
            message: "missing fields"
        })
    }
})

homeRoute.post('/getMyQuote', (req, res) => {
    var id = req.body.id

    if (id) {
        connection.query("SELECT * FROM quote WHERE mechanic_id = $1 ", [id], (error, result) => {
            if (error) {
                res.send({
                    success: false,
                    message: error.message
                })
            }
            else {
                res.send({
                    success: true,
                    message: "Quote Fetched",
                    quotes: result.rows.map((item) => {
                        return ({
                            ...item,
                            services: JSON.parse(item.services)
                        })
                    })
                })
            }
        })
    }
    else {
        res.send({
            success: false,
            message: "missing fields"
        })
    }
})

homeRoute.post('/editQuote', (req, res) => {
    var request_id = req.body.request_id
    var services = JSON.stringify(req.body.services)
    var note = req.body.note
    var id = req.body.id

    if (id && services && note && request_id) {
        connection.query("UPDATE quote SET services = $1,note = $2 WHERE request_id = $3 AND mechanic_id = $4", [services, note, request_id, id], (error, result) => {
            if (error) {
                res.send({
                    success: false,
                    message: error.message
                })
            }
            else {
                res.send({
                    success: true,
                    message: "Quote Updated"
                })
            }
        })
    }
    else {
        res.send({
            success: false,
            message: "missing fields"
        })
    }
})

homeRoute.post('/scheduleService', (req, res) => {

    var location = JSON.stringify(req.body.location)
    var appointment = req.body.appointment
    var mechanic_id = req.body.mechanic_id
    var request = JSON.stringify(req.body.request)
    var services = JSON.stringify(req.body.services)
    var id = req.body.id

    if (location && appointment && mechanic_id && request && services && id) {
        //connection.query("INSERT INTO services")
    }
    else {
        res.send({
            success: false,
            message: "missing fields"
        })
    }
})

module.exports = homeRoute