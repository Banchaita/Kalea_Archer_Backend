let Advertisement = require('../../model/Advertisement')
let ObjectId = require('mongodb').ObjectId;
let moment = require('moment')


const advertisementUtils={
    advertisementAdd:(data)=>{
        return new Promise((resolve,reject) => {
            let{image,duration,start_date,end_date,referred_by} =data
            if(!data){
                resolve({status:false,message:'no data'})
            }
            else{
                let advertisementRef = new Advertisement({
                    advertisement_pic:image,duration,start_date,
                    end_date,referred_by
                })
                advertisementRef.save((err,resp)=>{
                    return resolve({ status:true,message:'Advertisement added success' })  
                })
            }
        }) 
    },
    getadvertisementList: () => {
        return new Promise((resolve, reject) => {
            Advertisement.find({})
                .exec((err, data) => {
                    if (err || !data || data.length == 0) {
                        return resolve(err);
                    }
                    return resolve(data);
              });
        })
    },
    updateprofile: (data) => {
        return new Promise((resolve, reject) => {
            let _id = ObjectId(data.advertisement_id)
            let DataObject = {
                advertisement_id: data.advertisement_id,
                advertisement_pic: data.image
            }
            Advertisement.findByIdAndUpdate(_id, { $set: DataObject }, { new: true }, (err, updatedData) => {
                if (err) {
                    return resolve(err);
                }
                return resolve("Advertisement profile image udloaded");
            });
        });
    },
    updateStatus:(data)=>{
        return new Promise ((resolve,reject)=>{
            let {advertisement_id,status_on} =data
            let Dataobj = {
                status_on: parseInt(status_on),
                updated_on: moment().unix() 
            }
            Advertisement.findByIdAndUpdate({_id:ObjectId(advertisement_id)}, { $set: Dataobj }, { new: true }, (err, updatedData) => {
                if (err) {
                    // console.log(err)
                    return resolve(err);
                }
                return resolve({status:true,message:'Advertisement status updated',data:updatedData});
            });
        })
    },
    upadateAdvertisementdata: (data) => {
        return new Promise((resolve, reject) => {
            let _id = ObjectId(data.advertisement_id)
            let DataObject = {
                duration: data.duration,
                start_date: data.start_date,
                end_date:data.end_date,
                referred_by:data.referred_by
            }

            Advertisement.findByIdAndUpdate(_id, { $set: DataObject }, { new: true }, (err, updatedData) => {
                if (err) {
                    // console.log(err)
                    return resolve(err);
                }
                return resolve({ status: true, message: 'Update success',data:updatedData});
            });
        });
    },
    advertisementlistDelete:(data)=>{
        return new Promise((resolve,reject)=>{
            let advertisement_id =  ObjectId(data.advertisement_id)
            Advertisement.findByIdAndRemove(advertisement_id, (err) => {
                if(err){
                    return resolve(err);
                }
                return resolve({status:true,message:'Advertisement are deleted'});
            });
        }); 
    },
    updateprofile:(data) => {
        // console.log(data)
        return new Promise((resolve, reject) => {
            let _id = ObjectId(data.advertisement_id)
            let DataObject = {
                advertisement_id: data.advertisement_id,
                advertisement_pic:data.image,
                duration:data.duration,
                start_date:data.start_date,
                end_date:data.end_date,
                referred_by:data.referred_by 
            }
            Advertisement.findByIdAndUpdate(_id, { $set: DataObject }, { new: true }, (err, updatedData) => {
                if (err) {
                    return resolve(err);
                }
                return resolve({status:true,message:'Update Success',data:updatedData});
            });
        });

     }


}

module.exports= {...advertisementUtils}