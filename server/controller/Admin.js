var Admin = require('../utils/Admin')
var upload = require('../serivces/image_upload')
var singleUpload = upload.single('admin_pic')

const adminController ={
    resgister:async(req,res)=>{
        singleUpload(req,res,async(err)=>{
            // console.log(req.file)
            if(!req.file){
                return res.json({status:false,message:'Image error'})
            }
            let {filename} = req.file
            req.body.image = filename
            Admin.register(req.body).then((response)=>{
                res.send(response)
            }).catch((err) =>{
               res.send({status:false,message:'Admin image error'})
            })
        })
     },

     login: async (req, res) => {
        Admin.login(req.body).then((response) => {
            res.json(response)
        })
        .catch((err)=> {
            res.json(err)
        }) 
    },
    getAdminDetail:(req,res)=>{
        // console.log(req.body.admin_id)
        Admin.getAdminDetail(req.body).then((response)=>{
            res.json({status:true, data:response})
        }).catch((err)=>{
            res.json(err)
        })  
    },
    upadateAdmindata: (req,res)=>{
        singleUpload(req,res,async(err)=>{
            // console.log(req.file)
            if(!req.file){
                return res.json({status:false,message:'Image error'})
            }
            let {filename} = req.file
            req.body.image = filename
            Admin.upadateAdmindata(req.body).then((response)=>{
                res.json(response)
            }).catch((err)=>{
                res.json(err)
            })
        })
       
    },
    
    checkEmail:(req,res)=>{
        let email = req.email;
        Admin.checkEmail(req.body.email).then((response)=>{
            res.json(response)
        }).catch((err)=>{
            res.json(err)
        })
    },
    forgotPasswordWithMail:(req,res)=>{
        Admin.forgotPasswordWithMail(req.body).then((response)=>{
            res.json({status:true, data:response})
        }).catch((err)=>{
            res.json(err)
        })
    },
    resetPassword:async(req,res)=>{
        let result  =  await Admin.resetPassword(req.body);
        res.json(result);
        if(result){
            return res.json({status:true,message:'okk'})
        }
        return res.json({status:false,message:'not okk'})
    },
    verifyOtpWithMail:async(req,res)=>{
        let result  =  await Admin.verifyOtp(req.body);
        res.json(result);
        if(result){
            return res.json({status:true,message:'okk'})
        }
        return res.json({status:false,message:'not okk'})
    },
    changePassword:async(req,res)=>{
        let requiredFields = ['old_password', 'new_password'];
        let admin_id = req.body.admin_id;
        if(!admin_id){
            return res.json({status:false,message:'Invalid admin id'});
        }
        Admin.changePassword(req.body).then((response)=>{
            res.send(response)
        }).catch((err)=>{
            res.send(err)
        })
    }
    





}

module.exports = {...adminController}