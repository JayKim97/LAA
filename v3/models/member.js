const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
    position: String,
    name: String,
    email: String,
    image: String
});

module.exports = mongoose.model("Member", MemberSchema);