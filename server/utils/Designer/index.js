let Desinger = require('../../model/Designer')
let ObjectId = require('mongodb').ObjectId;
let md5 = require('md5')
let moment = require('moment')
const jwt = require('jsonwebtoken')
let nodemailer = require('nodemailer')


const desingerUtils = {
    designerRegister: (data) => {
        return new Promise((resolve, reject) => {
            let { image, name, email, password, phone, address, country, states, city, zip_code, about, user_role } = data
            if (!data) {
                resolve({ status: false, message: 'no data' })
            }
            else {
                let designerRef = new Desinger({
                    designer_pic: image, name, email, password: md5(password), phone, address, country, states, city, zip_code, about, user_role
                })
                designerRef.save((err, savedData) => {
                    return resolve({ status: true, message: 'Desinger Resgister Success', data: savedData })

                })
            }
        });
    },

    designerLogin: async (data) => {
        return new Promise(async (resolve, reject) => {
            let { email, password } = data
            Desinger.findOne({ email, password: md5(password) })
                .exec((err, response) => {
                    if (err || !response) {
                        return reject({ status: false, message: "Invalid Credentials" })
                    }
                    let token = jwt.sign({ user_id: response._id, 'is_users': '1' }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY })
                    return resolve({ status: true, message: 'Login success', token: token })
                })
        })
    },
    getDesignerList: () => {
        return new Promise((resolve, reject) => {
            Desinger.find({})
                .exec((err, data) => {
                    if (err || !data || data.length == 0) {
                        return resolve(err);
                    }
                    return resolve(data);
                });
        })
    },
    getDesignerDetail: (designer_id) => {
        return new Promise((resolve, reject) => {
            let query = { _id: ObjectId(designer_id) }
            let fildes = Desinger.findOne(query, '-password')
                .exec((err, data) => {
                    if (err || !data) {
                        return resolve(err);
                    }
                    return resolve(data);
                });
        })
    },
    updateStatus: (data) => {
        return new Promise((resolve, reject) => {
            let { designer_id, status_on } = data
            let Dataobj = {
                status_on: parseInt(status_on),
                updated_on: moment().unix()
            }
            Desinger.findByIdAndUpdate({ _id: ObjectId(designer_id) }, { $set: Dataobj }, { new: true }, (err, updatedData) => {
                if (err) {
                    // console.log(err)
                    return resolve(err);
                }
                return resolve({ status: true, message: 'Designer status updated', data: updatedData });
            });
        })
    },
    updateprofile: (data) => {
        return new Promise((resolve, reject) => {
            let _id = ObjectId(data.designer_id)
            let DataObject = {
                designer_id: data.designer_id,
                designer_pic: data.image,
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                country: data.country,
                states: data.states,
                city: data.city,
                about: data.about,
                user_role: data.user_role,
                zip_code: data.zip_code
            }
            Desinger.findByIdAndUpdate(_id, { $set: DataObject }, { new: true }, (err, updatedData) => {
                if (err) {
                    return resolve(err);
                }
                return resolve({ status: true, message: 'Update Success', data: updatedData });
            });
        });
    },
    







}


module.exports = { ...desingerUtils }