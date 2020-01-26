const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mapSchema = new Schema({
    lat:{
        type:Number,
        required:true
    },
    long:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('location',mapSchema);