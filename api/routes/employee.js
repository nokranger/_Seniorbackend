//--------------This is nodemodule---------------//
const express = require('express')
const route = express.Router()

//--------------This is controller---------------//
const employeeController = require('../controllers/employee')

// handle incoming get request to orders
route.get('/',employeeController.employee_get_all)
route.post('/',employeeController.employee_create_employee)
route.get('/:employeeId',employeeController.employee_get_employee)
route.delete('/:employeeId',employeeController.employee_delete_employee)
route.patch('/:employeeId',employeeController.employee_update_employee)