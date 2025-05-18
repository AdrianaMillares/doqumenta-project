const mongoose = require("mongoose");

const NoticiaSchema = new mongoose.Schema({
    title: String,
    date: String,
    author: String,
    image: String, // base64 o URL
    content: [String],
});

module.exports = mongoose.model("Noticia", NoticiaSchema);
