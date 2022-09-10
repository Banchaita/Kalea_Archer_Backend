var express = require ('express')
var router = express.Router();

const customerController = require('../controller/Customer')
const middleware = require('../controller/middleware')



router.post('/customer_register',customerController.customerRegister)
router.post('/customer_login',middleware.emailIdRequire,customerController.customerLogin)
router.post('/get_customer_list',middleware.checkToken,customerController.getCustomerList)
router.post('/get_customer_data',middleware.checkToken,customerController.getCustomerDetail)
// router.post('/update_customer',middleware.checkToken,customerController.updateCustomer)
// router.post('/delete_customer',customerController.deleteCustomer)
router.post('/customer_upload',middleware.checkToken,customerController.customerEdit)
router.post('/update_status',middleware.checkToken, customerController.updateStatus);











module.exports= router