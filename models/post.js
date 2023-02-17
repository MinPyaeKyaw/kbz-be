const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    photo: {
        type: String,
        require: true
    },
    category: {type: mongoose.Types.ObjectId, ref: "Category"},
    tags: [{type: mongoose.Types.ObjectId, ref: "Tag"}],
}, {timestamps: true})

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Post", PostSchema);