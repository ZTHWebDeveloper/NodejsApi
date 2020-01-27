const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const titleSchema = new Schema({
    title:[{
        type:String,
        required:true
    }],
    city:{
        type:String,
        required:true,
    },
    point_id:{
        type:Schema.Types.ObjectId,
        ref:'location',
        required:true
    }
});

module.exports = mongoose.model('title',titleSchema);