const mongoose = require('mongoose')

const ChemicalTank = require('../models/ChemicalTank')

exports.chemicaltank_get_all = (req,res,next) => {
    ChemicalTank.find()
    .select('_id date time specific_gravity residual_chemicals temp type_chemical picture')
    .exec()
    .then(chemicaltank => {
        let allchemtank = {
            count: chemicaltank.length,
            tankNo: chemicaltank.map(chemicaltanks => {
                return {
                    _id: chemicaltanks._id,
                    date: chemicaltanks.date,
                    time: chemicaltanks.time,
                    specific_gravity: chemicaltanks.specific_gravity,
                    residual_chemicals: chemicaltanks.residual_chemicals,
                    temp: chemicaltanks.temp,
                    type_chemical: chemicaltanks.type_chemical,
                    picture: chemicaltanks.picture,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8081/'
                    }
                }
            })
        }
        res.status(200).json(allchemtank)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}

exports.chemicaltank_create_chemicaltank = (req,res,next) => {
    const chemical = new Chemical({
        _id: new mongoose.Types.ObjectId(),
        date: req.body.date,
        time: req.body.time,
        specific_gravity: req.body.specific_gravity,
        residual_chemicals: req.body.residual_chemicals,
        temp: req.body.temp,
        type_chemical: req.body.type_chemical,
        picture: req.body.picture
    })
    chemical
    .save()
    .then(result => {
        console.log(result)
        res.status(200).json({
            message: 'Create Profuct successfully',
            createChemTank : {
                _id: result._id,
                date: result.date,
                time: result.time,
                specific_gravity: result.specific_gravity,
                residual_chemicals: result.residual_chemicals,
                temp: result.temp,
                type_chemical: result.type_chemical,
                picture: result.picture
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
}

exports.chemicaltank_get_chemicaltank = (req,res,next) => {
    const id = req.params.chemicaltankId
    ChemicalTank.findById(id)
    .select('_id date time specific_gravity residual_chemicals temp type_chemical picture')
    .exec()
    .then(doc => {
        console.log('From data base',doc)
        if(doc){
            res.status(200).json({
                chemicalTank: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8081/'
                }
            })
        }else{
            res.status(404).json({
                message: 'No valid entry for chemID'
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}

exports.chemicaltank_delete_chemicaltank = (req,res,next) => {
    let id = req.params.chemicaltankId
    ChemicalTank.remove({_id: id})
    .exec()
    .then(result => {
        console.log('Deleted',result)
        res.status(200).json({
            message: 'Deleted',
            request: {
                tpye: 'POST',
                url: 'http://localhost:8081/',
                body: {
                    message: 'eiei'
                }
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(200).json({
            error: err
        })
    })
}

exports.chemicaltank_update_chemicaltank = (req,res,next) => {
    let id = req.params.chemicaltankId
    let updateOps = {}
    for(let ops of req.body){
        updateOps[ops.chemicalTanks] = ops.value
    }
    ChemicalTank.update({_id: id},{$set: updateOps})
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json({
            message: 'Updated',
            resquest: {
                type: 'GET',
                url: 'http://localhost:8081/product/' + result._id
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}