var Customer = require('../utils/Customer')
var upload = require('../serivces/image_upload')
var singleUpload = upload.single('customer_pic')



const customerController = {
    customerRegister: async (req, res) => {
        singleUpload(req,res,async(err)=>{
            // console.log(req.file)
            if(!req.file){
                return res.json({status:false,message:'Image error'})
            }
            let {filename} = req.file
            req.body.image = filename
            Customer.customerRegister(req.body).then((response)=>{
                res.send(response)
            }).catch((err) =>{
               res.send({status:false,message:'Customer image error'})
            })
        })
    },
    customerLogin: async (req, res) => {
        Customer.customerLogin(req.body).then((response) => {
            res.json(response)
        })
            .catch((err) => {
                res.json(err)
            })
    },
    getCustomerList: (req, res) => {
        Customer.getCustomerList().then((response) => {
            res.json({ status: true, msg: "success", data: response })
        }).catch((err) => {
            res.json(err)
        })
    },
    getCustomerDetail: (req, res) => {
        let customer_id = req.customer_id;
        Customer.getCustomerDetail(req.body.customer_id).then((response) => {
            res.json({ status: true, data: response })
        }).catch((err) => {
            res.json(err)
        })
    },




    uploadeImage: async (req, res) => {
        singleUpload(req, res, async (err) => {
            if (!req.file) {
                return res.json({ status: false, message: 'Image error' })
            }
            let { filename } = req.file
            // console.log(filename)
            let image = filename
            let customer_id = req.body.customer_id
            req.body.image = filename
            Customer.updateprofile(req.body).then((respon) => {
                res.send(respon)
            }).catch((err) => {
                res.send('error', err)
            })
            if (!customer_id) {
                return res.json({ status: false, message: 'Customer id error' })
            }
            return res.json({ status: true, message: 'Image upload success', data: image })
        })

    },
    updateStatus: (req, res) => {
        let customer_id = req.body.customer_id;
        // console.log(customer_id)
        if (!customer_id) {
            return ({ status: false, message: 'Invaild customer id' });
        }
        Customer.updateStatus(req.body).then((response) => {
            res.json(response)
        }).catch((err) => {
            res.json(err)   
        })
    },


    updateCustomer: (req, res) => {
        Customer.updateCustomer(req.body).then((response) => {
            res.json({ status: true, data: response })
        }).catch((err) => {
            res.json(err)
        })
    },
    deleteCustomer: (req, res) => {
        Customer.deleteCustomer(req.body).then((response) => {
            res.json({ status: true, data: response })
        }).catch((err) => {
            res.json(err)
        })
    },
    customerEdit: async (req, res) => {
        singleUpload(req, res, async (err) => {
            console.log(req.file)
            if (!req.file) {
                return res.json({ status: false, message: 'Image error' })
            }
            let { filename } = req.file
            let image = filename
            let customer_id = req.body.customer_id;
            console.log('controller customer id', customer_id)
            req.body.image = filename
            Customer.updateprofile(req.body).then((respon) => {
                res.send(respon)
            }).catch((err) => {
                res.send('error', err)
            })
        })
    },


}


module.exports = { ...customerController }