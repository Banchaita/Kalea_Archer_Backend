var express = require ('express')
var router = express.Router();

const designerController = require('../controller/Designer')
const middleware = require('../controller/middleware')



router.post('/desinger_register',designerController.designerRegister)
router.post('/designer_login',middleware.emailIdRequire,designerController.designerLogin)

router.post('/get_designer_list',middleware.checkToken,designerController.getDesignerList)
router.post('/get_designer_data',middleware.checkToken,designerController.getDesignerDetail)
router.post('/update_status', middleware.checkToken,designerController.updateStatus);
router.post('/designer_image',middleware.checkToken,designerController.UploadeImage)







module.exports= router