import React, { useEffect, useState } from "react";

export default function EventoForm({ fetchEventos, eventoActual, limpiarEdicion }) {
    const [form, setForm] = useState({
        titulo: "",
        descripcion: "",
        fecha: "",
        categoria: "",
        imagen: ""
    });

    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (eventoActual) {
            setForm({
                titulo: eventoActual.titulo,
                descripcion: eventoActual.descripcion,
                fecha: eventoActual.fecha.slice(0, 10),
                categoria: eventoActual.categoria,
                imagen: eventoActual.imagen
            });
            setPreview(eventoActual.imagen);
        } else {
            setForm({ titulo: "", descripcion: "", fecha: "", categoria: "", imagen: "" });
            setPreview(null);
        }
    }, [eventoActual]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm({ ...form, imagen: reader.result });
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Enviando:", form); // ✅ aquí está bien ubicado

        const method = eventoActual ? "PUT" : "POST";
        const url = eventoActual ? `/api/eventos/${eventoActual._id}` : "/api/eventos";

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
            .then(async (res) => {
                if (!res.ok) {
                    const error = await res.text();
                    console.error("Error al guardar:", error);
                    alert("No se pudo guardar el evento.");
                    return;
                }

                fetchEventos();
                limpiarEdicion();
                setForm({ titulo: "", descripcion: "", fecha: "", categoria: "", imagen: "" });
                setPreview(null);
            })
            .catch(err => {
                console.error("Error de red:", err);
                alert("Error de red al guardar el evento.");
            });
    };

    return (
        <form onSubmit={handleSubmit} className="evento-form">
            <h3>{eventoActual ? "Editar Evento" : "Nuevo Evento"}</h3>

            <label>Título:</label>
            <input
                type="text"
                name="titulo"
                placeholder="Título"
                value={form.titulo}
                onChange={handleChange}
                required
            />

            <label>Descripción:</label>
            <textarea
                name="descripcion"
                placeholder="Descripción"
                value={form.descripcion}
                onChange={handleChange}
                required
            />

            <label>Fecha:</label>
            <input
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                required
            />

            <label>Categoría:</label>
            <select
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                required
            >
                <option value="">Selecciona una categoría</option>
                <option value="Proyección">Proyección</option>
                <option value="Conversatorio">Conversatorio</option>
                <option value="Exhibición">Exhibición</option>
                <option value="Taller">Taller</option>
                <option value="Mesa Redonda">Mesa Redonda</option>
            </select>

            <label>Imagen:</label>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />
            {preview && <img src={preview} alt="preview" className="preview-img" />}

            <button type="submit">{eventoActual ? "Actualizar" : "Crear"}</button>
        </form>
    );
}
