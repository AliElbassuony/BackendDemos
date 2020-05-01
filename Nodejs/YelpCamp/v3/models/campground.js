const mongoose = require('mongoose');
// Schema Setup
//Schema
var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    desc:String,
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]
});
//Model
module.exports = mongoose.model('Campground',campgroundSchema);