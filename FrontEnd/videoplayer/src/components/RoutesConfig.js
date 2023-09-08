import React from 'react';
import Home from '../screens/Home';
import Upload from '../screens/Upload';
import Header from './Header/Header';
import { Routes, Route, Navigate } from "react-router-dom";

function RoutesConfig() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/upload" element={<Upload />} />
            </Routes>
        </>
    );
}

export default RoutesConfig
