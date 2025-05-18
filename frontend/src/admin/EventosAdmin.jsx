import React, { useEffect, useState } from "react";
import EventoForm from "./EventoForm";
import "../styles/EventoAdmin.css";

export default function EventoList() {
    const [eventos, setEventos] = useState([]);
    const [eventoEditando, setEventoEditando] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);

    const fetchEventos = () => {
        fetch("/api/eventos")
            .then(res => res.json())
            .then(data => {
                console.log("Eventos recibidos del backend:", data); // 👀
                setEventos(data);
            })
            .catch(err => console.error("Error al obtener eventos", err));
    };
      

    useEffect(() => {
        fetchEventos();
    }, []);

    const eliminarEvento = (id) => {
        if (!window.confirm("¿Eliminar este evento?")) return;
        fetch(`/api/eventos/${id}`, { method: "DELETE" })
            .then(() => fetchEventos())
            .catch(err => console.error("Error al eliminar", err));
    };

    const abrirFormulario = (evento = null) => {
        setEventoEditando(evento);
        setMostrarModal(true);
    };

    const cerrarFormulario = () => {
        setEventoEditando(null);
        setMostrarModal(false);
    };

    return (
        <div className="evento-admin">
            <div className="evento-header">
                <h2>Gestión de Eventos</h2>
                <button className="evento-add-btn" onClick={() => abrirFormulario()}>
                    + Añadir Evento
                </button>
            </div>

            <div className="evento-lista">
                {eventos.map((evento) => (
                    <div key={evento._id} className="evento-card">
                        {evento.imagen ? (
                            <img src={evento.imagen} alt={evento.titulo} />
                        ) : (
                            <div className="evento-placeholder">
                                <span>Sin imagen</span>
                            </div>
                        )}
                        <div>
                            <h3>{evento.titulo}</h3>
                            <p>{evento.descripcion}</p>
                            <p><strong>Fecha:</strong> {new Date(evento.fecha).toLocaleDateString()}</p>
                            <p><strong>Categoría:</strong> {evento.categoria}</p>
                        </div>
                        <div className="evento-acciones">
                            <button onClick={() => abrirFormulario(evento)}>Editar</button>
                            <button onClick={() => eliminarEvento(evento._id)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>

            {mostrarModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <button className="modal-close" onClick={cerrarFormulario}>×</button>
                        <EventoForm
                            fetchEventos={fetchEventos}
                            eventoActual={eventoEditando}
                            limpiarEdicion={cerrarFormulario}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
