import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react';
import SimuladorRoles from '../components/SimuladorRoles';
import { secretarioRoutes } from '../../modules/secretario/secretarioRoutes';
import { estudianteRoutes } from '../../modules/estudiante/estudianteRoutes';
import LoginPage from '../../modules/auth/pages/LoginPage';
import { obtenerSesion } from '../auth/session';
import { rolFront, rutaInicio } from '../auth/roles';

const simuladorActivo = import.meta.env.DEV && import.meta.env.VITE_ENABLE_ROLE_SIMULATOR === 'true';

function RutaProtegida() {
  useLocation();
  return obtenerSesion() || simuladorActivo ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  const [rolSimulado, setRolSimulado] = useState(
    () => rolFront(obtenerSesion()?.role) ?? 'secretario',
  );

  const redireccionPorDefecto = <Navigate to={rutaInicio(rolSimulado)} replace />;

  return (
    <BrowserRouter>
      <SimuladorRoles rolSimulado={rolSimulado} onChange={setRolSimulado} />
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={setRolSimulado} />} />
        <Route element={<RutaProtegida />}>
          {secretarioRoutes(rolSimulado)}
          {estudianteRoutes(rolSimulado)}
        </Route>
        <Route path="*" element={redireccionPorDefecto} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
