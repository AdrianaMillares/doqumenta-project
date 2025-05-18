import { Outlet, NavLink } from "react-router-dom";
import "../styles/Admin.css"; // si deseas personalizar el admin

function AdminLayout() {
    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <h2>Panel Admin</h2>
                <nav>
                    <ul>
                        <li><NavLink to="/admin" end>Inicio (Baner)</NavLink></li>
                        <li><NavLink to="/admin/eventos">Eventos</NavLink></li>
                        <li><NavLink to="/admin/noticias">Noticias</NavLink></li>
                    </ul>
                </nav>
            </aside>

            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;
