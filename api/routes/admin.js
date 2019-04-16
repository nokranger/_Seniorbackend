//--------------This is nodemodule---------------//
const express = require('express')
const route = express.Router()

//--------------This is controller---------------//
const adminController = require('../controllers/admin')

// handle incoming get request to orders
route.get('/',adminController.admin_get_all)
route.post('/',adminController.admin_create_admin)
route.get('/:adminId',adminController.admin_get_admin)
route.delete('/:adminId',adminController.admin_delete_admin)
route.patch('/:adminId',adminController.admin_update_admin)