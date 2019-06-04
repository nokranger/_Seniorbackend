//--------------This is nodemodule---------------//
const express = require('express')
const route = express.Router()
const ChemicalTank = require('../models/ChemicalTank')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
route.use(bodyParser.json())

route.get('/get-all-chemical', (req, res) => {
    ChemicalTank.find()
    .select('_id date time specific_gravity residual_chemicals temp type_chemical picture')
    .exec()
    .then(chemicaltank => {
            chemicaltank.map(chemicaltanks => {
                return {
                    _id: chemicaltanks._id,
                    date: chemicaltanks.date,
                    specific_gravity: chemicaltanks.specific_gravity,
                    residual_chemicals: chemicaltanks.residual_chemicals,
                    temp: chemicaltanks.temp,
                    type_chemical: chemicaltanks.type_chemical,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8081/'
                    }
                }
            })
        res.status(200).json(chemicaltank)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})
route.get('/get-last-chemicaltank', (req,res) => {
    ChemicalTank.find().then((d) => {
        let lastPos = d.length - 1
        res.send(d[lastPos])
    }, (e) => {
        res.status(400).send(e)
    })
})
route.post('/creat-chemical',(req, res) => {
    console.log('req is : ', req.body)
    // {"date" : "060119",
    // "time" : 123123,"specific_gravity" : "sg1","residual_chemicals" : "rc2","temp" : "t3","type_chemical" : "tc4","picture":"pp"}
    const chemical = new ChemicalTank({
        _id: new mongoose.Types.ObjectId(),
        date: req.body.date,
        specific_gravity: req.body.specific_gravity,
        residual_chemicals: req.body.residual_chemicals,
        temp: req.body.temp,
        type_chemical: req.body.type_chemical
    })
    chemical
    .save()
    .then(result => {
        console.log(result, 'ssss')
        res.status(200).json({
            message: 'Create Profuct successfully',
            createChemTank : {
                _id: result._id,
                date: result.date,
                specific_gravity: result.specific_gravity,
                residual_chemicals: result.residual_chemicals,
                temp: result.temp,
                type_chemical: result.type_chemical
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
    console.log(chemical)
})

module.exports = route