const express = require("express");
const router = express.Router();
const {
    getAllEventos,
    createEvento,
    updateEvento,
    deleteEvento
} = require("../controllers/EventoController");

router.get("/", getAllEventos);             // Obtener todos
router.post("/", createEvento);             // Crear nuevo
router.put("/:id", updateEvento);           // Editar
router.delete("/:id", deleteEvento);        // Eliminar

module.exports = router;
