const express = require("express");
const router = express.Router();
const axios = require('axios');
const hour_db = require('../../Model/Hours');
const user_db = require('../../Model/User');

var passport = require('passport');

router.get("/forecast", passport.authenticate('jwt', { session: false }),(req, res) => {
    user_db.findOne({_id: req.user._id}, "latitude longitude").then(user_location => {

        axios.get(`https://api.darksky.net/forecast/45c728b209f56c190b3e3f3078aa6812/${user_location.latitude},${user_location.longitude}?exclude=currently,flags,daily`)
         .then(result => {
             var temp  = {
                 hour : result.data.hourly.data.slice(0, 24),
                 minute: result.data.minutely.data
             }
            return res.status(200).send(temp);})
         .catch(error => { 
             console.log(error)
             return res.status(404).send(error);
            });
        
    });
});

module.exports = router;