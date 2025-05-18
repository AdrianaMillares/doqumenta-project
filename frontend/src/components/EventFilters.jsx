import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    FaVideo,
    FaUserFriends,
    FaImage,
    FaPaintBrush,
    FaMicrophoneAlt,
} from "react-icons/fa";
import "../styles/Programacion.css";

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
    Exhibición: "#10b981",
    Taller: "#f97316",
    "Mesa Redonda": "#a855f7",
};

function EventFilters({
    eventos,
    selectedDate,
    onDateChange,
    selectedCategoria,
    onCategoriaChange,
    onReset,
}) {
    const eventosConFecha = eventos.map((e) => e.fecha);

    const getDayClassName = (date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()-2).padStart(2, "0");
        const formatted = `${yyyy}-${mm}-${dd}`;
        return eventosConFecha.includes(formatted) ? "evento-activo" : undefined;
    };

    return (
        <div className="filtros-container">
            <div className="filtros-controles">
                <select
                    className="filtro-input"
                    value={selectedCategoria}
                    onChange={(e) => onCategoriaChange(e.target.value)}
                >
                    <option value="Todos">Todas las categorías</option>
                    {Object.keys(iconosPorCategoria).map((categoria) => (
                        <option key={categoria} value={categoria}>
                            {categoria}
                        </option>
                    ))}
                </select>

                <div className="datepicker-wrapper">
                    <DatePicker
                        selected={selectedDate ? new Date(selectedDate) : null}
                        onChange={(date) => {
                            const yyyy = date.getFullYear();
                            const mm = String(date.getMonth() + 1).padStart(2, "0");
                            const dd = String(date.getDate()+1).padStart(2, "0");
                            const formatted = `${yyyy}-${mm}-${dd}`;
                            onDateChange(formatted);
                        }}
                        placeholderText="Selecciona una fecha"
                        dateFormat="yyyy-MM-dd"
                        dayClassName={getDayClassName}
                    />
                </div>

                <button className="filtro-input" onClick={onReset}>
                    Limpiar
                </button>
            </div>

            <div className="leyenda">
                {Object.keys(iconosPorCategoria).map((categoria) => (
                    <div className="leyenda-item" key={categoria}>
                        <span
                            className="color-dot"
                            style={{ backgroundColor: coloresPorCategoria[categoria] }}
                        ></span>
                        {categoria} {iconosPorCategoria[categoria]}
                    </div>
                ))}
            </div>

            <p className="leyenda-texto">
                Los eventos están categorizados por colores para facilitar la navegación.
                <br />
                Cada tipo de evento tiene un color e ícono únicos para diferenciarlo visualmente.
            </p>
        </div>
    );
}

export default EventFilters;
