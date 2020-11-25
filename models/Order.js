const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    ocnumber:{
        type: String,
        required: true,
        trim: true
    },
    avaible:{
        type: Boolean,
        default:true
    },
    dateRegistry:{
        type: Date,
        default: Date.now()
    },enviroment:{
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Order', OrderSchema);
