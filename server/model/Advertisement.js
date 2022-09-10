const moment =require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdvertisementSchema = new Schema({
    advertisement_pic:{
        type:String,
        default: ''
    },
    duration:{
        type:String,
        default:''
    },
    start_date:{
        type:String,
        default:''
    },
    end_date: {
        type:String,
        default: ''
    },
    referred_by: {
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
module.exports = mongoose.model('Advertisement',AdvertisementSchema,'advertisement')