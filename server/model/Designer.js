const moment =require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DesignerSchema = new Schema({
    name:{
        type:String,
        default: ''
    },
    designer_pic:{
        type:String,
        default: ''
    },
    user_role:{
        type:String,
        default:''
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
    about:{
        type:String,
        default:''
    },
    country:{
        type:String,
        default:''
    },
    states:{
        type:String,
        default:''
    },
    city:{
        type:String,
        default:''
    },
    zip_code:{
        type:String,
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
module.exports = mongoose.model('Designer',DesignerSchema,'designer')