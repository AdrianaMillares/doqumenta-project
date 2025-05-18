import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

function AppContent() {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith("/admin");

    return (
        <>
            {!isAdmin && <Navbar />}
            <AppRoutes />
            {!isAdmin && <Footer />}
        </>
    );
}

export default function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}
