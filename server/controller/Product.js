var Product = require('../utils/Product')


const productController={


    productAdd:(req,res) => {
        Product.productAdd(req.body).then((response)=>{
            res.json({status:true, data:response})
        }).catch((err)=>{
            res.json(err)
        })
    },
    getproductList:(req,res)=>{
        let category_id = req.category_id ;
        Product.getproductList(req.body.category_id).then((response)=>{
            res.json({status:true, data:response})
        }).catch((err)=>{
            res.json(err)
        })
    },
    productUpdate:(req,res)=>{
        Product.productUpdate(req.body).then((response)=>{
            res.json({status:true, data:response})
        }).catch((err)=>{
            res.json(err)
        })
    },
    getproductDetail:(req,res)=>{
        let product_id = req.product_id;
        Product.getproductDetail(req.body.product_id).then((response)=>{
            res.json({status:true, data:response})
        }).catch((err)=>{
            res.json(err)
        })
    },
    updateStatus:(req, res) => {
        let product_id = req.body.product_id;
        console.log(product_id)
        if(!product_id){
            return ({status:false, message:'Invaild product id'});
        }
        Product.updateStatus(req.body).then((response)=>{
            res.json(response)
        }).catch((err)=>{
            res.json(err)
        })
    },

}

module.exports={...productController}