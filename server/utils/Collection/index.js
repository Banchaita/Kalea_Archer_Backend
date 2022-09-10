let Collection = require('../../model/Collection')
let Colour = require('../../model/Collection_colour')
let Size = require('../../model/Collection_size')
let Designer = require('../../model/Designer')
let ObjectId = require('mongodb').ObjectId;
let md5 = require('md5')
let moment = require('moment')




const collectionUtils = {
    collectionAdd: (data) => {
        let { product_name, designer_id, category_id, product_id, price, description, product_type } = data
        return new Promise((resolve, reject) => {
            if (!data) {
                resolve({ status: false, message: 'no data' })
            }
            else {
                let collectionRef = new Collection({
                    product_name, designer_id, category_id, product_id, price, description, product_type
                })
                collectionRef.save((err, savedData) => {
                    return resolve({ status: true, message: 'Collection  added success' })

                })
            }
        })
    },
    collectionList: (designer_id) => {
        return new Promise((resolve, reject) => {
            let query = { designer_id: { $eq: ObjectId(designer_id) } }
            let populate = [{
                path: 'category_id',
                select: 'name'
            }, {
                path: 'product_id',
                select: 'product_type'
            }
            ]
            let fildes = Collection.find(query, )
                .populate(populate)
                .exec((err, data) => {
                    if (err || !data) {
                        return resolve({ status: false, data: err, message: "Id is not found" });
                    }
                    return resolve(data);
                });
        })
    },


    // Collection Colour

    colourAdd: (data) => {
        let { image,collection_id, colour, category_id, product_id } = data
        return new Promise((resolve, reject) => {
            if (!data) {
                resolve({ status: false, message: 'no data' })
            }
            else {
                let colourRef = new Colour({
                    product_image:image,collection_id, colour, category_id, product_id
                })
                colourRef.save((err, savedData) => {
                    return resolve({ status: true, message: 'Collection colour  added success',data:data })

                })
            }
        })
    },
    colourList: (collection_id) => {
        // console.log(collection_id)
        return new Promise((resolve, reject) => {
            let query = { collection_id: { $eq: ObjectId(collection_id) } }
            let populate = [{
                path: 'category_id',
                select: 'name'
            }, {
                path: 'product_id',
                select: 'product_type'
            },
            {
                path: 'collection_id',
                select: 'product_name'
            },
            ]
            let fildes = Colour.find(query)
                .populate(populate)
                .exec((err, data) => {
                    if (err || !data) {
                        return resolve({ status: false, data: err, message: "Id is not found" });
                    }
                    // console.log(data)
                    return resolve({status: true,data:data});
                });
        })
    },

    updateprofile: (data) => {
        return new Promise((resolve, reject) => {
            let _id = ObjectId(data.colour_id)
            let DataObject = {
                colour_id: data.colour_id,
                product_image: data.image
            }
            Colour.findByIdAndUpdate(_id, { $set: DataObject }, { new: true }, (err, updatedData) => {
                if (err) {
                    return resolve(err);
                }
                return resolve(" Colour image udloaded");
            });
        });
    },

    //Collection Size

    sizeAdd: (data) => {
        let { size, colour_id, category_id, product_id } = data
        return new Promise((resolve, reject) => {
            if (!data) {
                resolve({ status: false, message: 'no data' })
            }
            else {
                let sizeRef = new Size({
                    size, colour_id, category_id, product_id
                })
                sizeRef.save((err, savedData) => {
                    return resolve({ status: true, message: 'Collection size  added success',data:data})

                })
            }
        })
    },

    sizeList: (colour_id) => {
        return new Promise((resolve, reject) => {
            let query = { colour_id: { $eq: ObjectId(colour_id) } }
            let populate = [{
                path: 'category_id',
                select: 'name'
            }, {
                path: 'product_id',
                select: 'product_type'
            },
            {
                path: 'colour_id',
                select: 'product_image colour'
            }]
            Size.find(query)
            .populate(populate)
            .exec((err, data) => {
                if (err || !data.length) {
                    return resolve({ status: false, message: "Id is not found" });
                }
                return resolve({ status: true, message: "Data Found", data });
            });
        })
    },
    sizeAllList: () => {
        return new Promise((resolve, reject) => {
            Size.find({})
                .exec((err, data) => {
                    if (err || !data || data.length == 0) {
                        return resolve(err);
                    }
                    return resolve(data);
              });
        })
    },
    sizeUpdate:(data) => {
        return new Promise((resolve, reject) => {
            let _id = ObjectId(data.size_id)
            let DataObject = {
                size: data.size
            }
            Size.findByIdAndUpdate(_id, { $set: DataObject }, { new: true }, (err, updatedData) => {
                if (err) {
                    return resolve(err);
                }
                return resolve({status:true,message:'Size details updated',data:data});
            });
        });
    },
    updateStatus:(data)=>{
        return new Promise ((resolve,reject)=>{
            let {size_id,status_on} =data
            let Dataobj = {
                status_on: parseInt(status_on),
                updated_on: moment().unix() 
            }
            Size.findByIdAndUpdate({_id:ObjectId(size_id)}, { $set: Dataobj }, { new: true }, (err, updatedData) => {
                if (err) {
                    // console.log(err)
                    return resolve(err);
                }
                return resolve({status:true,message:'Size status updated',data:updatedData});
            });
        })
    }
}
module.exports = { ...collectionUtils }