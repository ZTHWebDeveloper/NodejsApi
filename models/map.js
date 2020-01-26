const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mapSchema = new Schema({
    lati:{
        type:Number,
        required:true
    },
    longi:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('location',mapSchema);