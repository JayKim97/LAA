const mongoose = require("mongoose");

const SponsorSchema = new mongoose.Schema({
    title: String,
    image: String,
    tier: String
});

module.exports = mongoose.model("Sponsor", SponsorSchema);