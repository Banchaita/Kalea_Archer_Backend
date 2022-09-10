let Customer = require('../../model/Customer')

let ObjectId = require('mongodb').ObjectId;
let md5 = require('md5')
let moment = require('moment')
const jwt = require('jsonwebtoken')
let nodemailer = require('nodemailer')


const customerUtils ={
    customerRegister:async (data) => {
         return new Promise((resolve, reject) => {
            let { image, name, email, password, phone, address, zip_code} = data
            if (!data) {
                resolve({ status: false, message: 'no data' })
            }
            else {
                let customerRef = new Customer({
                    customer_pic: image, name, email, password: md5(password),phone, address, zip_code
                })
                customerRef.save((err, savedData) => {
                    return resolve({ status: true, message: 'Customer Resgister Success', data: savedData })

                })
            }
        })

    },
    customerLogin:async (data) => {
        return new Promise(async (resolve, reject) => {
            let { email, password } = data
            Customer.findOne({ email, password: md5(password) })
                .exec((err, response) => {
                    if (err || !response) {
                        return reject({ status: false, message: "Invalid Credentials" })
                    }
                    let token = jwt.sign({ customer_id: response._id ,'is_customer': '1'}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY })
                    return resolve({ status: true, message:'Login success',token:token  })
                })
        })
    },
    getCustomerList: () => {
        return new Promise((resolve, reject) => {
            Customer.find({})
                .exec((err, data) => {
                    if (err || !data || data.length == 0) {
                        return resolve(err);
                    }
                    return resolve(data);
              });
        })
    },
    getCustomerDetail: (customer_id) => {
        return new Promise((resolve, reject) => {
        let query = { _id: ObjectId(customer_id) }
        let fildes =  Customer.findOne(query, '-password')
            .exec((err, data) => {
                if (err || !data) {
                    return resolve(err);
                }
                return resolve(data);
            });
        })
    },
    updateprofile: (data) => {
        return new Promise((resolve, reject) => {
            let _id = ObjectId(data.customer_id)
            let DataObject = {
                customer_id: data.customer_id,
                customer_pic: data.image
            }
            Customer.findByIdAndUpdate(_id, { $set: DataObject }, { new: true }, (err, updatedData) => {
                if (err) {
                    return resolve(err);
                }
                return resolve("Customer profile image udloaded");
            });
        });
    },
    updateCustomer:(data) => {
        return new Promise((resolve, reject) => {
            let _id = ObjectId(data.customer_id)
            let DataObject = {
                name: data.name,
                email: data.email,
                phone:data.phone,
                address:data.address
            }
            Customer.findByIdAndUpdate(_id, { $set: DataObject }, { new: true }, (err, updatedData) => {
                if (err) {
                    return resolve(err);
                }
                return resolve({status: true, message:'Update success'});
            });
        });
    },
    deleteCustomer:(data)=>{
        return new Promise((resolve,reject)=>{
            let customer_id =  ObjectId(data.customer_id)
            Customer.findByIdAndRemove( customer_id, (err) => {
                if(err){
                    return resolve(err);
                }
                return resolve("Customer delete success");
            });
        }); 
    },
    updateStatus:(data)=>{
        return new Promise ((resolve,reject)=>{
            let {customer_id,status_on} =data
            let Dataobj = {
                status_on: parseInt(status_on),
                updated_on: moment().unix() 
            }
            Customer.findByIdAndUpdate({_id:ObjectId(customer_id)}, { $set: Dataobj }, { new: true }, (err, updatedData) => {
                if (err) {
                    return resolve(err);
                }
                return resolve({status:true,message:'Customer status updated',data:updatedData});
            });
        })
    },
    updateprofile:(data) => {
        // console.log(data)
        return new Promise((resolve, reject) => {
            let _id = ObjectId(data.customer_id)
            let DataObject = {
                customer_id: data.customer_id,
                customer_pic:data.image,
                name:data.name,
                email:data.email,
                phone:data.phone,
                address:data.address,
                zip_code:data.zip_code
            }
            Customer.findByIdAndUpdate(_id, { $set: DataObject }, { new: true }, (err, updatedData) => {
                if (err) {
                    return resolve(err);
                }
                return resolve({status:true,message:'Update Success',data:updatedData});
            });
        });
     },
}


module.exports = {...customerUtils}