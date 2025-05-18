const Noticia = require("../models/Noticias");

const getNoticias = async (req, res) => {
    try {
        console.log("🟢 getNoticias llamado");

        const noticias = await Noticia.find().sort({ date: -1 });

        console.log("🔵 Noticias encontradas:", noticias);
        res.json(noticias);
    } catch (error) {
        console.error("🔴 Error en getNoticias:", error); // Este log es lo que necesitamos ver
        res.status(500).json({ error: "Error al obtener noticias." });
    }
};

const getNoticiaPorId = async (req, res) => {
    try {
        const noticia = await Noticia.findById(req.params.id);
        if (!noticia) return res.status(404).json({ error: "No encontrada" });
        res.json(noticia);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener noticia" });
    }
};




const createNoticia = async (req, res) => {
    try {
        const nuevaNoticia = new Noticia(req.body);
        await nuevaNoticia.save();
        res.status(201).json(nuevaNoticia);
    } catch (error) {
        res.status(500).json({ error: "No se pudo crear la noticia." });
    }
};

const updateNoticia = async (req, res) => {
    const noticia = await Noticia.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(noticia);
};

const deleteNoticia = async (req, res) => {
    await Noticia.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Noticia eliminada correctamente." });
};

module.exports = {
    getNoticias,
    createNoticia,
    updateNoticia,
    deleteNoticia,
};
