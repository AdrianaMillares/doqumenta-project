const express = require("express");
const router = express.Router();
const {
    getNoticias,
    createNoticia,
    updateNoticia,
    deleteNoticia,
} = require("../controllers/NoticiasController");

const Noticia = require("../models/Noticias");

// CRUD estándar
router.get("/noticias", getNoticias);
router.post("/noticias", createNoticia);
router.put("/noticias/:id", updateNoticia);
router.delete("/noticias/:id", deleteNoticia);

// Ruta para obtener una sola noticia por su ID
router.get("/noticias/:id", async (req, res) => {
    try {
        const noticia = await Noticia.findById(req.params.id);
        if (!noticia) {
            return res.status(404).json({ error: "Noticia no encontrada" });
        }
        res.json(noticia);
    } catch (error) {
        console.error("Error al obtener la noticia por ID:", error);
        res.status(500).json({ error: "Error al obtener la noticia" });
    }
});

module.exports = router;
