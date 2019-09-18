const   mongoose = require("mongoose");

const SlideSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    order: String,
    button_value: String,
    button_link: String
});

module.exports = mongoose.model("Slide", SlideSchema);