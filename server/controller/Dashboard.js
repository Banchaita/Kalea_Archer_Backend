var Dashboard = require('../utils/Dashboard')




const dashboarhController = {

    getDashboardCount: (req, res) => {
        Dashboard.getDashboardCount(req.body).then((respon) => {
            res.send(respon)
        }).catch((err) => {
            res.send('error', err)
        })
    },


}


module.exports={...dashboarhController}