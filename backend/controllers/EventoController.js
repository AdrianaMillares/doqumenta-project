const Evento = require("../models/Evento");

const getAllEventos = async (req, res) => {
    try {
        const eventos = await Evento.find().sort({ fecha: 1 });
        res.json(eventos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener eventos", error });
    }
};

const createEvento = async (req, res) => {
    try {
        const { titulo, descripcion, fecha, categoria, imagen } = req.body;
        const nuevo = new Evento({ titulo, descripcion, fecha, categoria, imagen });
        await nuevo.save();
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(500).json({ message: "Error al crear evento", error });
    }
};

const updateEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const evento = await Evento.findByIdAndUpdate(id, req.body, { new: true });
        if (!evento) return res.status(404).json({ message: "Evento no encontrado" });
        res.json(evento);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar evento", error });
    }
};

const deleteEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const evento = await Evento.findByIdAndDelete(id);
        if (!evento) return res.status(404).json({ message: "Evento no encontrado" });
        res.json({ message: "Evento eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar evento", error });
    }
};

module.exports = {
    getAllEventos,
    createEvento,
    updateEvento,
    deleteEvento
};
