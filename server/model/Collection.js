const moment =require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollectionSchema = new Schema({
    product_name:{
        type:String,
        default:''

    },
    designer_id:{
        type :mongoose.Schema.Types.ObjectId,
        ref: 'Designer'
    },
    category_id:{
         type :mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    product_id:{
         type :mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    price:{
        type:Number,
        default:0
    },
    description:{
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
module.exports = mongoose.model('Collection',CollectionSchema,'collection')