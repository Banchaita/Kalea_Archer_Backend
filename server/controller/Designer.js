var Desinger = require('../utils/Designer')
var upload = require('../serivces/image_upload')
var singleUpload = upload.single('designer_pic')


const designerController ={
    designerRegister:async(req,res)=>{
        singleUpload(req,res,async(err)=>{
            console.log(req.file)
            if(!req.file){
                return res.json({status:false,message:'Image error'})
            }
            let {filename} = req.file
            req.body.image = filename
            console.log( req.body.image)
            Desinger.designerRegister(req.body).then((response)=>{
                res.send(response)
            }).catch((err) =>{
               res.send({status:false,message:'Designer image error'})
            })
        })
    },
    designerLogin: async (req, res) => {
        Desinger.designerLogin(req.body).then((response) => {
            res.json(response)
        })
        .catch((err)=> {
            res.json(err)
        })
    },

    getDesignerList:(req,res) =>{
        Desinger.getDesignerList().then((response)=>{
            res.json({status:true, msg:"success", data:response})
        }).catch((err)=>{
            res.json(err)
        })
    },
    getDesignerDetail:(req,res)=>{
        let designer_id = req.designer_id;
        Desinger. getDesignerDetail(req.body.designer_id).then((response)=>{
            res.json({status:true, data:response})
        }).catch((err)=>{
            res.json(err)
        })
    },
   
    deleteDesinger:(req,res)=>{
        Desinger.deleteDesinger(req.body).then((response)=>{
            res.json({status:true, data:response})
        }).catch((err)=>{
            res.json(err)
        })
    },
   
    updateStatus:(req, res) => {
         let designer_id = req.body.designer_id;
         if(!designer_id){
             returnner ({status:false, message:'Invaild designer id'});
         }
         Desinger.updateStatus(req.body).then((response)=>{
             res.json(response)
         }).catch((err)=>{
             res.json(err)
         })
     },

     UploadeImage:async(req,res) =>{
        singleUpload(req,res,async(err)=>{
            if(!req.file){
                return res.json({status:false,message:'Image error'})
            }
            let {filename} = req.file
            let image = filename
            let designer_id = req.body.designer_id;
            // console.log('controller desigfn id',designer_id)
            req.body.image = filename
            Desinger.updateprofile(req.body).then((respon)=>{
                res.send(respon)
            }).catch((err) =>{
               res.send('error',err)
            })
        })
    },
   
}


module.exports = {...designerController}