let mongoose = require("mongoose");
mongoose.Promise = global.Promise;      // Creating reference. 

let CourseSchema = mongoose.Schema({
    _id:Number,
    cname:String,
    cdesc: String,
    price:Number
});

let CourseModel = mongoose.model("",CourseSchema,"Course");



module.exports = CourseModel