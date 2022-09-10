var Advertisement = require('../utils/Advertisement')
var upload = require('../serivces/image_upload')
var singleUpload = upload.single('advertisement_pic')


const advretismentController = {
    advertisementAdd:(req,res) => {
        singleUpload(req,res,async(err)=>{
            if(!req.file){
                return res.json({status:false,message:'Image error'})
            }
            let {filename} = req.file
            // console.log(filename)
            let image = filename
            req.body.image = filename
            Advertisement.advertisementAdd(req.body).then((response)=>{
                res.send(response)
            }).catch((err) =>{
               res.send({status:false,message:' Advertisement image error'})
            })
            return res.json({ status:true, data:data})
        })
    },

    getadvertisementList:(req,res) =>{
        Advertisement.getadvertisementList().then((response)=>{
            res.json({status:true, msg:"success", data:response})
        }).catch((err)=>{
            res.json(err)
        })
    },
    updateStatus:(req, res) => {
        let advertisement_id = req.body.advertisement_id;
        if(!advertisement_id){
            return ({status:false, message:'Invaild advertisement id'});
        }
        Advertisement.updateStatus(req.body).then((response)=>{
            res.json(response)
        }).catch((err)=>{
            res.json(err)
        })
    },
    upadateAdvertisementdata: (req,res)=>{
        singleUpload(req,res,async(err)=>{
            // console.log(req.file)
            if(!req.file){
                return res.json({status:false,message:'Image error'})
            }
            let {filename} = req.file
            let image = filename
            let advertisement_id = req.body.advertisement_id;
            // console.log('controller advertisement_id',advertisement_id)
            req.body.image = filename
            Advertisement.updateprofile(req.body).then((respon)=>{
                res.send(respon)
            }).catch((err) =>{
               res.send('error',err)
            })
        })
    },
    advertisementlistDelete:(req,res)=>{
        Advertisement.advertisementlistDelete(req.body).then((response)=>{
            res.json(response)
        }).catch((err)=>{
            res.json(err)
        })

    },
    
}

module.exports ={...advretismentController}