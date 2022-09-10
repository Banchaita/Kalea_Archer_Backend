var Collection = require('../utils/Collection')
var upload = require('../serivces/image_upload')
var singleUpload = upload.single('product_image')

const collectionController={
    collectionAdd:(req,res) => {
        Collection.collectionAdd(req.body).then((response)=>{
            res.json({status:true, data:response})
        }).catch((err)=>{
            res.json(err)
        })
    },
    collectionList:(req,res) =>{
        let designer_id = req.designer_id ;
        Collection.collectionList(req.body.designer_id).then((response)=>{
            res.json({status:true, msg:"success", data:response})
        }).catch((err)=>{
            res.json(err)
        })
    },


    // Collection  Colour 

    colourAdd:(req,res) => {
        singleUpload(req,res,async(err)=>{
            // console.log(req.file)
            if(!req.file){
                return res.json({status:false,message:'Image error'})
            }
            let {filename} = req.file
            req.body.image = filename
            Collection.colourAdd(req.body).then((response)=>{
                res.send(response)
            }).catch((err) =>{
               res.send({status:false,message:'Colours image error'})
            })
        })
    },
    colourList:(req,res) =>{
        let collection_id = req.collection_id;
        Collection.colourList(req.body.collection_id).then((response)=>{
            res.json(response)
        }).catch((err)=>{
            res.json({status:false,message:'Collection_id error'})
        })
    },
    uploadeImage: async(req,res) =>{
        singleUpload(req,res,async(err)=>{
            if(!req.file){
                return res.json({status:false,message:'Image error'})
            }
            let {filename} = req.file
            // console.log(filename)
            let image = filename
            let colour_id = req.body.colour_id
            req.body.image = filename
            Collection.updateprofile(req.body).then((respon)=>{
                res.send(respon)
            }).catch((err) =>{
               res.send('error',err)
            })
            if(!colour_id){
                return res.json({status:false,message:'Customer id error'})
            }
            return res.json({ status:true,message:'Image upload success', data: image})
        })

    },


    // Collection Sizes

    sizeAdd:(req,res) => {
        Collection.sizeAdd(req.body).then((response)=>{
            res.json({status:true, data:response})
        }).catch((err)=>{
            res.json(err)
        })
    },

    sizeList: (req,res) =>{
        let colour_id = req.body.colour_id;
        Collection.sizeList(colour_id).then((response)=>{
            res.json(response)
        })
    },

    sizeAllList:(req,res) =>{
        Collection.sizeAllList().then((response)=>{
            res.json({status:true, msg:"success", data:response})
        }).catch((err)=>{
            res.json(err)
        })
    },
    sizeUpdate:(req,res)=>{
        Collection.sizeUpdate(req.body).then((response)=>{
            res.json({status:true, data:response})
        }).catch((err)=>{
            res.json(err)
        })
    },
    updateStatus:(req, res) => {
        let size_id = req.body.size_id;
        // console.log(size_id)
        if(!size_id){
            return ({status:false, message:'Invaild size id'});
        }
        Collection.updateStatus(req.body).then((response)=>{
            res.json(response)
        }).catch((err)=>{
            res.json(err)
        })
    },

}

module.exports ={...collectionController}