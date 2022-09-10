var Category = require('../utils/Category')
var upload = require('../serivces/image_upload')
var singleUpload = upload.single('category_pic')


const catogeryController ={
    catogeryAdd: async(req,res) =>{
        singleUpload(req,res,async(err)=>{
            if(!req.file){
                return res.json({status:false,message:'Image error'})
            }
            let {filename} = req.file
            let image = filename
            req.body.image = filename
            Category.catogeryAdd(req.body).then((respon)=>{
                res.send(respon)
            }).catch((err) =>{
               res.send({status:false,message:'category image error'})
            })
            return res.json({ status:true, data: data})
        })
    },



    getcategoryList:(req,res) =>{
        Category.getcategoryList().then((response)=>{
            res.json({status:true, msg:"success", data:response})
        }).catch((err)=>{
            res.json(err)
        })
    },
    
    categoryUpdate:(req,res)=>{
        Category.categoryUpdate(req.body).then((response)=>{
            res.json({status:true, data:response})
        }).catch((err)=>{
            res.json(err)
        })
    },

    updateStatus:(req, res) => {
        let category_id = req.body.category_id;
        // console.log(category_id)
        if(!category_id){
            return ({status:false, message:'Invaild category id'});
        }
        Category.updateStatus(req.body).then((response)=>{
            res.json(response)
        }).catch((err)=>{
            res.json(err)
        })
    },
    

}



module.exports ={...catogeryController}