const moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    designer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Designer'
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
       
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
module.exports = mongoose.model('Transaction', TransactionSchema, 'transaction')