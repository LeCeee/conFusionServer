const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const Schema = mongoose.Schema;

var promotionSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required:true
    },
    label:{
        type:String,
        default: ''
    },
    price:{
        type:Currency,
        required:true,
        min: 0
    },
    description:{
        type:String,
        required:true
    },
    featured:{
        type: Boolean,
        default:false
    }
})
var Promotions = mongoose.model('promotion',promotionSchema);
module.exports = Promotions;