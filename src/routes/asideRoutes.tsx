import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Leads from '../pages/Leads';

const AsideRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Home />} />
      <Route path="/leads" element={<Leads />} />
      {/* Agrega más rutas aquí según sea necesario */}
    </Routes>
  );
};

export default AsideRoutes;
