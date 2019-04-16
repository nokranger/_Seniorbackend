//--------------This is nodemodule---------------//
const express = require('express')
const route = express.Router()

//--------------This is controller---------------//
const ChemicalTankController = require('../controllers/ChemicalTank')

// handle incoming get request to orders
route.get('/',ChemicalTankController.chemicaltank_get_all)
route.post('/',ChemicalTankController.chemicaltank_create_chemicaltank)
route.get('/:chemicaltankId',ChemicalTankController.chemicaltank_get_chemicaltank)
route.delete('/:chemicaltankId',ChemicalTankController.chemicaltank_delete_chemicaltank)
route.patch('/:chemicaltankId',ChemicalTankController.chemicaltank_update_chemicaltank)