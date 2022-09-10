const moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DesingertransactionSchema = new Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DesignerOrder'
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
module.exports = mongoose.model('Desingertransaction', DesingertransactionSchema, 'desingertransaction')