import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Programacion from '../pages/Programacion';
import Prensa from '../pages/Prensa';
import Post from '../pages/Post'; // ✅ Cambiado
import AdminLayout from "../admin/AdminLayout";
import HeroEditor from "../admin/HeroEditor";
import EventosAdmin from "../admin/EventosAdmin";
import NoticiasAdmin from "../admin/NoticiasAdmin";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programacion" element={<Programacion />} />
            <Route path="/prensa" element={<Prensa />} />
            <Route path="/prensa/:slug" element={<Post />} />

            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<HeroEditor />} />
                <Route path="eventos" element={<EventosAdmin />} />
                <Route path="noticias" element={<NoticiasAdmin />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;