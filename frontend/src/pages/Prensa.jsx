import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Prensa.css";

function PressPage() {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const res = await fetch("https://doqumenta.onrender.com/api/prensa/noticias");
                const data = await res.json();
                setNoticias(data);
            } catch (error) {
                console.error("Error al cargar noticias:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNoticias();
    }, []);

    return (
        <section className="press-page">
            <div className="press-header">
                <h1>Noticias y Publicaciones</h1>
                <p>Descubre las últimas noticias, comunicados y publicaciones sobre Doqumenta.</p>
            </div>

            {loading ? (
                <p style={{ textAlign: "center" }}>Cargando noticias...</p>
            ) : noticias.length === 0 ? (
                <p style={{ textAlign: "center" }}>No hay noticias disponibles.</p>
            ) : (
                <div className="press-grid">
                    {noticias.map((noticia) => (
                        <div key={noticia._id} className="press-card">
                            <img src={noticia.image} alt={noticia.title} />
                            <div className="press-card-content">
                                <h2>{noticia.title}</h2>
                                <p>{noticia.content[0]?.slice(0, 100)}...</p>
                                <Link to={`/prensa/${noticia._id}`} className="btn-read-more">
                                    Leer más
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default PressPage;
