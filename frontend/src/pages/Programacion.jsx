import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import EventFilters from "../components/EventFilters";
import "../styles/Programacion.css";

function Programacion() {
    const [eventos, setEventos] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedCategoria, setSelectedCategoria] = useState("Todos");

    useEffect(() => {
        fetch("https://doqumenta.onrender.com/api/eventos")
            .then((res) => res.json())
            .then((data) => {
                setEventos(data);
            });
    }, []);

    const handleResetFilters = () => {
        setSelectedDate("");
        setSelectedCategoria("Todos");
    };

    function normalizarFecha(fechaStr) {
        const date = new Date(fechaStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()+1).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    const filteredEvents = eventos.filter((evento) => {
        const fechaCoincide = selectedDate
            ? normalizarFecha(evento.fecha) === selectedDate
            : true;
        const categoriaCoincide =
            selectedCategoria === "Todos" || evento.categoria === selectedCategoria;
        return fechaCoincide && categoriaCoincide;
    });

    return (
        <div className="programacion-container">
            <h2 className="event-title">Explora nuestros eventos</h2>

            <EventFilters
                eventos={eventos}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                selectedCategoria={selectedCategoria}
                onCategoriaChange={setSelectedCategoria}
                onReset={handleResetFilters}
            />

            <div className="events-grid">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                        <EventCard key={event._id} event={event} />
                    ))
                ) : (
                    <p className="no-events">No hay eventos para esta fecha.</p>
                )}
            </div>
        </div>
    );
}

export default Programacion;
