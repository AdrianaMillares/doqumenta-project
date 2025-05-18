import React from "react";
import "../styles/EventCard.css";
import {
    FaVideo,
    FaUserFriends,
    FaImage,
    FaPaintBrush,
    FaMicrophoneAlt,
} from "react-icons/fa";

const iconosPorCategoria = {
    Proyección: <FaVideo />,
    Conversatorio: <FaUserFriends />,
    Exhibición: <FaImage />,
    Taller: <FaPaintBrush />,
    "Mesa Redonda": <FaMicrophoneAlt />,
};

const coloresPorCategoria = {
    Proyección: "#3b82f6",
    Conversatorio: "#ef4444",
    Exhibición: "#22c55e",
    Taller: "#f97316",
    "Mesa Redonda": "#a855f7",
};

function EventCard({ event }) {
    const { titulo, fecha, lugar, categoria } = event;
    const icono = iconosPorCategoria[categoria];
    const color = coloresPorCategoria[categoria];

    return (
        <div className="event-card">
            <div className="category-bar" style={{ backgroundColor: color }}></div>

            <div className="event-content">
                <div className="icon">{icono}</div>
                <div className="info">
                    <h3 className="titulo">{titulo}</h3>
                    <p className="fecha">
                        {new Date(fecha).toLocaleDateString("es-MX", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                    <p className="lugar">{lugar}</p>
                    <p className="categoria">{categoria}</p>
                </div>
            </div>
        </div>
    );
}

export default EventCard;
