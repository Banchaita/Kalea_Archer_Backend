var express = require ('express')
var router = express.Router();

const transactionController = require('../controller/Transaction')
const middleware = require('../controller/middleware')

router.post('/add_transaction',middleware.checkToken,transactionController.transactionAdd)
router.post('/get_list',middleware.checkToken,transactionController.transactionList)


// Designer Transcation
router.post('/add_designertransaction',middleware.checkToken,transactionController.designertransactionAdd)
router.post('/get_transactionlist',middleware.checkToken,transactionController.designertransactionList)







module.exports= router