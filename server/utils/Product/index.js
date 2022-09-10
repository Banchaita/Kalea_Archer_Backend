let Product = require('../../model/Product')
let Category =require('../../model/Category')
let ObjectId = require('mongodb').ObjectId;
let moment = require('moment')



const productUtils={

    productAdd:(data)=>{
        let {product_type,category_id } = data
        return new Promise((resolve,reject) => {
            if(!data){
                resolve({status:false,message:'no data'})
            }
            else{
                let productRef = new Product({
                    product_type,category_id
                })
                productRef.save((err, savedData) => {
                    return resolve({ status: true, message: 'Product added success' })

                })
            }
        }) 
    },
    getproductList:(category_id)=>{
        return new Promise((resolve, reject) => {
            let query = { category_id:ObjectId(category_id)}
            let fildes = Product.find(query, '-category_id')
            .exec((err, data) => {
                if (err || !data) {
                    return resolve({status:false,data:err,message:"Id is not found"});
                }
                return resolve(data);
            });
        })
    },
    productUpdate:(data) => {
        return new Promise((resolve, reject) => {
            let _id = ObjectId(data.product_id)
            let DataObject = {
                product_type: data.product_type,
            }
            Product.findByIdAndUpdate(_id, { $set: DataObject }, { new: true }, (err, updatedData) => {
                if (err) {
                    return resolve(err);
                }
                return resolve({status:true,message:'Product details updated',data:data});
            });
        });
    },
    getproductDetail: (product_id) => {
        return new Promise((resolve, reject) => {
            let query = { _id: ObjectId(product_id) }
            Product.findOne(query,'')
                .exec((err, data) => {
                    if (err || !data) {
                        return resolve(err);
                    }
                    // console.log("====",data)
                    return resolve(data);
                });
        })
    },
    updateStatus:(data)=>{
        return new Promise ((resolve,reject)=>{
            let {product_id,status_on} =data
            let Dataobj = {
                status_on: parseInt(status_on),
                updated_on: moment().unix() 
            }
            Product.findByIdAndUpdate({_id:ObjectId(product_id)}, { $set: Dataobj }, { new: true }, (err, updatedData) => {
                if (err) {
                    // console.log(err)
                    return resolve(err);
                }
                return resolve({status:true,message:'Product status updated',data:updatedData});
            });
        })
    }


}

module.exports={...productUtils}