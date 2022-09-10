const moment =require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    product_type:{
        type:String,
        default:''
    },
    category_id:{
         type :mongoose.Schema.Types.ObjectId,
        ref: 'Category'
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
module.exports = mongoose.model('Product',ProductSchema,'product')