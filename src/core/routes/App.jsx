/*import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react';
import SimuladorRoles from '../components/SimuladorRoles';
import { secretarioRoutes } from '../../modules/secretario/secretarioRoutes';
import { estudianteRoutes } from '../../modules/estudiante/estudianteRoutes';
import LoginPage from '../../modules/auth/pages/LoginPage';
import { obtenerSesion } from '../auth/session';
import { rolFront, rutaInicio } from '../auth/roles';


function RutaProtegida() {
  useLocation();
  return obtenerSesion() ? <Outlet /> : <Navigate to="/login" replace />;
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

export default App;*/

import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';   // ← tiene que decir useLocation y Outlet
import { useState } from 'react';
import SimuladorRoles from '../components/SimuladorRoles';
import { secretarioRoutes } from '../../modules/secretario/secretarioRoutes';
import { estudianteRoutes } from '../../modules/estudiante/estudianteRoutes';
import LoginPage from '../../modules/auth/pages/LoginPage';
import { obtenerSesion } from '../auth/session';
import { rolFront, rutaInicio } from '../auth/roles';

function RutaProtegida() {
  useLocation();                                                    // ← esta línea tiene que estar
  return obtenerSesion() ? <Outlet /> : <Navigate to="/login" replace />;
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
        <Route element={<RutaProtegida />}>                         {/* ← las dos rutas tienen que estar ADENTRO */}
          {secretarioRoutes(rolSimulado)}
          {estudianteRoutes(rolSimulado)}
        </Route>
        <Route path="*" element={redireccionPorDefecto} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;