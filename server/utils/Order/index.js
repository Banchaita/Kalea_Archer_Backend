let Order = require('../../model/Order')
let DesignerOrder =require('../../model/DesignerOrder')
let Designer = require('../../model/Designer')
let Customer = require('../../model/Customer')
let Category = require('../../model/Category')
let Product = require('../../model/Product')
let Collection = require('../../model/Collection')
let Collection_size = require('../../model/Collection_size')
let Collection_colour = require('../../model/Collection_colour')
let ObjectId = require('mongodb').ObjectId;



const orderUtils={
    orderPlaced:(data)=>{
        return new Promise((resolve,reject) => {
            if(!data){
                resolve({status:false,message:'no data'})
            }
            else{
                let orderRef = new Order(data)
                orderRef.save((err,resp)=>{
                    resolve({status:true,message:'oredr place success'})  
                })
            }
        }) 
    },
    orderList: (customer_id) => {
        return new Promise((resolve, reject) => {
            let query = {customer_id: { $eq: ObjectId(customer_id) } }
            let populate = [{
                path: 'designer_id',
                select: 'name phone'
            }
        ]
            Order.find(query, '-customer_id')
            .populate(populate)
            .exec((err, data) => {
                if (err || !data.length) {
                    return resolve({ status: false, data: err, message: "Id is not found" });
                }
                return resolve({ status: true, message: "Data Found", data });
            });
        })
    },
    getorderdetails:(order_id)=>{
        return new Promise((resolve,reject)=>{
            let query ={_id:{ $eq: ObjectId(order_id)}}
            let populate = [{
                path:'customer_id',
                select:'name phone address zip_code email'
            },{
                path: 'category_id',
                select: 'name' 
            },{
                path: 'product_id',
                select: 'product_type' 
            },{
                path: 'collection_id',
                select: 'product_name price' 
            },{
                path:'size_id',
                select: 'size' 
            },{
                path:'colour_id',
                select: 'colour product_image'
            }

        ]
            Order.find(query,'-designer_id ')
            .populate(populate)
            .exec((err, data) => {
                if (err || !data.length) {
                    return resolve({ status: false, data: err, message: "Id is not found" });
                }
                return resolve({ status: true, message: "Data Found", data });
            });

        })

    },


    // Designer Order
    designerorderPlaced:(data)=>{
        return new Promise((resolve,reject) => {
            if(!data){
                resolve({status:false,message:'no data'})
            }
            else{
                let designerorderRef = new DesignerOrder(data)
                designerorderRef.save((err,resp)=>{
                    resolve({status:true,message:'Designer order place success'})  
                })
            }
        }) 
    },
    designerorderList:(designer_id) => {
        return new Promise((resolve, reject) => {
            let query = {designer_id: { $eq: ObjectId(designer_id) } }
            let populate = [{
                path: 'customer_id',
                select: 'name phone'
            }
        ]
        DesignerOrder.find(query, '-designer_id')
            .populate(populate)
            .exec((err, data) => {
                if (err || !data.length) {
                    return resolve({ status: false, data: err, message: "Id is not found" });
                }
                return resolve({ status: true, message: "Data Found", data });
            });
        })
    },
    getdesignerorderdetails:(order_id)=>{
        return new Promise((resolve,reject)=>{
            let query ={_id:{ $eq: ObjectId(order_id)}}
            let populate = [{
                path:'customer_id',
                select:'name phone address zip_code email'
            },{
                path: 'category_id',
                select: 'name' 
            },{
                path: 'product_id',
                select: 'product_type' 
            },{
                path: 'collection_id',
                select: 'product_name price' 
            },{
                path:'size_id',
                select: 'size' 
            },{
                path:'colour_id',
                select: 'colour product_image'
            }
        ]
        DesignerOrder.find(query)
            .populate(populate)
            .exec((err, data) => {
                if (err || !data.length) {
                    return resolve({ status: false, data: err, message: "Id is not found" });
                }
                return resolve({ status: true, message: "Data Found", data });
            });

        })

    },



}

module.exports ={...orderUtils}