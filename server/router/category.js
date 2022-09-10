var express = require ('express')
var router = express.Router();

const catogeryController = require('../controller/Category')
const middleware = require('../controller/middleware')

router.post('/add_category',middleware.checkToken,catogeryController.catogeryAdd)
router.post('/get_catogerylist',middleware.checkToken,catogeryController.getcategoryList)
router.post('/catogory_update',middleware.checkToken,catogeryController.categoryUpdate)
router.post('/update_status', middleware.checkToken,catogeryController.updateStatus);







module.exports= router