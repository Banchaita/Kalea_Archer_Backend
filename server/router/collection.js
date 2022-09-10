var express = require ('express')
var router = express.Router();


const collectionController= require('../controller/Collection')
const middleware = require('../controller/middleware')

router.post('/add_collection',middleware.checkToken,collectionController.collectionAdd)
router.post('/get_list',middleware.checkToken,collectionController.collectionList)


// Collection colour 
router.post('/add_colour',middleware.checkToken,collectionController.colourAdd)
router.post('/get_colour',middleware.checkToken,collectionController.colourList)
router.post('/image_upload',middleware.checkToken,collectionController.uploadeImage)


// Collection size 
router.post('/add_size',middleware.checkToken,collectionController.sizeAdd)
router.post('/get_size',middleware.checkToken,collectionController.sizeList)
router.post('/get_alllist',middleware.checkToken,collectionController.sizeAllList)
router.post('/size_update',middleware.checkToken,collectionController.sizeUpdate)
router.post('/update_status',middleware.checkToken,collectionController.updateStatus);





module.exports= router