const CLAVE = 'sesion';

export function guardarSesion(sesion, recordar = false) {
  cerrarSesion();
  const almacen = recordar ? localStorage : sessionStorage;
  almacen.setItem(CLAVE, JSON.stringify(sesion));
}

export function obtenerSesion() {
  const guardada = sessionStorage.getItem(CLAVE) ?? localStorage.getItem(CLAVE);
  return guardada ? JSON.parse(guardada) : null;
}

export function obtenerToken() {
  return obtenerSesion()?.token ?? null;
}

export function cerrarSesion() {
  sessionStorage.removeItem(CLAVE);
  localStorage.removeItem(CLAVE);
}