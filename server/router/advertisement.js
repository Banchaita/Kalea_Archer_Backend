var express = require ('express')
var router = express.Router();

const advretismentController = require('../controller/Advertisement')
const middleware = require('../controller/middleware')



router.post('/add_advertisement',middleware.checkToken,advretismentController.advertisementAdd)
router.post('/get__advertisementlist',middleware.checkToken,advretismentController.getadvertisementList)
router.post('/advertisementlist_update',middleware.checkToken,advretismentController.upadateAdvertisementdata)


router.post('/advertisementlist_upload',middleware.checkToken,advretismentController.upadateAdvertisementdata)
router.post('/update_status',middleware.checkToken,advretismentController.updateStatus);
router.post('/advertisementlist_delete',middleware.checkToken,advretismentController.advertisementlistDelete)






module.exports= router