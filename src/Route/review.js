var express = require('express')
var connection = require('../db')
var reviewRoute = express.Router()


reviewRoute.post("/get_review", (req, res) => {


    var id = req.body.id

    connection.query("SELECT * FROM review WHERE user_id = $1", [id], (error, result) => {

        if (error) {
            res.send({
                success: false,
                message: error.message
            })
        }

        else {
            res.send({
                success: true,
                message: 'review Fetched',
                review: result.rows
            })
        }

    })

})

reviewRoute.post("/Add_review", (req, res) => {

    var id = req.body.id
    var user_id = req.body.user_id
    var review_id = req.body.review_id
    var review = req.body.review

    connection.query("Insert INTO review(user_id,review_id,review)  VALUES($1,$2,$3) ", [user_id, review_id, review], (error1, result1) => {

        if (error1) {

            res.send({
                success: false,
                message: error1.message
            })
        }
        else {

            res.send({
                success: true,
                message: "review Entered"
            })

        }

    })
})

module.exports = reviewRoute