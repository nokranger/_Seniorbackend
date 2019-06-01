const mongoose = require('mongoose')
const startSchema = mongoose.Schema({
    date: {
        type: Date,
        require: true,
        default: Date.now
    },
    status: {
        type: Boolean
    },
    isTimeOut: {
        type: Boolean
    }
})

module.exports = mongoose.model('Start',startSchema)