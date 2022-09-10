const moment =require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    name:{
        type:String,
        default: ''
    },
    customer_pic:{
        type:String,
        default: ''
    },
    email:{
        type:String,
        default:''
    },
    password:{
        type:String,
        default:''
    },
    phone:{
        type:Number,
        default:''
    },
    address:{
        type:String,
        default:''
    },
    zip_code:{
        type:Number,
        default:''
    },
    FCM_token:{
        type:String,
        default: ''
    },
    otp:{
        type:String,
        default:''
    },
    status_on:{
        type:Number,
        default:1
    },
    create_on:{
        type:Number,
        default:moment().unix()
    }

});
module.exports = mongoose.model('Customer',CustomerSchema,'customer')