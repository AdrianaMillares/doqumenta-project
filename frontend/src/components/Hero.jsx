import React, { useEffect, useState } from 'react';
import '../styles/Hero.css';

const Hero = () => {
    const [heroData, setHeroData] = useState({
        titulo: '',
        descripcion: '',
        imagen: ''
    });

    useEffect(() => {
        fetch('http://localhost:5000/api/hero') // Cambia el puerto si tu backend usa otro
            .then(response => {
                if (!response.ok) throw new Error('No se pudo obtener el hero');
                return response.json();
            })
            .then(data => setHeroData(data))
            .catch(error => console.error('Error al cargar el hero:', error));
    }, []);

    return (
        <section className="hero">
            {heroData.imagen && (
                <div
                    className="hero-overlay"
                    style={{
                        backgroundImage: `url(${heroData.imagen})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.5
                    }}
                />
            )}
            <div className="hero-content">
                <h1>{heroData.titulo || 'Historias que transforman la realidad'}</h1>
                <p>{heroData.descripcion || 'Explora el mundo del cine documental'}</p>
                <button
                    onClick={() => {
                        window.open('/Conv Luces 25.pdf', '_blank');
                    }}
                >
                    Ver convocatoria
                </button>
            </div>
        </section>
    );
};

export default Hero;
