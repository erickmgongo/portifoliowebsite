const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');

//importing the model
let Project = require('../../Models/Project');
let Skills = require('../../Models/Skill');


//GETTING ALL THE PROJECTS
router.get('/', (req,res) => {
    //Querying through model

    Project.find({}, (err,projects) => {
    if (err) {
        res.status(404,{msg: 'The services were not found'});
    }else {
       
        res.render('auth/Project/allproject',{projects});
    }
})
    
  
});

router.get('/add', (req,res) => {
    //Querying through model

    Skills.find({}, (err,skills) => {
    if (err) {
       
        res.status(404,{msg: 'The message were not found'});
    }else {
       
        res.render('auth/Project/addproject',{skills});
    }
   
})
    
  
});

//ADDING A NEW PROJECT
router.post('/', (req,res) => {

    Project.count({}, function(err,count){
        county = count;
       req.body.id = county + 1;
       
       
    var newproject = new Project(req.body);

    newproject.save( (err,doc) => {
        if (err) throw err;

        if(doc) {
             res.send(newproject);
        }
    })
});
});

//GETTING A SINGLE PROJECT
router.get('/:id', function(req,res){

    Project.find({}, (err,projects) => 
    {
        if (err) {
             throw err;
             
        }
        else if (projects){
            let project = projects[req.params.id - 1];
            console.log(project);
            res.render('auth/Project/singleproject',{project});
        }
    });
});


//GETTING A SINGLE PROJECT FORM
router.get('edit/:id', function(req,res){

    Project.find({'id' : req.params.id}, (err,project) => 
    {
        if (err) throw err;

        if (project){
            res.render('auth/Project/updateproject');
        }
    });
});


//UPDATING A SPECIFIED PROJECT
router.put('/:id', (req,res) => {
    let update = req.body;

    Project.findOneAndUpdate({'id':req.params.id }, update , (err,success) => {
        if (err) throw err;

        if (success) {
            res.send(update);
        }
    });
});

//DELETE THE SPECIFIED PROJECT
router.delete('/:id', (req,res) => {
    Project.findOneAndDelete({'id':req.params.id },(err,success) => {
        if (err) throw err;

        if (success) {
            res.send('successfuly deleted ');
        }
    });
})


module.exports = router;
