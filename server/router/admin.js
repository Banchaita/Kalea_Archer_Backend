var express = require ('express')
var router = express.Router();

const adminController =require('../controller/Admin')
const middleware = require('../controller/middleware')

router.post('/register',adminController.resgister)
router.post('/login',middleware.emailIdRequire,adminController.login)
router.post('/get_admin_data',middleware.checkToken,adminController.getAdminDetail)
router.post('/update',adminController.upadateAdmindata)
router.post('/validate_email', adminController.checkEmail);

router.post('/forgot_password',adminController.forgotPasswordWithMail)
router.post('/reset_password',adminController.resetPassword)
router.post('/verify_otp', adminController.verifyOtpWithMail)
router.post('/change_password',adminController.changePassword)




module.exports =router