import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ChevronRight } from 'lucide-react';
import MateriaInscripcionRow from './components/MateriaInscripcionRow';

const MES_ACTUAL_SIMULADO = 'Marzo';
const PERIODO_DE_INSCRIPCION = 'Marzo';
const PERIODO_TEXTO = '10 mar. - 28 mar. 2025';

const ESTUDIANTE = {
  nombre: 'Lucas Fernández',
  plan: 'Plan Tec. en Programación 2026',
  legajo: '2026-0148',
};

const FILTROS = [
  { id: 'todas', label: 'Todas' },
  { id: 'habilitadas', label: 'Habilitadas' },
  { id: 'bloqueadas', label: 'Bloqueadas' },
];

const MATERIAS = [
  { id: 1, nombre: 'Programación I', año: 1, regimen: 'Anual', estado: 'A', correlativas: [] },
  { id: 2, nombre: 'Base de Datos', año: 1, regimen: '1er Cuatrimestre', estado: 'R', correlativas: [] },
  { id: 3, nombre: 'Programación II', año: 2, regimen: 'Anual', estado: '', correlativas: [1] },
  { id: 4, nombre: 'Ingeniería de Software', año: 2, regimen: 'Anual', estado: '', correlativas: [2] },
  { id: 5, nombre: 'Desarrollo Web', año: 2, regimen: '2do Cuatrimestre', estado: '', correlativas: [3, 4] },
];

function InscripcionesEstudiante() {
  const [materias, setMaterias] = useState(MATERIAS);
  const [aviso, setAviso] = useState('');
  const [filtro, setFiltro] = useState('todas');
  const periodoAbierto = MES_ACTUAL_SIMULADO === PERIODO_DE_INSCRIPCION;

  const materiasPreparadas = materias.map((materia) => {
    const correlativaBloqueante = materia.correlativas
      .map((correlativaId) => materias.find(({ id }) => id === correlativaId))
      .find((correlativa) => correlativa && correlativa.estado !== 'R' && correlativa.estado !== 'A');

    return { ...materia, correlativaBloqueante: correlativaBloqueante?.nombre };
  });

  const materiasFiltradas = materiasPreparadas.filter((materia) => {
    if (filtro === 'habilitadas') return !materia.correlativaBloqueante;
    if (filtro === 'bloqueadas') return !!materia.correlativaBloqueante;
    return true;
  });

  const handleInscripcion = (materiaId) => {
    setMaterias((actuales) =>
      actuales.map((materia) => (materia.id === materiaId ? { ...materia, estado: 'R' } : materia))
    );
    const materia = materias.find(({ id }) => id === materiaId);
    if (materia) setAviso(`Solicitud de inscripción registrada para ${materia.nombre}.`);
  };

  const handleVerDetalle = (materiaId) => {
    const materia = materiasPreparadas.find(({ id }) => id === materiaId);
    if (materia) setAviso(`${materia.nombre} requiere la correlativa: ${materia.correlativaBloqueante}.`);
  };

  return (
    <section className="estudiante-dashboard">
      <nav className="breadcrumb" aria-label="Ruta de navegación">
        <Link to="/estudiante/inicio">Inicio</Link>
        <ChevronRight size={14} />
        <span>Inscripciones a materias</span>
      </nav>

      <header className="inscripciones-header">
        <div>
          <h1>Inscripciones a materias</h1>
          <p>Consulta las materias disponibles para inscribirse</p>
          
        </div>
        <div className="periodo-card">
          <CalendarDays size={38} />
          <div>
            <small>Período de Inscripción</small>
            <strong>{PERIODO_TEXTO}</strong>
          </div>
        </div>
      </header>

      {!periodoAbierto && (
        <div className="estudiante-periodo-cerrado" role="status">
          El período de inscripciones ({PERIODO_DE_INSCRIPCION}) se encuentra cerrado.
        </div>
      )}

      {aviso && (
        <div className="estudiante-aviso" role="status">
          {aviso}
          <button type="button" onClick={() => setAviso('')} aria-label="Cerrar aviso">
            ×
          </button>
        </div>
      )}
      

      <div className="tabs-bar">
        <div className="tabs" role="tablist">
          {FILTROS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={filtro === id}
              className={`tab ${filtro === id ? 'tab--activa' : ''}`}
              onClick={() => setFiltro(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <span className="tabs-contador">{materiasFiltradas.length} Materias</span>
      </div>

      <div className="tabla-wrapper">
        <table className="tabla-materias">
          <thead>
            <tr>
              <th>Materias</th>
              <th>Año</th>
              <th>Régimen</th>
              <th>Correlativas</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {materiasFiltradas.map((materia) => (
              <MateriaInscripcionRow
                key={materia.id}
                materia={materia}
                periodoAbierto={periodoAbierto}
                onInscribir={handleInscripcion}
                onVerDetalle={handleVerDetalle}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default InscripcionesEstudiante;