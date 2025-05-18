import React from 'react';
import '../styles/Estadisticas.css';

const Estadisticas = () => {
    const stats = [
        { number: '10+', label: 'Años de Festival' },
        { number: '500+', label: 'Documentales Proyectados' },
        { number: '20+', label: 'Países Participantes' },
    ];

    return (
        <section className="estadisticas">
            {stats.map((stat, idx) => (
                <div key={idx} className="estadistica">
                    <h3>{stat.number}</h3>
                    <p>{stat.label}</p>
                </div>
            ))}
        </section>
    );
};

export default Estadisticas;
