const moment =require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Collection_colourSchema = new Schema({
    collection_id:{
         type :mongoose.Schema.Types.ObjectId,
        ref: 'Collection'
    },
    category_id:{
        type :mongoose.Schema.Types.ObjectId,
       ref: 'Category'
   },
   product_id:{
        type :mongoose.Schema.Types.ObjectId,
       ref: 'Product'
   },
    product_image:{
        type:String,
        default:''
    },
    colour:{
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
module.exports = mongoose.model('Collection_colour',Collection_colourSchema,'collection_colour')