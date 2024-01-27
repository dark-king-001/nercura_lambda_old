const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    blogId: {type:String , required: true},
    title: {type: String, required:true},
    body: {type: String, required:true},
    editors: {type: String, requred: true},
    tags: [{ type:String }],
    relativeLinks: [{type: String}],
    imageLinks: [{type: String}],
    dateUploaded: {type: Date, default:Date.now()},
});

const model = mongoose.model("blogs", blogSchema);
module.exports = model;