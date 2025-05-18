const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const whitelist = ['https://doqumenta.org', 'http://localhost:3000'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// Rutas
const eventoRoutes = require("./routes/eventoRoutes");
const noticiaRoutes = require("./routes/noticiasRoutes");
const heroRoutes = require('./routes/heroRoutes'); 


app.use("/api/eventos", eventoRoutes);     // GET /api/eventos
app.use("/api/prensa", noticiaRoutes);     // GET /api/prensa/noticias
app.use('/api/hero', heroRoutes); 

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ Conectado a MongoDB");
        app.listen(process.env.PORT || 5000, () =>
            console.log("🚀 Servidor corriendo en http://localhost:5000")
        );
    })
    .catch((error) => console.error("❌ Error conectando a MongoDB:", error));
