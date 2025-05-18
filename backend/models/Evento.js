const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    fecha: { type: Date, required: true },
    categoria: { type: String, required: true },
    imagen: { type: String } // base64 o URL
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
