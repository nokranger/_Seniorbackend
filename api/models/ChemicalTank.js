const mongoose = require('mongoose')
const ChemicalTankSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: {
        type: Date,
        require: true,
        default: Date.now
    },
    time: {
        type: Number,
        require: true,
    },
    specific_gravity: {
        type: Number,
        require: true
    },
    residual_chemicals: {
        type: Number,
        require: true
    },
    temp: {
        type: Number,
        require: true
    },
    type_chemical: {
        type: String,
        require: true
    },
    picture: {
        type: String,
        require: false
    }
})
module.exports = mongoose.model('chemicaltank',ChemicalTankSchema)