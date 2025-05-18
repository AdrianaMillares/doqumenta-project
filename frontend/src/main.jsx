import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log('main.jsx CARGANDO'); // Para asegurar si entra
const root = document.getElementById('root')

if (root) {
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
} else {
    console.error('No se encontró el div con id="root"')
}
