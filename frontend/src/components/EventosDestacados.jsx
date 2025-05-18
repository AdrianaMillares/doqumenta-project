import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import "../styles/EventosDestacados.css";

const ProximosEventos = () => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await fetch("https://doqumenta.onrender.com/api/eventos");
                const data = await response.json();

                const hoy = new Date().toISOString().split("T")[0];

                const eventosFuturos = data
                    .filter((evento) => evento.fecha >= hoy)
                    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
                    .slice(0, 2); // ← solo los 2 más próximos

                setEventos(eventosFuturos);
            } catch (error) {
                console.error("Error al cargar los eventos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEventos();
    }, []);

    return (
        <section className="eventos-destacados">
            <h2>Próximos Eventos</h2>
            {loading ? (
                <p style={{ textAlign: "center" }}>Cargando eventos...</p>
            ) : eventos.length === 0 ? (
                <p style={{ textAlign: "center", padding: "1rem" }}>
                    No hay eventos próximos por el momento. ¡Vuelve pronto!
                </p>
            ) : (
                <>
                    <div className="eventos-grid">
                        {eventos.map((event) => (
                            <EventCard key={event._id} event={event} />
                        ))}
                    </div>
                    <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                        <a href="/programacion" className="btn-ver-todos">
                            Ver toda la programacion
                        </a>
                    </div>
                </>
            )}
        </section>
    );
};

export default ProximosEventos;
