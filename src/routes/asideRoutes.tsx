import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Leads from '../pages/Leads';
import Buzon from '../pages/Comms/Buzon';
import Contacts from '../pages/Comms/Contacts';
const AsideRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Home />} />
      <Route path="/leads" element={<Leads />} />
      <Route path="/comms/buzon" element={<Buzon />} />
      <Route path="/comms/contacts" element={<Contacts />} />
      {/* Agrega más rutas aquí según sea necesario */}
    </Routes>
  );
};

export default AsideRoutes;
