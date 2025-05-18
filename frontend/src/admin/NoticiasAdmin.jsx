import React, { useEffect, useState } from "react";
import {
    getNoticias,
    createNoticia,
    updateNoticia,
    deleteNoticia,
} from "../services/apiNoticias";
import NoticiaForm from "./NoticiaForm";
import "../styles/NoticiasAdmin.css";

export default function NoticiasAdmin() {
    const [noticias, setNoticias] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [noticiaActual, setNoticiaActual] = useState(null);

    useEffect(() => {
        cargarNoticias();
    }, []);

    const cargarNoticias = async () => {
        const data = await getNoticias();
        setNoticias(data);
    };

    const handleGuardar = async (datos) => {
        if (noticiaActual) {
            await updateNoticia(noticiaActual._id, datos);
        } else {
            await createNoticia(datos);
        }
        setShowForm(false);
        setNoticiaActual(null);
        cargarNoticias();
    };

    const handleEditar = (noticia) => {
        setNoticiaActual(noticia);
        setShowForm(true);
    };

    const handleEliminar = async (id) => {
        if (confirm("¿Estás seguro de eliminar esta noticia?")) {
            await deleteNoticia(id);
            cargarNoticias();
        }
    };

    return (
        <div className="noticias-admin-container">
            <div className="noticias-header">
                <h1>Noticias</h1>
                <button className="btn-crear" onClick={() => { setShowForm(true); setNoticiaActual(null); }}>
                    + Nueva Noticia
                </button>
            </div>

            <div className="noticias-grid">
                {noticias.map((n) => (
                    <div key={n._id} className="noticia-card">
                        {n.image && <img src={n.image} alt={n.title} className="noticia-imagen" />}
                        <div className="noticia-info">
                            <h3>{n.title}</h3>
                            <p className="noticia-meta">{n.date} | {n.author}</p>
                            <div className="noticia-botones">
                                <button onClick={() => handleEditar(n)} className="btn-editar">Editar</button>
                                <button onClick={() => handleEliminar(n._id)} className="btn-eliminar">Eliminar</button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {showForm && (
                <NoticiaForm
                    noticiaActual={noticiaActual}
                    onSave={handleGuardar}
                    onClose={() => {
                        setShowForm(false);
                        setNoticiaActual(null);
                    }}
                />
            )}
        </div>
    );
}
