const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Employee = require('../models/employee')

exports.employee_get_all = (req,res,next) => {
    Employee.find()
    .select('_id emp_Id name lastname position email password tel picture')
    .exec()
    .then(employee => {
        let allemployee = {
            count: employee.length,
            useremployee: employee.map(employees => {
                return {
                    _id: employees._id,
                    empId: employees.emp_Id,
                    email: employees.email,
                    password: employees.password,
                    name: employees.name,
                    lastname: employees.lastname,
                    position: employees.position,
                    tel: employees.tel,
                    picture: employees.picture
                }
            })
        }
        res.status(200).json(allemployee)
    })
}

exports.employee_create_employee = (req,res,next) => {
    Employee.find({email: req.body.email})
    .exec()
    .then(employee => {
        if(employee.length >= 1){
            return res.status(409).json({
                message: 'Mail exists'
            })
        }else{
            bcrypt.hash(req.body.password, 10, (err,hash) => {
                if(err){
                    console.log(err)
                    return res.status(500).json({
                        error: err
                    })
                }else{
                    let = new Employee({
                        _id: new mongoose.Types.ObjectId(),
                        empId: employees.emp_Id,
                        email: req.body.email,
                        password: hash,
                        name: employees.name,
                        lastname: employees.lastname,
                        position: employees.position,
                        tel: employees.tel,
                        picture: employees.picture
                    })
                    employee.save()
                    .then(result => {
                        console.log(result)
                        res.status(201).json({
                            message: 'User Create'
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({
                            error: err
                        })
                    })
                }
            })
        }
    })
}

exports.employee_login = (req,res,next) => {
    Employee.find({email: req.body.mail})
    .exec()
    .then(employee => {
        if(employee.length < 1){
            return res.status(404).json({
                message: 'Auth failed'
            })
        }
        bcrypt.compare(req.body.password, employee[0].password,(err,result) => {
            if(err){
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            if(result){
                const token = jwt.sign({
                    email: employee[0].email,
                    userId: employee[0]._id
                },process.env.JWT_KEY,{
                    expiresIn: '1h'
                })
                return res.status(200).json({
                    message: 'Auth success',
                    token: token
                })
            }
            res.status(401).json({
                message: 'Auth failed'
            })
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}

exports.employee_get_employee = (req,res,next) => {

}

exports.employee_delete_employee = (req,res,next) => {
    Employee.deleteOne({_id: req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Employee deleted'
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}

exports.employee_update_employee = (req,res,next) => {

}