const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const productRoute = require('./api/routes/product')
const ordersRoute = require('./api/routes/orders')
const userRoute = require('./api/routes/user')
const employeeRoute = require('./api/routes/employee')
const adminRoute = require('./api/routes/admin')
const chemicalRoute = require('./api/routes/ChemicalTank')
const startRoute = require('./api/routes/start')

//connect db
mongoose.connect('mongodb+srv://nokranger:'+ 
process.env.MONGO_ATLAS_PW+
'@restfulasc-zliif.mongodb.net/test?retryWrites=true',{
    useNewUrlParser: true
})
mongoose.Promise = global.Promise

app.use(morgan('dev'))
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.use((req,res,next) =>{
    // const error = new Error("Not found")
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})
//route
app.use('/product',productRoute)
app.use('/orders',ordersRoute)
app.use('/users',userRoute)
// app.use('/employee',employeeRoute)
// app.use('/admin',adminRoute)
app.use('/chemicaltank',chemicalRoute)
app.use('/start', startRoute)

//404 not found
app.use((req,res,next) => {
    const error = new Error('Not found')
    error.status = 404
    next(400)
})
//500 error
app.use((err,req,res,next) => {
    res.status(err.status || 500)
    res.json({
        err : {
            message : err.message
        }
    })
})
//port 8081
const server = app.listen(8081,function(req,res,next){
    const host = server.address().address
    const port = server.address().port
    console.log("Server run port : " + port)
})
module.export = app;