import './App.css';
import '@fontsource/barlow';
import '@fontsource/poppins';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CotizacionPage from './pages/CotizacionesPage';
import EnvioPage from './pages/EnvioPage';
import PagoPage from './pages/PagoPage';
import CondicionesPage from './pages/CondicionesPage';
import ClientePage from './pages/ClientesPage';
import ReportesPage from './pages/ReportesPage';
import Login from './pages/Login';
import HomePage from './pages/Home';
import CambiarPassword from './pages/CambiarPassword';
import ProtectedRoute from './components/ProtectedRoute';
import { CotizacionProvider } from './context/CotizacionContext';
import { ReporteProvider } from './context/ReportsContext';

const Layout = ({ children }) => {
    const location = useLocation();
    const isLoginRoute = location.pathname === "/";
    const [modoOscuro, setModoOscuro] = useState(localStorage.getItem("modoOscuro") === "true");

    // Cambiar la clase del body cuando se active o desactive el modo oscuro
    useEffect(() => {
        if (modoOscuro) {
            document.body.classList.add('dark');  // Agregar la clase 'dark' cuando esté activado
        } else {
            document.body.classList.remove('dark');  // Eliminar la clase 'dark' cuando esté desactivado
        }
        localStorage.setItem("modoOscuro", modoOscuro); // Guardar la preferencia en localStorage
    }, [modoOscuro]);

    // Función para alternar entre modo oscuro y claro
    const toggleModoOscuro = () => {
        setModoOscuro((prevMode) => !prevMode);
    };

    return (
        <>
            {!isLoginRoute && <Header toggleModoOscuro={toggleModoOscuro} />}
            <main>{children}</main>
            {!isLoginRoute && <Footer />}
        </>
    );
};

function App() {    
    return (
        <CotizacionProvider>
            <ReporteProvider>
                <Router>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route element={<ProtectedRoute />}>
                                <Route path="/home" element={<HomePage />} />
                                <Route path="/cotizaciones" element={<CotizacionPage />} />
                                <Route path="/cotizaciones-envio" element={<EnvioPage />} />
                                <Route path="/cotizaciones-pago" element={<PagoPage />} />
                                <Route path="/cotizaciones-condiciones" element={<CondicionesPage />} />
                                <Route path="/clientes" element={<ClientePage />} />
                                <Route path="/reportes" element={<ReportesPage />} />
                                <Route path="/cambiarPassword" element={<CambiarPassword />} />
                            </Route>
                        </Routes>
                    </Layout>
                </Router>
            </ReporteProvider>
        </CotizacionProvider>
    );
}

export default App;
