import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/login';
import React, { useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Register from './pages/register';
import Home from './pages/home';
import HeaderLogged from './components/header_logged';
import ResetPassword from './pages/resetPassword';
import WomenPage from './pages/women_page';
import MenPage from './pages/men_page';
import UserConfiguration from './pages/configurationUser';
import ShoesMen from './pages/shoesMen';
import ShoesWomen from './pages/shoesWomen';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    const publicRoutes = ["/", "/register", "/resetPassword"];

    const showHeader = publicRoutes.includes(location.pathname) ? <Header /> : <HeaderLogged />;

    return (
        <div className="flex flex-col min-h-screen">
            {showHeader}

            <Routes>
                <Route path="/" element={<Login onLogin={() => setIsLoggedIn(false)} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/resetPassword" element={<ResetPassword />} />
                <Route path="/home" element={<Home /> } />
                <Route path="/women_page" element={<WomenPage />} />
                <Route path="/men_page" element={<MenPage />} />
                <Route path="/configuration" element={<UserConfiguration />} />
                <Route path="/shoesMen" element={<ShoesMen />} />
                <Route path="/shoesWomen" element={<ShoesWomen />} />
            </Routes>

            <Footer />
        </div>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;
