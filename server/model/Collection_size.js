const moment =require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Collection_sizeSchema = new Schema({
    colour_id:{
         type :mongoose.Schema.Types.ObjectId,
        ref: 'Collection_colour'
    },
    category_id:{
        type :mongoose.Schema.Types.ObjectId,
       ref: 'Category'
   },
   product_id:{
        type :mongoose.Schema.Types.ObjectId,
       ref: 'Product'
   },
    size:{
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
module.exports = mongoose.model('Collection_size',Collection_sizeSchema,'collection_size')