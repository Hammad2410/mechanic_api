var express = require('express')
var connection = require('../db')
var signinRoute = express.Router()
var cloudinary = require('../cloudinary')
var { upload } = require('../image-uploads')
var fs = require('fs')

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

signinRoute.post("/setAvailability", (req, res) => {

    var id = req.body.id
    var time = JSON.stringify(req.body.time)

    connection.query('UPDATE users SET "time" = $1 WHERE id = $2', [time, id], (error, result1) => {
        if (error) {

            res.send({
                success: false,
                message: error.message
            })

        }
        else {

            res.send({
                success: true,
                message: "Time is inserted"
            })

        }

    })

})

signinRoute.post('/chooseOccupation', (req, res) => {
    var tools = req.body.tools
    var category = req.body.category
    var service = req.body.service
    var id = req.body.id

    if (tools && category && service && id) {
        connection.query("UPDATE users SET tools = $1, category = $2, service = $3 WHERE id = $4", [tools, category, service, id], (error, result) => {
            if (error) {
                res.send({
                    success: false,
                    message: error.message
                })
            }
            else {
                res.send({
                    success: true,
                    message: "Service Added"
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

signinRoute.post('/postCertificate', (req, res) => {
    var id = req.body.id
    var lic_country = req.body.lic_country
    var lic_state = req.body.lic_state
    var lic_number = req.body.lic_number
    var vat_number = req.body.vat_number
    var lic_expiry = req.body.lic_expiry
    var specialization = req.body.specialization
    var award = req.body.award
    var award_year = req.body.award_year

    if (id && lic_country && lic_state && lic_number && vat_number && lic_expiry) {
        connection.query("INSERT INTO certificates(user_id, lic_country, lic_state, lic_number, vat_number, lic_expiry, specialization, award, award_year) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [id, lic_country, lic_state, lic_number, vat_number, lic_expiry, specialization, award, award_year], (error, result) => {
            if (error) {
                res.send({
                    success: false,
                    message: error.message
                })
            }
            else {
                res.send({
                    success: true,
                    message: "certificate added"
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

signinRoute.post('/getCertificates', (req, res) => {
    var id = req.body.id

    if (id) {
        connection.query("SELECT * from  certificates WHERE user_id = $1", [id], (error, result) => {
            if (error) {
                res.send({
                    success: false,
                    message: error.message
                })
            }
            else {
                res.send({
                    success: true,
                    message: "certificate fetched",
                    certificate: result.rows
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

signinRoute.post("/updateProfileImage", upload.single("image"), (req, res) => {
    var id = req.body.id
    var path = req.file.path

    if (id && path) {

        cloudinary.uploads(path, 'profile').then((image) => {
            fs.unlinkSync(path)
            connection.query("UPDATE users SET image = $1 WHERE id = $2", [image.url, id], (error, result) => {
                if (error) {
                    res.send({
                        success: false,
                        message: error.message
                    })
                }
                else {
                    res.send({
                        success: true,
                        message: "Profile Image updated"
                    })
                }
            })
        }).catch((error) => {
            res.send({
                success: false,
                message: error.message
            })
        })
    }
    else {
        res.send({
            success: false,
            message: "missing fields"
        })
    }
})




module.exports = signinRoute