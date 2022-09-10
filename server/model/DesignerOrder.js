const moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DesignerOrderSchema = new Schema({
    order_number: {
        type: Number,
        default: ''
    },
    designer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Designer'
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    colour_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection_colour'
    },
    size_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection_size'
    },
    collection_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection'
    },
    quantity: {
        type: String,
        default: ''
    },
    payment_type: {
        type: String,
        default: ''
    },
    total_price: {
        type: Number,
        default: 0
    },
    order_status: {
        type: String,
        default: ''
    },

    status_on: {
        type: Number,
        default: 0
    },
    create_on: {
        type: Number,
        default: moment().unix()
    }

});
module.exports = mongoose.model('DesignerOrder', DesignerOrderSchema, 'designerorder')