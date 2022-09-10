let Category = require('../../model/Category')
let ObjectId = require('mongodb').ObjectId;
let moment = require('moment')



const categoryUtils ={
    catogeryAdd: (data) => {
        return new Promise((resolve, reject) => {
            let {image,name} =data
                if(!data){
                    resolve({status:false,message:'no data'})
                }
                else{
                    let categoryRef = new Category({
                        category_pic:image,name
                    })
                    categoryRef.save((err, savedData) => {
                        return resolve({ status: true, message: 'Category image added success' })
    
                    })
                }
        });
    },
    getcategoryList: () => {
        return new Promise((resolve, reject) => {
            Category.find({})
                .exec((err, data) => {
                    if (err || !data || data.length == 0) {
                        return resolve(err);
                    }
                    return resolve(data);
              });
        })
    },

    categoryUpdate:(data) => {
        return new Promise((resolve, reject) => {
            let _id = ObjectId(data.category_id)
            let DataObject = {
                name: data.name,
            }
            Category.findByIdAndUpdate(_id, { $set: DataObject }, { new: true }, (err, updatedData) => {
                if (err) {
                    return resolve(err);
                }
                return resolve({status:true,message:'Category details updated',data:data});
            });
        });
    },
    updateStatus:(data)=>{
        return new Promise ((resolve,reject)=>{
            let {category_id,status_on} =data
            let Dataobj = {
                status_on: parseInt(status_on),
                updated_on: moment().unix() 
            }
            Category.findByIdAndUpdate({_id:ObjectId(category_id)}, { $set: Dataobj }, { new: true }, (err, updatedData) => {
                if (err) {
                    // console.log(err)
                    return resolve(err);
                }
                return resolve({status:true,message:'Category status updated',data:updatedData});
            });
        })
    }

}

module.exports ={...categoryUtils}