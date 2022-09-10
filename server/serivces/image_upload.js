var multer = require('multer')
var path = require('path')
var moment = require('moment')


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        imagePath = ""
        switch(file.fieldname){
            case "admin_pic":
                imagePath = path.join(__dirname, "/upload/admin")
                break;
            case "customer_pic":
                imagePath = path.join(__dirname, "/upload/customer")
                break;
            case "designer_pic":
                imagePath = path.join(__dirname, "/upload/designer")
                break;
            case "advertisement_pic":
                imagePath = path.join(__dirname, "/upload/advertisement")
                break;
            case "category_pic":
                imagePath = path.join(__dirname, "/upload/category")
                break;
            case "product_image":
                imagePath = path.join(__dirname, "/upload/product")
                break;

        }
        cb(null, imagePath)
    },
    filename: (req, file, cb) => {
        cb(null, `${moment().valueOf()}${path.extname(file.originalname)}`)
    }
       
})


const upload = multer({
    storage
})

module.exports= upload