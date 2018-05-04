const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Image = new Schema({
    path:String
},{
    timestamps:true
})


module.exports = mongoose.model('Image',Image);
