import { useState } from 'react';
import { FileText, X } from 'lucide-react';
import '../../../../styles/modal.css';

const initialForm = {
  nombre: '',
  codigo: '',
  añoInicio: '',
  añoFin: '',
  duracion: '',
  modalidad: '',
  cargaHoraria: '',
  regimen: '',
};

function CrearPlanModal({ onClose, onCreate }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    setForm((currentForm) => ({ ...currentForm, [field]: event.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = 'Este campo es obligatorio';
    if (!form.codigo.trim()) newErrors.codigo = 'Este campo es obligatorio';
    if (!form.añoInicio) newErrors.añoInicio = 'Este campo es obligatorio';
    if (!form.añoFin) newErrors.añoFin = 'Este campo es obligatorio';
    if (!form.duracion.trim()) newErrors.duracion = 'Este campo es obligatorio';
    if (!form.modalidad) newErrors.modalidad = 'Este campo es obligatorio';
    if (!form.cargaHoraria.trim()) newErrors.cargaHoraria = 'Este campo es obligatorio';
    if (!form.regimen) newErrors.regimen = 'Este campo es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    onCreate({
      nombre: form.nombre.trim(),
      codigo: form.codigo.trim(),
      añoInicio: Number(form.añoInicio),
      añoFin: Number(form.añoFin),
      duracion: form.duracion.trim(),
      modalidad: form.modalidad,
      cargaHoraria: form.cargaHoraria.trim(),
      regimen: form.regimen,
      activo: true,
    });
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="crear-plan-title">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-header-title">
            <FileText size={20} />
            <div>
              <h2 id="crear-plan-title">Crear nuevo plan de estudio</h2>
              <p>Completa la información general del plan para comenzar a organizar la estructura académica.</p>
            </div>
          </div>
          <button type="button" aria-label="Cerrar" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <h3>Información básica</h3>
          <div className="modal-row">
            <div className="modal-field">
              <label htmlFor="nombre">Nombre del plan *</label>
              <input
                id="nombre"
                type="text"
                placeholder="Ej. PE01 – Tecnicatura en Desarrollo de Software"
                value={form.nombre}
                onChange={handleChange('nombre')}
                className={errors.nombre ? 'input-error' : ''}
              />
              {errors.nombre && <span className="field-error">{errors.nombre}</span>}
            </div>
            <div className="modal-field">
              <label htmlFor="codigo">Código *</label>
              <input
                id="codigo"
                type="text"
                placeholder="Ej. PE01"
                value={form.codigo}
                onChange={handleChange('codigo')}
                className={errors.codigo ? 'input-error' : ''}
              />
              {errors.codigo && <span className="field-error">{errors.codigo}</span>}
            </div>
          </div>

          <h3>Información académica</h3>
          <div className="modal-row">
            <div className="modal-field">
              <label htmlFor="añoInicio">Año inicio *</label>
              <input
                id="añoInicio"
                type="number"
                placeholder="Ej. 2022"
                value={form.añoInicio}
                onChange={handleChange('añoInicio')}
                className={errors.añoInicio ? 'input-error' : ''}
              />
              {errors.añoInicio && <span className="field-error">{errors.añoInicio}</span>}
            </div>
            <div className="modal-field">
              <label htmlFor="añoFin">Año finalización *</label>
              <input
                id="añoFin"
                type="number"
                placeholder="Ej. 2030"
                value={form.añoFin}
                onChange={handleChange('añoFin')}
                className={errors.añoFin ? 'input-error' : ''}
              />
              {errors.añoFin && <span className="field-error">{errors.añoFin}</span>}
            </div>
          </div>

          <div className="modal-row">
            <div className="modal-field">
              <label htmlFor="duracion">Duración de la carrera *</label>
              <input
                id="duracion"
                type="text"
                placeholder="Ej. 3 años"
                value={form.duracion}
                onChange={handleChange('duracion')}
                className={errors.duracion ? 'input-error' : ''}
              />
              {errors.duracion && <span className="field-error">{errors.duracion}</span>}
            </div>
            <div className="modal-field">
              <label htmlFor="modalidad">Modalidad de cursada *</label>
              <select
                id="modalidad"
                value={form.modalidad}
                onChange={handleChange('modalidad')}
                className={errors.modalidad ? 'input-error' : ''}
              >
                <option value="">Ej. Presencial</option>
                <option value="Presencial">Presencial</option>
                <option value="Virtual">Virtual</option>
                <option value="Mixta">Mixta</option>
              </select>
              {errors.modalidad && <span className="field-error">{errors.modalidad}</span>}
            </div>
          </div>

          <div className="modal-row">
            <div className="modal-field">
              <label htmlFor="cargaHoraria">Carga horaria *</label>
              <input
                id="cargaHoraria"
                type="text"
                placeholder="Ej. 1623 horas reloj"
                value={form.cargaHoraria}
                onChange={handleChange('cargaHoraria')}
                className={errors.cargaHoraria ? 'input-error' : ''}
              />
              {errors.cargaHoraria && <span className="field-error">{errors.cargaHoraria}</span>}
            </div>
            <div className="modal-field">
              <label htmlFor="regimen">Régimen de la carrera *</label>
              <select
                id="regimen"
                value={form.regimen}
                onChange={handleChange('regimen')}
                className={errors.regimen ? 'input-error' : ''}
              >
                <option value="">Ej. Anual / Cuatrimestral</option>
                <option value="Anual">Anual</option>
                <option value="Cuatrimestral">Cuatrimestral</option>
                <option value="Anual / Cuatrimestral">Anual / Cuatrimestral</option>
              </select>
              {errors.regimen && <span className="field-error">{errors.regimen}</span>}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="modal-cancel-button" onClick={onClose}>Cancelar</button>
            <button type="submit" className="modal-submit-button">Crear plan</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CrearPlanModal;