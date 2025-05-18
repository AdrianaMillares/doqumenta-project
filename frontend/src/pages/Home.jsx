import React from 'react';
import Hero from '../components/Hero';
import QueEsDoqumenta from '../components/QueEsDoqumenta';
import Estadisticas from '../components/Estadisticas';
import EventosDestacados from '../components/EventosDestacados';
import '../styles/Home.css';


const Home = () => {
    return (
        <main className="px-4 sm:px-6 lg:px-8">
            <Hero />
            <QueEsDoqumenta />
            <Estadisticas />
            <EventosDestacados />
        </main>
    );
};

export default Home;
