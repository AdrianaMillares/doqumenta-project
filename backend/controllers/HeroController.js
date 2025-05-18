const Hero = require('../models/Hero');

// Obtener el Hero (único)
exports.getHero = async (req, res) => {
    try {
        const hero = await Hero.findOne();
        if (!hero) return res.status(404).json({ message: "Hero no encontrado" });
        res.json(hero);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear o actualizar
exports.updateHero = async (req, res) => {
    try {
        const { titulo, descripcion, imagen } = req.body;

        let hero = await Hero.findOne();

        if (!hero) {
            hero = new Hero({ titulo, descripcion, imagen });
        } else {
            hero.titulo = titulo;
            hero.descripcion = descripcion;
            hero.imagen = imagen;
        }

        await hero.save();
        res.json(hero);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar Hero (opcional)
exports.deleteHero = async (req, res) => {
    try {
        const hero = await Hero.findOneAndDelete();
        if (!hero) return res.status(404).json({ message: "Hero no encontrado" });
        res.json({ message: "Hero eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
