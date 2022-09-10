const moment =require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    category_pic:{
        type:String,
        default: ''
    },
    name:{
        type:String,
        default:''
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
module.exports = mongoose.model('Category',CategorySchema,'category')