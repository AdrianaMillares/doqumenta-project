import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Post.css";

const BlogPost = () => {
    const { slug: id } = useParams(); // usamos el _id como identificador
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/prensa/noticias/${id}`);
                if (!res.ok) throw new Error("No se encontró la noticia");
                const data = await res.json();
                setPost(data);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return <p>Cargando...</p>;
    if (!post) return <p>Noticia no encontrada.</p>;

    return (
        <section className="blog-post">
            <div className="post-container">
                <button className="back-button" onClick={() => navigate(-1)}>
                    ← Regresar a noticias
                </button>
                <img src={post.image} alt={post.title} className="post-image" />
                <h1 className="post-title">{post.title}</h1>
                <p className="post-meta">
                    Publicado el {post.date} | Autor: {post.author}
                </p>
                <div className="post-content">
                    {post.content.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogPost;
