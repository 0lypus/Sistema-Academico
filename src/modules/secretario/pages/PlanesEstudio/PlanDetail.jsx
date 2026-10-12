import { useState } from 'react';
import { ChevronRight, FileText, Plus } from 'lucide-react';
import CargarMaterias from './LoadSubjects';

const tabs = ['Resumen', 'Materias', 'Materias por año', 'Correlatividades'];

function Field({ label, value }) {
  return (
    <div className="plan-detalle-field">
      <span className="field-label">{label}</span>
      <span className="field-value">{value ?? '—'}</span>
    </div>
  );
}

function PlanDetalle({ plan, onBack }) {
  const [activeTab, setActiveTab] = useState('Resumen');
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(false);
  const [materias, setMaterias] = useState([]);

  const handleSaveSubjects = (newSubjects) => {
    setMaterias((current) => [...current, ...newSubjects]);
    setIsLoadingSubjects(false);
  };

  if (isLoadingSubjects) {
    return (
      <CargarMaterias
        plan={plan}
        onBack={onBack}
        onCancel={() => setIsLoadingSubjects(false)}
        onSave={handleSaveSubjects}
      />
    );
  }

  const renderContent = () => {
    if (activeTab === 'Resumen') {
      return (
        <div className="plan-detalle-card">
          <h2>Información del Plan</h2>
          <div className="plan-detalle-grid">
            <Field label="Nombre del plan" value={plan.nombre} />
            <Field label="Código" value={plan.codigo} />
            <Field label="Año de inicio del plan de estudio" value={plan.añoInicio} />
            <Field label="Año de finalización del plan de estudio" value={plan.añoFin} />
            <Field label="Duración de la carrera" value={plan.duracion} />
            <Field label="Modalidad de la carrera" value={plan.modalidad} />
            <Field label="Carga horaria total" value={plan.cargaHoraria} />
            <Field label="Régimen de cursada" value={plan.regimen} />
          </div>
        </div>
      );
    }

    if (activeTab === 'Materias') {
      return (
        <div className="plan-materias">
          <div className="plan-materias-header">
            <div>
              <h2>Materias</h2>
              <p>Gestioná las materias asociadas al plan de estudio.</p>
            </div>
            {materias.length > 0 && (
              <button type="button" className="create-plan-button" onClick={() => setIsLoadingSubjects(true)}>
                <Plus size={14} /> Agregar materias
              </button>
            )}
          </div>

          {materias.length === 0 ? (
            <div className="plan-materias-empty">
              <div className="plan-materias-icon"><FileText size={32} /></div>
              <h3>Todavía no hay materias cargadas</h3>
              <p>Agrega las materias para comenzar a organizar la estructura académica.</p>
              <button type="button" className="create-plan-button" onClick={() => setIsLoadingSubjects(true)}>
                <Plus size={14} /> Agregar materias
              </button>
            </div>
          ) : (
            <div className="plan-materias-list">
              <div className="plan-materias-list-row plan-materias-list-head">
                <span>N.º</span>
                <span>Formato</span>
                <span>Materia</span>
                <span>Año</span>
                <span>Régimen</span>
                <span>Hs. cátedra</span>
                <span>Hs. reloj</span>
              </div>
              {[...materias]
                .sort((a, b) => Number(a.orden) - Number(b.orden))
                .map((materia) => (
                  <div className="plan-materias-list-row" key={materia.id}>
                    <span>{materia.orden}</span>
                    <span>{materia.formato}</span>
                    <span>{materia.materia}</span>
                    <span>{materia.anio}</span>
                    <span>{materia.regimen}</span>
                    <span>{materia.horasCatedra}</span>
                    <span>{materia.horasReloj}</span>
                  </div>
                ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="plan-detalle-card">
        <p className="plans-empty">La sección "{activeTab}" todavía no está disponible.</p>
      </div>
    );
  };

  return (
    <section className="plan-detalle-page">
      <nav className="plan-detalle-breadcrumb" aria-label="Breadcrumb">
        <button type="button" onClick={onBack}>Planes de Estudio</button>
        <ChevronRight size={14} />
        <span>{plan.codigo} – {plan.nombre}</span>
      </nav>

      <div className="plan-detalle-heading">
        <div className="plan-detalle-title">
          <h1>{plan.codigo} – {plan.nombre}</h1>
          <span className={`plan-badge ${plan.activo ? 'plan-badge-active' : 'plan-badge-inactive'}`}>
            {plan.activo ? 'Activo' : 'Archivado'}
          </span>
        </div>
        {activeTab === 'Resumen' && (
          <div className="plan-detalle-actions">
            <button type="button" className="plan-detalle-button">Editar</button>
            <button type="button" className="plan-detalle-button">Archivar</button>
          </div>
        )}
      </div>

      <div className="plan-detalle-tabs" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {renderContent()}
    </section>
  );
}

export default PlanDetalle;