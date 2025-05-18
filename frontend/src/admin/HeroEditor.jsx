import React, { useState, useEffect } from "react";
import "../styles/HeroAdmin.css";

function HeroEditor() {
    const [titulo, setTitulo] = useState("");
    const [subtitulo, setSubtitulo] = useState("");
    const [imagen, setImagen] = useState(null);
    const [preview, setPreview] = useState(null);

    // Cargar hero actual desde backend al montar
    useEffect(() => {
        fetch("http://localhost:5000/api/hero")
            .then((res) => res.json())
            .then((data) => {
                setTitulo(data.titulo || "");
                setSubtitulo(data.descripcion || "");
                setPreview(data.imagen || null);
            })
            .catch((err) => console.error("Error al cargar hero:", err));
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImagen(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result); // base64 para mostrar
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedHero = {
            titulo,
            descripcion: subtitulo,
            imagen: preview // base64 de la imagen
        };

        try {
            const res = await fetch("http://localhost:5000/api/hero", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedHero)
            });

            if (!res.ok) throw new Error("Error al guardar");
            alert("Hero actualizado con éxito ✅");
        } catch (err) {
            console.error(err);
            alert("❌ Error al guardar los cambios");
        }
    };

    return (
        <div className="hero-admin-container">
            <h2>Editar Banner (inicio)</h2>
            <form onSubmit={handleSubmit} className="hero-admin-form">
                <label>Título:</label>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />

                <label>Subtítulo:</label>
                <textarea
                    value={subtitulo}
                    onChange={(e) => setSubtitulo(e.target.value)}
                />

                <label>Imagen de fondo:</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <small className="hero-hint">Tamaño recomendado: 1920 × 800 px</small>

                {preview && (
                    <div className="hero-preview">
                        <p>Vista previa:</p>
                        <img src={preview} alt="Preview" />
                    </div>
                )}

                <button type="submit">Guardar cambios</button>
            </form>
        </div>
    );
}

export default HeroEditor;
