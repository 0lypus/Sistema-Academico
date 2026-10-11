const ROL_FRONT = {
  Student: 'estudiante',
  AcademicSecretary: 'secretario',
};

export function rolFront(rolBackend) {
  return ROL_FRONT[rolBackend] ?? null;
}

export function rutaInicio(rol) {
  return rol === 'secretario' ? '/secretario/inicio' : '/estudiante/inicio';
}