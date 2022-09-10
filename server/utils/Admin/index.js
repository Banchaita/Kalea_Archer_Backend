let Admin = require('../../model/Admin');
let ObjectId = require('mongodb').ObjectId;
let md5 = require('md5')
const jwt = require('jsonwebtoken')
let moment = require('moment')
let nodemailer = require('nodemailer')


const adminUtils = {

    register: (data) => {
        return new Promise((resolve, reject) => {
            let { image, name, email, password} = data
            if (!data) {
                resolve({ status: false, message: 'no data' })
            }
            else {
                let adminRef = new Admin({
                    profile_pic: image, name, email, password: md5(password)
                })
                adminRef.save((err, savedData) => {
                    return resolve({ status: true, message: 'Admin Resgister Success', data: savedData })
                })
            }
        })
    },
    login: async (data) => {
        return new Promise(async (resolve, reject) => {
            let { email, password } = data
            Admin.findOne({ email, password: md5(password) })
                .exec((err, response) => {
                    if (err || !response) {
                        return reject({ status: false, message: "Invalid Credentials" })
                    }
                    let token = jwt.sign({ admin_id: response._id, 'is_admin': '1' }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY })
                    return resolve({ status: true, message: 'Login success', token: token })
                })
        })
    },
    getAdminDetail: (data) => {
        return new Promise((resolve, reject) => {
            let { admin_id } = data;
            let query = { _id: ObjectId(admin_id) }
            let fildes = Admin.findOne(query, '-password')
                .exec((err, data) => {
                    if (err || !data) {
                        return resolve(err);
                    }
                    return resolve(data);
                });
        })
    },
    upadateAdmindata: (data) => {
        return new Promise((resolve, reject) => {
            let _id = ObjectId(data.admin_id)
            let DataObject = {
                admin_pic:data.image,
                name: data.name,
                email: data.email
            }
            console.log
            Admin.findByIdAndUpdate(_id, { $set: DataObject }, { new: true }, (err, updatedData) => {
                if (err) {
                    return resolve(err);
                }
                return resolve({ status: true, message: 'Update success',data:data });
            });
        });
    },
    forgotPasswordWithMail: async (data) => {
        try {
            return new Promise((resolve, reject) => {
                let { email } = data;
                let queryObject = { email, status: { $ne: 2 } }
                Admin.findOne(queryObject, 'email')
                    .exec(async (err, data) => {
                        if (err || !data) {
                            return resolve({ status: false, message: 'Email not found' });
                        }
                        let adminData = data._id
                        let otp = Math.floor(Math.random() * 1000000)
                        let adminObj = {
                            otp,
                            updated_on: moment().unix()
                        }
                        let update = await Admin.findByIdAndUpdate(ObjectId(adminData._id), { $set: adminObj }, { new: true })
                        if (update) {
                            // let transporter = nodemailer.createTransport({
                            //     host: "smtp.sendgrid.net",
                            //     port: 587,
                            //     secure: false, // true for 465, false for other ports
                            //     auth: {
                            //         user: 'apikey', // generated ethereal user
                            //         pass: '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', // generated ethereal password
                            //     },
                            // });

                            let transporter = nodemailer.createTransport({
                                host: 'smtp.gmail.com',
                                port: 587,
                                auth: {
                                    user: 'sanchaitabiswas4@gmail.com',
                                    pass: 'Sanchaita@98',
                                },
                            });

                            let mailDetails = {
                                from: 'sanchaitabiswas4@gmail.com',
                                to: 'biswassanchaita4@gmail.com',
                                subject: 'Test mail',
                                text: 'Node.js testing mail for GeeksforGeeks'
                            };
                            await transporter.sendMail({
                                from: 'sanchaitabiswas4@gmail.com', // sender address
                                to: email, // list of receivers
                                subject: "Reset Password Instruction", // Subject line
                                html: "<b>Greetings, </b><br /><br />Here is your 5 Digits verification Code<br />" +
                                    "<h2>" + otp + "</h2><br /><br /><label><small>Please use this code to change your password." +
                                    "</small></label><br /><br /><label>Thanks & Regards</label><br /><label>Social Village" +
                                    "Community</label>", // html body
                            });
                        } else {
                            return resolve({ status: false, messages: 'EMAIL_ERROR' });
                        }
                        return resolve({ status: true, messages: 'EMAIL_SENT' });
                    })
            });
        } catch (err) {
            // console.log(err)
            return resolve({ status: false, messages: 'OTP_NOT_UPDATED' });
        }
    },
    checkEmail: (email) => {
        return new Promise((resolve, reject) => {
            let query = { email: { $eq: email } }
             Admin.findOne(query, 'email')
                .exec((err, data) => {
                    if (err || !data) {
                        return resolve({ status: false, message: "Email is not exist" });
                    }
                    return resolve({ status: true, message: 'Email is exist' });
                });
        })
    },

    resetPassword: (data) => {
        return new Promise((resolve, reject) => {
            let { email, password } = data;
            let query = { email, status: { $ne: 2 } }
             Admin.findOne(query)
                .exec(async (err, data) => {
                    if (err || !data) {
                        return resolve(err);
                    }
                    let adminData = data._id
                    let DataObject = {
                        password: md5(password),
                        updated_on: moment().unix()
                    }
                    let update = await Admin.findByIdAndUpdate(ObjectId(adminData._id), { $set: DataObject }, { new: true })
                    if (update) {
                        return resolve({ status: true, message: 'New password create successful' })
                    }
                    return resolve({ status: false, message: 'New password create unsuccessful' })
                });
        })
    },
    verifyOtp: async (data) => {
        return new Promise((resolve, reject) => {
            let { otp } = data
            let queryObject = { otp: { $eq: otp }, status: { $ne: 2 } }
            Admin.findOne(queryObject)
                .exec((err, data) => {
                    if (err || !data) {
                        return resolve({ status: false, message: 'OTP Invalid' });
                    }
                    console.log(data)
                    return resolve({ status: true, message: 'OTP valid' });
                });

        })
    },
    changePassword: async (data) => {
        return new Promise((resolve, reject) => {
            let { old_password, new_password,admin_id } = data
            let query = {_id: ObjectId(admin_id),password:{$eq:md5(old_password)}}
                Admin.findOne(query)
                .exec((err, data) => {
                    if (err || !data) {
                        return resolve({status:false,message:'Old password not same'});
                    }
                   
                    let DataObject = {
                        password: md5(new_password),
                        updated_on: moment().unix()
                    }
                    // console.log(DataObject)
                    Admin.findByIdAndUpdate(ObjectId(admin_id),{ $set: DataObject },{password:{$eq:md5(new_password)}},(err, updatedData) => {
                        if (err) {
                            return resolve(err);
                        }
                        return resolve({status:true,message:"Password has been change",});
                    })
                });
        })
    }
}

module.exports = { ...adminUtils }