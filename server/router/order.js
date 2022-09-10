var express = require ('express')
var router = express.Router();

const orderController = require('../controller/Order')
const middleware = require('../controller/middleware')

router.post('/add_order',middleware.checkToken,orderController.orderPlaced)
router.post('/get_list',middleware.checkToken,orderController.orderList)
router.post('/get_orderdetails',middleware.checkToken,orderController.getorderdetails)


//Designer order
router.post('/add_designerorder',middleware.checkToken,orderController.designerorderPlaced)
router.post('/get_orderlist',middleware.checkToken,orderController.designerorderList)
router.post('/get_designerorderdetails',middleware.checkToken,orderController.getdesignerorderdetails)









module.exports= router