const moment =require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = new Schema({
    name:{
        type:String,
        default: ''
    },
    profile_pic:{
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
    otp: {
        type:String,
        default: ''
    },
    status_on:{
        type:Number,
        default: 0
    },
    create_on:{
        type:Number,
        default:moment().unix()
    }

});
module.exports = mongoose.model('Admin',AdminSchema,'admin')