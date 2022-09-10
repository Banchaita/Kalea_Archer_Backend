var express = require ('express')
var router = express.Router();

const dashboardController = require('../controller/Dashboard')
const middleware = require('../controller/middleware')


router.post('/get_dashboard_count',middleware.checkToken,dashboardController.getDashboardCount);










module.exports= router