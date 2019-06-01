const express = require('express')
const route = express.Router()
const Start = require('../models/start')

route.get('/get-start',(req, res) => {
    Start.find().then((d) => {
        let lastPos = d.length-1
        res.send(d[lastPos])
    }, (e) => {
        res.status(400).send(e)
    })
})

route.post('/post-start',(req, res) => {
    let newStart = new Start({
        status: true,
        isTimeOut: false,
    })

    newStart.save().then((d) => {
        setTimeout(() => {
            d.isTimeOut = true
            d.save().then((a) => {
                console.log('a : ', a)
            }, (ee) => {
                console.log('ee : ', ee)
            })
        }, 20000)
        res.send({success: true, data: d})
    }, (e) => {
        res.status(400).send(e)
    })
})

module.exports = route