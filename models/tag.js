const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Tag", TagSchema);