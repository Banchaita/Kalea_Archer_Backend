const { response } = require('express')
var Order= require('../utils/Order')

const orderController={

    orderPlaced:(req,res) => {
        Order.orderPlaced(req.body).then((response)=>{
            res.json({status:true, data:response})
        }).catch((err)=>{
            res.json(err)
        })
    },
    orderList:(req,res) =>{
        let customer_id = req.body.customer_id ;
        Order.orderList(customer_id).then((response)=>{
            res.json(response)
        })
    },
    getorderdetails:(req,res)=>{
        let order_id = req.body.order_id;
        Order.getorderdetails(order_id).then((response)=>{
            res.json(response)
        })

    },
    // Designer order
    designerorderPlaced:(req, res)=>{
        Order.designerorderPlaced(req.body).then((response)=>{
            res.json({status:true, data:response})
        }).catch((err)=>{
            res.json(err)
        })
    },
    designerorderList:(req,res)=>{
        let designer_id = req.body.designer_id;
        Order.designerorderList(designer_id).then((response)=>{
            res.json(response)
        })
    },
    getdesignerorderdetails:(req,res)=>{
        let order_id = req.body.order_id;
        Order.getdesignerorderdetails(order_id).then((response)=>{
            res.json(response)
        })

    }


}
module.exports={...orderController}