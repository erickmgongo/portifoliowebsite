const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');

//importing the model
let Profile = require('../../Models/Profile');
mongoose.set('useFindAndModify', false);

//GETTING ALL DATA

router.get('/', (req,res) => {
    //Querying through model

    Profile.find({}, (err,profile) => {
    if (err) {
        res.status(404,{msg: 'The services were not found'});
    }else {
        
        res.render('auth/addskill');
    }
});
    
  
});

//SINGLE DOC
router.get('/:s', (req,res) => {
    //Querying through model

    Profile.find({}, (err,profile) => {
        if (err) {
            res.status(404,{msg: 'The services were not found'});
        }else {
            
            res.json(profile);
        }
    });
    
  
});

router.put('/:s', (req,res) => {
    //Querying through model
    var newprof = req.body;
    Profile.findOneAndUpdate({}, newprof, {upsert: true},(err,prof) => {
        if (err) {
            throw err;
        }else {
             res.send("you updated successful");
        }
    });
    
  
});
module.exports = router;
