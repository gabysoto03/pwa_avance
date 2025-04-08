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
import MisCotizaciones from './pages/MisCotizaciones';
import CambiarPassword from './pages/CambiarPassword';
import ProtectedRoute from './components/ProtectedRoute';
import { CotizacionProvider } from './context/CotizacionContext';
import { ReporteProvider } from './context/ReportsContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
    const location = useLocation();
    const isLoginRoute = location.pathname === "/";
    const [modoOscuro, setModoOscuro] = useState(localStorage.getItem("modoOscuro") === "true");


    useEffect(() => {
        if (modoOscuro) {
            document.body.classList.add('dark');  
        } else {
            document.body.classList.remove('dark');  
        }
        localStorage.setItem("modoOscuro", modoOscuro); 
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
                <ToastContainer position="top-center" autoClose={2000} theme="light" />
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
                                <Route path="/misCotizaciones" element={<MisCotizaciones />} />
                            </Route>
                        </Routes>
                    </Layout>
                </Router>
            </ReporteProvider>
        </CotizacionProvider>
    );
}

export default App;
