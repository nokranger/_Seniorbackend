const mongoose = require('mongoose')
const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    emp_Id: {
        type: String,
        unique: true,
        size: 10,
        require: true
    },
    name: {
        type: String,
        size: 30,
        require: true
    },
    lastname: {
        type: String,
        size: 30,
        require: true
    },
    position: {
        type: String,
        size: 30,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        require: true
    },
    tel: {
        type: Number,
        require: false,
    },
    picture: {
        type: String,
        require: false
    }
})
module.exports = mongoose.model('employee',employeeSchema)