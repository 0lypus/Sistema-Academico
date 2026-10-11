import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

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
        <div className="plan-detalle-actions">
          <button type="button" className="plan-detalle-button">Editar</button>
          <button type="button" className="plan-detalle-button">Archivar</button>
        </div>
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

      {activeTab === 'Resumen' ? (
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
      ) : (
        <div className="plan-detalle-card">
          <p className="plans-empty">La sección "{activeTab}" todavía no está disponible.</p>
        </div>
      )}
    </section>
  );
}

export default PlanDetalle;