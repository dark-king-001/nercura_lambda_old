const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    blogId: {type:String},
    title: {type: String},
    body: {type: String},
    editors: [{type: String}],
    tags: [{ type:String }],
    relativeLinks: [{type: String}],
    imageLinks: [{type: String}],
    dateUploaded: {type: Date, default:Date.now()},
});

const model = mongoose.model("blogs", blogSchema);
module.exports = model;