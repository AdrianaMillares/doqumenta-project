import React, { useState, useEffect } from "react";
import "../styles/NoticiasAdmin.css";

export default function NoticiaForm({ noticiaActual, onSave, onClose }) {
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        author: "",
        image: "",
        content: [""],
    });

    useEffect(() => {
        if (noticiaActual) {
            setFormData(noticiaActual);
        }
    }, [noticiaActual]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleContentChange = (i, value) => {
        const newContent = [...formData.content];
        newContent[i] = value;
        setFormData((prev) => ({ ...prev, content: newContent }));
    };

    const addParagraph = () => {
        setFormData((prev) => ({ ...prev, content: [...prev.content, ""] }));
    };

    const handleImageChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            setFormData((prev) => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal">
            <form onSubmit={handleSubmit} className="modal-contenido">
                <h2>{noticiaActual ? "Editar" : "Crear"} Noticia</h2>

                <input type="text" name="title" placeholder="Título" value={formData.title} onChange={handleChange} required />
                <input type="text" name="author" placeholder="Autor" value={formData.author} onChange={handleChange} required />
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {formData.image && <img src={formData.image} alt="preview" className="form-imagen-preview" />}

                <label>Contenido:</label>
                {formData.content.map((p, i) => (
                    <textarea key={i} value={p} onChange={(e) => handleContentChange(i, e.target.value)} />
                ))}
                <button type="button" onClick={addParagraph} className="btn-agregar-parrafo">+ Párrafo</button>

                <div className="botones-formulario">
                    <button type="submit">Guardar</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}
