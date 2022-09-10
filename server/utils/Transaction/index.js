let Transaction = require('../../model/Transaction')
let Designer_transaction = require('../../model/Desinger_transaction')
let Designer = require('../../model/Designer')
let Customer = require('../../model/Customer')
let Order = require('../../model/Order')
let DesignerOrder = require ('../../model/DesignerOrder')
let ObjectId = require('mongodb').ObjectId;


const transactionUtils ={
    transactionAdd:(data)=>{
        return new Promise((resolve,reject) => {
            if(!data){
                resolve({status:false,message:'no data'})
            }
            else{
                let transactionRef = new Transaction(data)
                transactionRef.save((err,resp)=>{
                    resolve({status:true,message:'transction create success'})  
                })
            }
        }) 
    },
    transactionList: (customer_id) => {
        return new Promise((resolve, reject) => {
            let query = {customer_id: { $eq: ObjectId(customer_id) } }
            let populate = [{
                path: 'designer_id',
                select: 'name email'
            },
            {
                path: 'order_id',
                select: 'total_price order_number payment_type'
            }
        ]
        Transaction.find(query)
            .populate(populate)
            .exec((err, data) => {
                if (err || !data.length) {
                    return resolve({ status: false, data: err, message: "Id is not found" });
                }
                return resolve({ status: true, message: "Data Found", data });
            });
        })
    },


    // Designer Transaction

    designertransactionAdd:(data)=>{
        return new Promise((resolve,reject) => {
            if(!data){
                resolve({status:false,message:'no data'})
            }
            else{
                let designertransactionRef = new Designer_transaction(data)
                designertransactionRef.save((err,resp)=>{
                    resolve({status:true,message:'designer transction create success'})  
                })
            }
        }) 
    },
    designertransactionList:(designer_id) => {
        return new Promise((resolve, reject) => {
            let query = {designer_id: { $eq: ObjectId(designer_id) } }
            let populate = [{
                path: 'customer_id',
                select: 'name email'
            },
            {
                path: 'order_id',
                select: 'total_price order_number payment_type'
            }
        ]
        Designer_transaction.find(query)
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
module.exports={...transactionUtils}