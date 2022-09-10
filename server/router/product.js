var express = require ('express')
var router = express.Router();


const productController = require('../controller/Product')
const middleware = require('../controller/middleware')


router.post('/add_product',middleware.checkToken,productController.productAdd)
// router.post('/get_product_data',middleware.checkToken,productController.getproductDetail)
router.post('/get_productlsit',middleware.checkToken,productController.getproductList)
router.post('/product_update',middleware.checkToken,productController.productUpdate)
router.post('/update_status',middleware.checkToken,productController.updateStatus);



module.exports= router