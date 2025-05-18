const mongoose = require("mongoose");
const Evento = require("./models/Evento");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
    await Evento.deleteMany(); // Limpia colección
    await Evento.create({
        titulo: "Proyección de Documental Ambiental",
        descripcion: "Un documental sobre el impacto del cambio climático.",
        fecha: "2025-05-20",
        categoria: "Proyección",
        imagen: "" // puede dejarse vacío por ahora
    });

    console.log("✅ Evento de prueba creado");
    mongoose.disconnect();
});
