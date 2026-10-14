import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ChevronRight, FileText, Lock, CheckCircle2, ListChecks } from 'lucide-react';
import MateriaInscripcionRow from './components/MateriaInscripcionRow';
import ModalConfirmarInscripcion from './components/ModalConfirmarInscripcion';
import ModalDetalleMateria from './components/ModalDetalleMateria';

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
  { id: 'aprobadas', label: 'Aprobadas' },
];

const ESTADOS_VACIOS = {
  todas: {
    icono: FileText,
    titulo: 'Todavía no hay materias',
    texto: 'Cuando las materias estén cargadas aparecerán acá',
  },
  habilitadas: {
    icono: ListChecks,
    titulo: 'No hay materias habilitadas',
    texto: 'Cuando cumplas las correlatividades de una materia aparecerá acá',
  },
  bloqueadas: {
    icono: Lock,
    titulo: 'No tenés materias bloqueadas',
    texto: 'Cumpliste las correlatividades de todas tus materias',
  },
  aprobadas: {
    icono: CheckCircle2,
    titulo: 'Todavía no tenés materias aprobadas',
    texto: 'Cuando apruebes una materia aparecerá acá',
  },
};

const ORDINALES = { 1: '1ro', 2: '2do', 3: '3ro', 4: '4to', 5: '5to' };
const formatearAnio = (anio) => ORDINALES[anio] ?? `${anio}°`;

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
  const [modal, setModal] = useState(null); // { tipo: 'confirmar' | 'detalle', materiaId }
  const periodoAbierto = MES_ACTUAL_SIMULADO === PERIODO_DE_INSCRIPCION;

  const materiasPreparadas = materias.map((materia) => {
    const correlativasPendientes = materia.correlativas
      .map((correlativaId) => materias.find(({ id }) => id === correlativaId))
      .filter((correlativa) => correlativa && correlativa.estado !== 'A')
      .map((correlativa) => correlativa.nombre);

    return {
      ...materia,
      correlativasPendientes,
      correlativaBloqueante: correlativasPendientes[0],
    };
  });

  const materiasFiltradas = materiasPreparadas.filter((materia) => {
    const aprobada = materia.estado === 'A';
    const inscripta = materia.estado === 'R';
    const bloqueada = !!materia.correlativaBloqueante && !aprobada && !inscripta;

    if (filtro === 'aprobadas') return aprobada;
    if (filtro === 'habilitadas') return !bloqueada && !aprobada;
    if (filtro === 'bloqueadas') return bloqueada;
    return true;
  });

  const estadoVacio = ESTADOS_VACIOS[filtro];
  const IconoVacio = estadoVacio.icono;

  const materiaModal = modal ? materiasPreparadas.find(({ id }) => id === modal.materiaId) : null;

  const cerrarModal = () => setModal(null);
  const abrirConfirmacion = (materiaId) => setModal({ tipo: 'confirmar', materiaId });
  const abrirDetalle = (materiaId) => setModal({ tipo: 'detalle', materiaId });

  const handleConfirmarInscripcion = () => {
    if (!materiaModal) return;
    setMaterias((actuales) =>
      actuales.map((materia) => (materia.id === materiaModal.id ? { ...materia, estado: 'R' } : materia))
    );
    setAviso(`Te has inscripto a la materia: ${materiaModal.nombre}.`);
    cerrarModal();
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

      {materiasFiltradas.length === 0 ? (
        <div className="estado-vacio" role="status">
          <div className="estado-vacio__icono">
            <IconoVacio size={32} />
          </div>
          <h2>{estadoVacio.titulo}</h2>
          <p>{estadoVacio.texto}</p>
        </div>
      ) : (
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
                  onInscribir={abrirConfirmacion}
                  onVerDetalle={abrirDetalle}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {materiaModal && modal.tipo === 'confirmar' && (
        <ModalConfirmarInscripcion
          materia={materiaModal}
          anioTexto={formatearAnio(materiaModal.año)}
          onConfirmar={handleConfirmarInscripcion}
          onCancelar={cerrarModal}
        />
      )}

      {materiaModal && modal.tipo === 'detalle' && (
        <ModalDetalleMateria
          materia={materiaModal}
          anioTexto={formatearAnio(materiaModal.año)}
          onCerrar={cerrarModal}
        />
      )}
    </section>
  );
}

export default InscripcionesEstudiante;