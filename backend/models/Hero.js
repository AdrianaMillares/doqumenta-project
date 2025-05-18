const mongoose = require('mongoose');

const HeroSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    imagen: { type: String } // URL o base64
}, { timestamps: true });

module.exports = mongoose.model('Hero', HeroSchema);
