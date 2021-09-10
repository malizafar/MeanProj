const express = require('express');
const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;
const employee = require('../model/employees.js');
//get, post, push, delete
// base path: http://localhost:3000/employees



//Get Single Api
router.get('/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        employee.findById(req.params.id, (err, doc) => {
            if (err) {
                console.log('Error in get Employee By' + err)
            } else {
                res.send(doc);
            }
        });
    } else {
        res.status(400).send('no record found' + req.params.id)
    }
});

//Put Api
router.put('/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {

        let emp = {
            name: req.body.name,
            position: req.body.position,
            dept: req.body.dept
        };

        employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
            if (err) {
                console.log('Error in Update Employee By' + err)
            } else {
                res.send(doc);
            }
        });
    } else {
        res.status(400).send('no record found' + req.params.id)
    }
});


//Delete Api
router.delete('/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        employee.findByIdAndRemove(req.params.id, (err, doc) => {
            if (err) {
                console.log('Error in Delete Employee By' + err)
            } else {
                res.send(doc);
            }
        });
    } else {
        res.status(400).send('no record found' + req.params.id)
    }
});


//Get Api
router.get('/', (req, res) => {
    employee.find((err, doc) => {
        if (err) {
            console.log('Error in get data' + err)
        } else {
            res.send(doc);
        }
    })
});

//Post Api
router.post('/', (req, res) => {
    let emp = new employee({
        name: req.body.name,
        position: req.body.position,
        dept: req.body.dept
    });
    emp.save((err, doc) => {
        if (err) {
            console.log('Error in post data' + err);
        } else {
            res.send(doc)
        }
    });
});





module.exports = router;