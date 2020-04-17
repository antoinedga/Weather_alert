const express = require("express");
const router = express.Router();
const hour_db = require('../../Model/Hours');

var passport = require('passport');

router.get("/user_hour", passport.authenticate('jwt', { session: false }), (req, res) => {
    hour_db.findOne({user_id: req.user._id}).then(hours_opt => {
        
        if(!hours_opt) {
            return res.status(404).json({ created: false});
        }
        res.status(200).send({success: true, users_opt: hours_opt});
        
    });
});

router.post("/set_hours", passport.authenticate('jwt', { session: false }),(req, res) => {
    var values = req.body.hours_opt;

    hour_db.find({user_id : req.user._id}).then((result) => {
        console.log(result);
        if (result == null) {

            var hours_obj = new hour_db({
                hours : values,
                user_id : req.user._id,
            }); 
            hours_obj.save()
            .then(
                result => res.status(200).send({success: true})
                )
            .catch(err => {
                res.status(400).json(
                {success: false,
                error: err});
                console.log(err);
            });
        }
        else {
            hour_db.findOneAndUpdate({user_id : req.user._id}, {hours: values}).then(
                result => res.status(200).send({success: true, update: true})
                )
            .catch(err => {
                res.status(400).json(
                {success: false,
                error: err});
                console.log(err);
            });
        }
        

    })
    
    
});

// router.delete('/delete')
router.put("/update_hours", passport.authenticate('jwt', {session: false}), (req, res) => {
    var new_hours = req.body.hours_opt;
  
    hour_db.findOne({user_id: req.user._id}).then(hours_opt => {
       if(!hours_opt) {

        var hours_obj = new hour_db({
            hours : new_hours,
            user_id : req.user._id,
        });

        hours_obj.save()
        .then(result => 
            res.status(201)
                .send({success: true, updated: false}))

        .catch(err => {
            res.status(400).json(
            {success: false,
            error: err});
            console.log(err);
        });
       }
       else {

        hours_opt.hours = new_hours;

        hours_opt.save()
        .then(result => res.status(201).send({success: true, updated: true}))
        .catch(err => {
            res.status(400).json(
            {success: false,
            error: err});
            console.log(err);
        });

       }
       

    });
    
});

router.delete("/deleteHours", passport.authenticate('jwt', { session: false }), (req, res) => {
    hour_db.findOneAndDelete({user_id: req.user._id}).then((result) => {
        
        return res.status(200).json({ success: true});
        
    }).catch((error) => {
       return res.status(200).send({success: false, error: error}); 
    });
});


module.exports = router;